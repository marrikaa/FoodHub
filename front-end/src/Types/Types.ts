import Instruction from "../Components/Instruction/Instruction";

export type RecipeType = {
    query?: string,
    cuisine?: string,
    excludeCuisine?: string,
    diet?: string,
    intolerances?: string,
    equipment?: string,
    includeIngredients?: string,
    excludeIngredients?: string,
    type?: string,
    instructionsRequired?: string,
    fillIngredients?: string,
    addRecipeInformation?: string,
    titleMatch?: string,
    maxReadyTime?: string,
    ignorePantry?: string,
    sort?:string,
    sortDirection?: string,
    minCarbs?: string,
    maxCarbs?: string,
    minProtein?: string,
    maxProtein?: string,
    minCalories?: string,
    maxCalories?: string,
    minFat?: string,
    maxFat?: string,
    minAlcohol?:string,
    maxAlcohol?: string,
    minCaffeine?: string,
    maxCaffeine?: string,
    minCopper?: string,
    maxCopper?: string,
    minCalcium?: string,
    maxCalcium?:string,
    minCholine?: string,
    maxCholine?: string,
    minCholesterol?:string,
    maxCholesterol?: string,
    minFluoride?: string,
    maxFluoride?: string,
    minSaturatedFat?: string,
    maxSaturatedFat?: string,
    minVitaminA?: string,
    maxVitaminA?: string,
    minVitaminC?:string,
    maxVitaminC?: string,
    minVitaminD?: string,
    maxVitaminD?: string,
    minVitaminE?: string,
    maxVitaminE?: string,
    minVitaminK?: string,
    maxVitaminK?: string,
    minVitaminB1?: string,
    maxVitaminB1?: string,
    minVitaminB2?: string,
    maxVitaminB2?: string,
    minVitaminB5?: string,
    maxVitaminB5?:string,
    minVitaminB3?: string,
    maxVitaminB3?: string,
    minVitaminB6?: string,
    maxVitaminB6?: string,
    minVitaminB12?: string,
    maxVitaminB12?: string,
    minFiber?: string,
    maxFiber?: string,
    minFolate?: string,
    maxFolate?: string,
    minFolicAcid?: string,
    maxFolicAcid?: string,
    minIodine?: string,
    maxIodine?: string,
    minIron?: string,
    maxIron?: string,
    minMagnesium?: string,
    maxMagnesium?: string,
    minManganese?: string,
    maxManganese?: string,
    minPhosphorus?: string,
    maxPhosphorus?: string,
    minPotassium?: string,
    maxPotassium?: string,
    minSelenium?: string,
    maxSelenium?: string,
    minSodium?: string,
    maxSodium?: string,
    minSugar?: string,
    maxSugar?: string,
    minZinc?: string,
    maxZinc?: string,
    offset?: string,
    number?: string,
    limitLicense?: string,
    ranking?: string
}

export type RecipeCardItem ={
    title: string,
    image: string,
    id:string,
    isFav: boolean,
}

export type Idtype = {
    recipeId:string;
}
export type AmountType1={
    value:string;
    unit:string;
}
export type AmountType2={
    metric:AmountType1;
    us:AmountType1;
}

export type IngredientsType = {
    image :string;
    name:string;
    amount:AmountType2;
}

export type InstructionType = {
    number:number
    step:string
}

export type AppContextType = {
    user: any,
    setUser: (user:any) => void,
    recipes: RecipeCardItem[],
    setRecipes: (recipe: RecipeCardItem[]) => void,
    recipeDetails :  RecipeDetailsType;
    setRecipeDetails: (recipe: RecipeDetailsType) => void,
}

export type RecipeDetailsType={
    nameAndImage? :RecipeCardItem;
    ingredient? :IngredientsType;
    instruction? : InstructionType;
}

export type UserIngredients = {
    ingredients: string,
    number: string,
    ignorePantry: string,
    ranking: string
}

export type BlogType = {
    title: string,
    ingredients:string[],
    image:string,
    description: string,
    owner: string,
    instruction: string[],
}