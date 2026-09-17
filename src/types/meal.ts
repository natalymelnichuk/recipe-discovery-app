
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
}

export interface MealsResponse {
    meals: MealSummary[] | null;
}