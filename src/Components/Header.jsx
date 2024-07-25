import pic from "../assets/background.png";

const Header = () => {
  return (
    <div className="relative w-full">
      <img src={pic} className="w-full h-60 sm:h-30 opacity-30 object-cover" alt="background" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-4 md:pt-8">Optimize Your Meal</h1>
        <p className="font-light   sm:text-sm md:text-base pt-2 md:pt-4 px-4 md:px-8 lg:px-16">
          Select a meal to add to a week. You will be able to edit, modify, and change the meal weeks.
        </p>
      </div>
    </div>
  );
};

export default Header;
