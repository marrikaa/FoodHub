import { createContext, ReactNode, useEffect, useState } from 'react'
import { getRecipes } from '../Client/Client';
import { AppContextType, RecipeCardItem } from '../Types/Types';


export const AppContext = createContext<AppContextType>({
    recipes: [] as RecipeCardItem[],
    setRecipes: (recipes: RecipeCardItem[]) => [],
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeCardItem[]>([]);
  

    return (
        <AppContext.Provider value={{
            recipes,
            setRecipes,
        }}>
            {children}
        </AppContext.Provider >
    )
}