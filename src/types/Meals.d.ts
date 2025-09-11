type MealsData = {
  meals: Meal[];
};

type Meal = {
  mealId: string;
  mealName: string;
  mealAlternate: string;
  mealCategory: string;
  mealArea: string;
  mealInstructions: string;
  mealThumbImage: string;
  mealTags: string;
  mealYoutubeTutorial: string;
  mealIngredient: MealIngredient[];
  mealSource: string;
  mealImageSource: string;
  mealCreativeCommonsConfirmed: string;
  dateModified: string;
  isFavourite: boolean;
};

type MealIngredient = {
  ingredientName: string;
  ingredientMeasure: string;
};

type PopularPicksData = {
  categoryName: string;
  meals: PopularPicksItem[];
  page: number;
  totalItems: number;
  totalPages: number;
};

type CuisinePicksData = {
  areaName: string;
  meals: PopularPicksItem[];
  page: number;
  totalItems: number;
  totalPages: number;
};

type PopularPicksItem = {
  isFavourite: boolean;
  mealId: string;
  mealName: string;
  mealThumbImage: string;
};
