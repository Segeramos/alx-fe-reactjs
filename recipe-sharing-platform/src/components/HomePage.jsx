import { Link } from 'react-router-dom';


const HomePage = () => {

    const recipes = [
      { id: 1, title: "Spaghetti Carbonara", image: "https://via.placeholder.com/150" },
      { id: 2, title: "Chicken Tikka Masala", image: "https://via.placeholder.com/150" }
    ];
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={'/recipe/${recipe.id}'}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default HomePage