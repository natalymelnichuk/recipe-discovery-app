
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
}

export interface MealsResponse {
    meals: MealSummary[] | null;
}

export interface MealDetail {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube?: string;
    [key: `strIngredient${number}`]: string | null | undefined;
    [key: `strMeasure${number}`]: string | null | undefined;
}

export interface MealDetailResponse {
    meals: MealDetail[] | null;
}