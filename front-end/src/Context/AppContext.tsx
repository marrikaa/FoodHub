import { createContext, ReactNode, useEffect, useState } from 'react'
import { getRecipes } from '../Client/Client';
import { AppContextType, RecipeCardItem, RecipeDetailsType } from '../Types/Types';


export const AppContext = createContext<AppContextType>({
    recipes: [] as RecipeCardItem[],
    setRecipes: (recipes: RecipeCardItem[]) => [],
    recipeDetails : {} as RecipeDetailsType,
    setRecipeDetails: (recipes: RecipeDetailsType) => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeCardItem[]>([]);
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType>({});
  
  

    return (
        <AppContext.Provider value={{
            recipes,
            setRecipes,
            recipeDetails,
            setRecipeDetails,
        }}>
            {children}
        </AppContext.Provider >
    )
}