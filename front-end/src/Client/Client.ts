import { getByPlaceholderText } from "@testing-library/react";
import axios from "axios";
import { RecipeType } from "../Types/Types";
  
export const getRecipes = async (filterRecipe : RecipeType) => {
  const recipes = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
      query: filterRecipe.query,
      cuisine: filterRecipe.cuisine,
      excludeCuisine: filterRecipe.excludeCuisine,
      diet: filterRecipe.diet,
      intolerances: filterRecipe.intolerances,
      equipment: filterRecipe.equipment,
      includeIngredients: filterRecipe.includeIngredients,
      excludeIngredients: filterRecipe.excludeIngredients,
      type: filterRecipe.type,
      instructionsRequired: filterRecipe.instructionsRequired,
      fillIngredients: filterRecipe.fillIngredients,
      addRecipeInformation: filterRecipe.addRecipeInformation,
      titleMatch: filterRecipe.titleMatch,
      maxReadyTime: filterRecipe.maxReadyTime,
      ignorePantry: filterRecipe.ignorePantry,
      sort: filterRecipe.sort,
      sortDirection: filterRecipe.sortDirection,
      minCarbs: filterRecipe.minCarbs,
      maxCarbs: filterRecipe.maxCarbs,
      minProtein: filterRecipe.minProtein,
      maxProtein: filterRecipe.maxProtein,
      minCalories: filterRecipe.minCalories,
      maxCalories: filterRecipe.maxCalories,
      minFat: filterRecipe.minFat,
      maxFat: filterRecipe.maxFat,
      minAlcohol: filterRecipe.minAlcohol,
      maxAlcohol: filterRecipe.maxAlcohol,
      minCaffeine: filterRecipe.minCaffeine,
      maxCaffeine: filterRecipe.maxCaffeine,
      minCopper: filterRecipe.minCopper,
      maxCopper: filterRecipe.maxCopper,
      minCalcium: filterRecipe.minCalcium,
      maxCalcium: filterRecipe.maxCalcium,
      minCholine: filterRecipe.minCholine,
      maxCholine: filterRecipe.maxCholine,
      minCholesterol: filterRecipe.minCholesterol,
      maxCholesterol: filterRecipe.maxCholesterol,
      minFluoride: filterRecipe.minFluoride,
      maxFluoride: filterRecipe.maxFluoride,
      minSaturatedFat: filterRecipe.minSaturatedFat,
      maxSaturatedFat: filterRecipe.maxSaturatedFat,
      minVitaminA: filterRecipe.minVitaminA,
      maxVitaminA: filterRecipe.maxVitaminA,
      minVitaminC: filterRecipe.minVitaminC,
      maxVitaminC: filterRecipe.maxVitaminC,
      minVitaminD: filterRecipe.minVitaminD,
      maxVitaminD: filterRecipe.maxVitaminD,
      minVitaminE: filterRecipe.minVitaminE,
      maxVitaminE: filterRecipe.maxVitaminE,
      minVitaminK: filterRecipe.minVitaminK,
      maxVitaminK: filterRecipe.maxVitaminK,
      minVitaminB1: filterRecipe.minVitaminB1,
      maxVitaminB1: filterRecipe.maxVitaminB1,
      minVitaminB2: filterRecipe.minVitaminB2,
      maxVitaminB2: filterRecipe.maxVitaminB2,
      minVitaminB5: filterRecipe.minVitaminB5,
      maxVitaminB5: filterRecipe.maxVitaminB5,
      minVitaminB3: filterRecipe.minVitaminB3,
      maxVitaminB3: filterRecipe.maxVitaminB3,
      minVitaminB6: filterRecipe.minVitaminB6,
      maxVitaminB6: filterRecipe.maxVitaminB6,
      minVitaminB12: filterRecipe.minVitaminB12,
      maxVitaminB12: filterRecipe.maxVitaminB12,
      minFiber: filterRecipe.minFiber,
      maxFiber: filterRecipe.maxFiber,
      minFolate: filterRecipe.minFolate,
      maxFolate: filterRecipe.maxFolate,
      minFolicAcid: filterRecipe.minFolicAcid,
      maxFolicAcid: filterRecipe.maxFolicAcid,
      minIodine: filterRecipe.minIodine,
      maxIodine: filterRecipe.maxIodine,
      minIron: filterRecipe.minIron,
      maxIron: filterRecipe.maxIron,
      minMagnesium: filterRecipe.minMagnesium,
      maxMagnesium: filterRecipe.maxMagnesium,
      minManganese: filterRecipe.minManganese,
      maxManganese: filterRecipe.maxManganese,
      minPhosphorus: filterRecipe.minPhosphorus,
      maxPhosphorus: filterRecipe.maxPhosphorus,
      minPotassium: filterRecipe.minPotassium,
      maxPotassium: filterRecipe.maxPotassium,
      minSelenium: filterRecipe.minSelenium,
      maxSelenium: filterRecipe.maxSelenium,
      minSodium: filterRecipe.minSodium,
      maxSodium: filterRecipe.maxSodium,
      minSugar: filterRecipe.minSugar,
      maxSugar: filterRecipe.maxSugar,
      minZinc: filterRecipe.minZinc,
      maxZinc: filterRecipe.maxZinc,
      offset: filterRecipe.offset,
      number: filterRecipe.number,
      limitLicense: filterRecipe.limitLicense,
      ranking: filterRecipe.ranking
    },
    headers: {
      'X-RapidAPI-Key': '4288b7764fmshe52fbf8fbecbc97p17e289jsna998622faf97',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  try {
  const response = await axios.request(recipes);
  return response.data
  } catch (error) {
    console.error(error);
  }
}

export const getIngredientsByID = async (id :string) => {
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`,
      headers: {
        'X-RapidAPI-Key': '4288b7764fmshe52fbf8fbecbc97p17e289jsna998622faf97',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      return response.data.ingredients;
    } catch (error) {
      console.error(error);
    }
}

export const getIntructionByID = async (id :string) => {
  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions`,
    params: {
      stepBreakdown: 'true'
    },
    headers: {
      'X-RapidAPI-Key': '4288b7764fmshe52fbf8fbecbc97p17e289jsna998622faf97',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data[0].steps;
  } catch (error) {
    console.error(error);
  }
}
