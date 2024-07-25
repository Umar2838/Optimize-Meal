import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import {  Modal } from 'antd';


const Hero = () => {
  const [activeItem, setActiveItem] = useState('All Meals');
  const [recipes, setRecipes] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekAssignments, setWeekAssignments] = useState({
    'Week 1': [],
    'Week 2': [],
    'Week 3': [],
    'Week 4': []
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = ['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleCardSelection = (id) => {
    setSelectedCards((prevSelectedCards) => 
      prevSelectedCards.includes(id)
        ? prevSelectedCards.filter(cardId => cardId !== id)
        : [...prevSelectedCards, id]
    );
  };

  
  const handleSaveToWeek = (week) => {
    setWeekAssignments((prevAssignments) => {
      const newAssignments = { ...prevAssignments };
      selectedCards.forEach(cardId => {
        if (!newAssignments[week].includes(cardId)) {
          newAssignments[week].push(cardId);
        }
      });
      return newAssignments;
    });
    setSelectedCards([]);
    setIsModalOpen(false);
  };

  const handleDeleteMeal = (week, id) => {
    setWeekAssignments((prevAssignments) => ({
      ...prevAssignments,
      [week]: prevAssignments[week].filter(cardId => cardId !== id)
    }));
  };

  const renderRecipes = (recipeIds) => {
    return recipeIds.map((id) => {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return null;
      return (
        <div 
          key={recipe.id} 
          onClick={() => toggleCardSelection(recipe.id)}
          className={`w-full md:w-1/2 cursor-pointer lg:w-[30%] lg:h-[80vh] bg-white border-2 px-5 mt-4 p-5 py-6 rounded-md shadow-lg flex flex-col justify-between ${selectedCards.includes(recipe.id) ? 'border-blue-950' : 'border-none'}`} 
          style={{ minHeight: '400px' }}
        >
          <img src={recipe.image} className="w-full h-32 md:h-48 relative object-cover rounded-md" />
          <div className="w-20 h-4 rounded-sm absolute bg-blue-950 border-black font-bold text-white text-[8px] text-center">
            {recipe.mealType}
          </div>
          <div className="px-4 mt-4 font-bold text-lg">{recipe.name}</div>
          <div className="text-justify px-4 mt-4 text-sm flex-grow">{recipe.instructions.slice(0, 3)}</div>
          <div className="px-4 flex justify-between items-center text-[10px] mt-2">
            <div><b>Cuisine:</b> {recipe.cuisine}</div>
            <div><b>Rating:</b> {recipe.rating}</div>
            <div>
              <ReactStars
                count={5}
                size={18}
                activeColor="#ffd700"
                value={recipe.rating}
                isHalf={true}
              />
            </div>
            {activeItem !== 'All Meals' && (
              <button onClick={() => handleDeleteMeal(activeItem, recipe.id)} className="text-red-500 ml-2">Delete</button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{
      backgroundColor: "#d7eaff",
      backgroundImage: "linear-gradient(270deg, #d7eaff 0%, #ebd7f0 100%)",
    }}>
      <p className="text-xl px-4 md:px-12 lg:px-24 pt-4 font-bold">Week Orders</p>
      <div className="w-full h-auto px-4 md:px-12 lg:px-24 text-xs font-semibold bg-white mt-4">
        <ul className="flex flex-wrap justify-between items-center gap-4 md:gap-10 py-4 md:py-8">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => setActiveItem(item)}
              className={`
                cursor-pointer font-bold
                ${activeItem === item ? 'text-blue-900' : 'text-black'}
              `}
            >
              {item}
            </li>
          ))}
          <li className="w-full md:w-auto flex justify-center md:justify-end">
            <button 
              className="btn bg-blue-950 px-4 py-2 text-white" 
              onClick={showModal}
            >
              Add to Week
            </button>
          </li>
        </ul>
      </div>

      <div className="px-4 md:px-12 lg:px-24 flex flex-wrap justify-between items-center mt-5 mb-5 gap-4">
        {activeItem === 'All Meals' ? renderRecipes(recipes.map(r => r.id)) : renderRecipes(weekAssignments[activeItem])}
      </div>

      <Modal
       open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <h2>Select a Week</h2>
        <div className="flex justify-between">
          {Object.keys(weekAssignments).map((week) => (
            <button 
              key={week} 
              onClick={() => handleSaveToWeek(week)} 
              className="btn bg-blue-950 px-4 py-2 text-white"
            >
              {week}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="btn bg-red-500 px-4 py-2 text-white mt-4"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default Hero;
