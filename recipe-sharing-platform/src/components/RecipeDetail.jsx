import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch('/src/data.json')
        .then((response) => response.json())
        .then((data) => {
            const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
            setRecipe(selectedRecipe);
        })
        .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    if(!recipe){
        return <p>Loading recipe...</p>;
    }

  return (
    <div className="container mx-auto p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <img 
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-700 mb-4">{recipe.summary}</p>
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                    {ingredient}
                </li>
            ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700">
            {recipe.instructions.map((step, index) => (
                <li key={index} className="mb-2">
                    {step}
                </li>
            ))}
        </ol>
    </div>
  )
}

export default RecipeDetail