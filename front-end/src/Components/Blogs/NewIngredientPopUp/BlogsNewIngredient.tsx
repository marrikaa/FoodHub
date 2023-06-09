import React, { useState } from 'react'
import './BlogsNewIngredients.css'

type ProfileNewTagProps = {
    setVisible: (bool: boolean) => void;
    setIngredients: (ingredients: string[]) => void;
    ingredients: string[]
}

export const BlogsNewIngredient = ({ setVisible, setIngredients, ingredients }: ProfileNewTagProps) => {

    const [currentSelectedIngredients, setCurrentSelectedIngredients] = useState<string[]>([]);

    const close = () => {
        setVisible(false);
    }

    const save = () => {
        const nonRepeatedTags = currentSelectedIngredients.filter(ingredient => !ingredients?.includes(ingredient));
        setIngredients([...ingredients, ...nonRepeatedTags]);
        setVisible(false);
    }

    // useEffect(() => {
    //     const getTags = async () => {
    //         const tags = await getExternalTags();
    //         setTagsState(tags);
    //     }
    //     getTags();
    // }, [])

    const addIngredients = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {ingredient} = event.currentTarget;
        if (!currentSelectedIngredients.includes(ingredient.value)) {
            setCurrentSelectedIngredients([...currentSelectedIngredients, ingredient.value])
        }
        ingredient.value = "";
    }

    const removeIngredient = (index: number) => {
        const tmpIngredients = [...currentSelectedIngredients];
        tmpIngredients.splice(index, 1);
        setCurrentSelectedIngredients(tmpIngredients);
    }

    return (
        <div className='popUp-container'>
        <div className='ingredients-PopUp'>
                <form onSubmit={addIngredients} className='ingredienst-form'>
                    <p className='add-ingredients'>Ingredients</p>
                    <input className='ingredient-input' name='ingredient' placeholder='ingredient' type="text" />
                </form>
                <div className='add-ingredient-list'>
                    {currentSelectedIngredients.map((ingredient, index) => {
                        return <div className='add-ingredient-list-container'>
                            {ingredient}<button key={index} onClick={() => removeIngredient(index)} 
                            className='ing-remove-button'>x</button>
                            </div>
                    })}
                </div>
                <div className='pop-up-button-container'>
                    <button  onClick={close}>Exit</button>
                    <button onClick={save}>Save</button>
                </div>
        </div></div>
    )
}