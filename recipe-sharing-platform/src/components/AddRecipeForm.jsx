import { useState } from "react";

 
const AddRecipeForm = () => {

   const [title, setTitle] = useState('');
   const [ingredients, setIngredients] = useState('');
   const [steps, setSteps] = useState('');
   const [errors, setErrors] = useState({});

   const validateForm = () => {
       const newErrors = {};
       if(!title.trim()) newErrors.title = "Recipe title is required.";
       if(!ingredients.trim() || ingredients.split(',').length < 2)
           newErrors.ingredients = "Please provide at least two ingredients, separated by commas.";
       if(!steps.trim())newErrors.steps = "Preparation steps are required.";
       setErrors(newErrors);
       return object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
       e.preventDefault();
       if(validateForm()){
           console.log({title, ingredients, steps});
           alert("Recipe submitted successfully");
           setTitle('');
           setIngredients('');
           setSteps('');
       }
   }

  return (
    <form className="shadow-lg">
       <h2>Add New Recipes</h2>
       <div>
           <label 
               htmlFor="title">Recipe Title</label>

           <input 
               type="text" 
               name="title" 
               id="title" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className={`w-full p-2 mt-1 border ${
                   errors.title ? 'border-red-500' : 'border-gray-300'
               }rounded-md focus:ring focus:ring-indigo-200`}
               placeholder="chocolate cake"
           />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
       </div>
            {/* ingredients input */}
       <div>
               <label className="block text-sm font-medium text-gray-700"  htmlFor="ingredients"
               >Ingredients</label>

               <textarea 
                   name="ingredients" 
                   id="ingredients"
                   value={ingredients}
                   onChange={(e) => setIngredients(e.target.value)}
                   className={`w-full p-2 mt-1 border ${
                       errors.ingredients ? 'border-red-500' : 'border-gray-300'
                   } rounded-md focus:ring focus:ring-indigo-200`}
                   rows="3"
                   placeholder="e.g., sugar, flour, eggs"
               >
                    {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
               </textarea>

               {/* steps input */}

               <textarea 
                   name="steps" 
                   id="steps"
                   value={steps}
                   onChange={(e) => setSteps(e.target.value)}
                   className={`w-full p-2 mt-1 border ${
                       errors.steps ? 'border-red-500' : 'border-gray-300'
                   } rounded-md focus:ring focus:ring-indigo-200`}
                   rows="4"
                   placeholder="e.g., Mix ingredients, bake at 350°F for 20 minutes"
                   >
               {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}

               </textarea>

               <button 
                   type="submit"
                    className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                    onSubmit={}
                   >Submit Recipe</button>
       </div>
    </form>
  )
}

export default AddRecipeForm