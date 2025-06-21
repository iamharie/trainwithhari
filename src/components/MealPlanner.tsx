import React, { useState } from "react";
import {
  HiSearch,
  HiUser,
  HiMail,
  HiCalendar as HiCalendarIcon,
} from "react-icons/hi";
import { GiChefToque, GiKnifeFork } from "react-icons/gi";
import { BiLoaderAlt } from "react-icons/bi";
import { MdWarning } from "react-icons/md";

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealPlan {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
}

interface UserInfo {
  name: string;
  age: string;
  email: string;
}

const MealPlanner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    age: "",
    email: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isSavingToFirebase, setIsSavingToFirebase] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [mealPlanGoals, setMealPlanGoals] = useState({
    calories: 2000,
    protein: 150,
    dietType: "balanced",
  });

  // Mock OpenAI API call for food search
  const searchFood = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setApiKeyMissing(false);

    try {
      // In a real implementation, you would make an API call to OpenAI here
      // For now, we'll simulate the response with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      const mockResults: FoodItem[] = [
        {
          name: `${searchQuery} (100g)`,
          calories: Math.floor(Math.random() * 300) + 50,
          protein: Math.floor(Math.random() * 30) + 5,
          carbs: Math.floor(Math.random() * 50) + 10,
          fat: Math.floor(Math.random() * 20) + 2,
        },
        {
          name: `Grilled ${searchQuery}`,
          calories: Math.floor(Math.random() * 250) + 100,
          protein: Math.floor(Math.random() * 35) + 10,
          carbs: Math.floor(Math.random() * 20) + 5,
          fat: Math.floor(Math.random() * 15) + 3,
        },
        {
          name: `${searchQuery} Salad`,
          calories: Math.floor(Math.random() * 200) + 80,
          protein: Math.floor(Math.random() * 20) + 8,
          carbs: Math.floor(Math.random() * 30) + 10,
          fat: Math.floor(Math.random() * 12) + 4,
        },
      ];

      setSearchResults(mockResults);
    } catch (error) {
      console.error("Error searching for food:", error);
      setApiKeyMissing(true);
    } finally {
      setIsSearching(false);
    }
  };

  const generateMealPlan = async () => {
    setIsGeneratingPlan(true);
    setApiKeyMissing(false);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock meal plan generation
      const mockMealPlan: MealPlan = {
        breakfast: [
          {
            name: "Oatmeal with Berries",
            calories: 320,
            protein: 12,
            carbs: 54,
            fat: 8,
          },
          {
            name: "Greek Yogurt",
            calories: 150,
            protein: 20,
            carbs: 9,
            fat: 4,
          },
          { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
        ],
        lunch: [
          {
            name: "Grilled Chicken Breast",
            calories: 280,
            protein: 53,
            carbs: 0,
            fat: 6,
          },
          {
            name: "Quinoa Salad",
            calories: 220,
            protein: 8,
            carbs: 39,
            fat: 4,
          },
          {
            name: "Mixed Vegetables",
            calories: 80,
            protein: 3,
            carbs: 16,
            fat: 1,
          },
        ],
        dinner: [
          {
            name: "Salmon Fillet",
            calories: 350,
            protein: 39,
            carbs: 0,
            fat: 20,
          },
          {
            name: "Sweet Potato",
            calories: 180,
            protein: 4,
            carbs: 41,
            fat: 0,
          },
          {
            name: "Steamed Broccoli",
            calories: 55,
            protein: 6,
            carbs: 11,
            fat: 1,
          },
        ],
        snacks: [
          {
            name: "Almonds (28g)",
            calories: 164,
            protein: 6,
            carbs: 6,
            fat: 14,
          },
          {
            name: "Apple with Peanut Butter",
            calories: 190,
            protein: 8,
            carbs: 25,
            fat: 8,
          },
        ],
      };

      setMealPlan(mockMealPlan);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setApiKeyMissing(true);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Firebase integration placeholder
  const saveToFirebase = async () => {
    if (!userInfo.name || !userInfo.age || !userInfo.email) {
      alert("Please fill in all user information fields");
      return;
    }

    if (getTotalNutrition().calories === 0) {
      alert("Please generate a meal plan first");
      return;
    }

    setIsSavingToFirebase(true);

    try {
      // Firebase integration placeholder
      const mealPlanData = {
        userInfo,
        mealPlan,
        mealPlanGoals,
        totalNutrition: getTotalNutrition(),
        createdAt: new Date().toISOString(),
        id: Date.now().toString(), // In real implementation, Firebase will generate this
      };

      // Simulate Firebase save
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual Firebase integration
      console.log("Meal plan data to save to Firebase:", mealPlanData);

      // Placeholder for Firebase Firestore integration:
      /*
      import { collection, addDoc, getFirestore } from 'firebase/firestore';
      
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'mealPlans'), mealPlanData);
      console.log('Document written with ID: ', docRef.id);
      */

      alert(
        "Meal plan saved successfully! (This is a demo - Firebase integration pending)"
      );
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Error saving meal plan. Please try again.");
    } finally {
      setIsSavingToFirebase(false);
    }
  };

  const addToMeal = (food: FoodItem, mealType: keyof MealPlan) => {
    setMealPlan((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], food],
    }));
  };

  const removeFromMeal = (index: number, mealType: keyof MealPlan) => {
    setMealPlan((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((_, i) => i !== index),
    }));
  };

  const getTotalNutrition = () => {
    const allFoods = [
      ...mealPlan.breakfast,
      ...mealPlan.lunch,
      ...mealPlan.dinner,
      ...mealPlan.snacks,
    ];
    return allFoods.reduce(
      (total, food) => ({
        calories: total.calories + food.calories,
        protein: total.protein + food.protein,
        carbs: total.carbs + food.carbs,
        fat: total.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totalNutrition = getTotalNutrition();

  return (
    <div className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Meal Planner
          </h2>
          <p className="text-xl text-gray-600">
            Search for foods and generate personalized meal plans with OpenAI
            integration
          </p>
        </div>

        {apiKeyMissing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <MdWarning className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-yellow-800 font-medium">
                OpenAI API Configuration Required
              </p>
              <p className="text-yellow-700 text-sm">
                To use the AI-powered features, you'll need to configure your
                OpenAI API key. Currently showing mock data for demonstration.
              </p>
            </div>
          </div>
        )}

        {/* User Information Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HiUser className="h-6 w-6 text-orange-600" />
            Your Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiUser className="h-4 w-4 inline mr-1" />
                Full Name
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiCalendarIcon className="h-4 w-4 inline mr-1" />
                Age
              </label>
              <input
                type="number"
                value={userInfo.age}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, age: e.target.value }))
                }
                placeholder="Enter your age"
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiMail className="h-4 w-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Search */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HiSearch className="h-6 w-6 text-orange-600" />
              Food Search
            </h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food items..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && searchFood()}
                />
                <button
                  onClick={searchFood}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50"
                >
                  {isSearching ? (
                    <BiLoaderAlt className="h-5 w-5 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((food, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {food.name}
                        </h4>
                        <span className="text-sm text-orange-600 font-medium">
                          {food.calories} cal
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </div>
                      <div className="flex gap-2">
                        <select
                          className="flex-1 text-sm px-2 py-1 border border-gray-300 rounded-lg"
                          onChange={(e) =>
                            e.target.value &&
                            addToMeal(food, e.target.value as keyof MealPlan)
                          }
                          defaultValue=""
                        >
                          <option value="">Add to meal...</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snacks">Snacks</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Meal Plan Generator */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GiChefToque className="h-6 w-6 text-orange-600" />
              Generate Meal Plan
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Calories
                </label>
                <input
                  type="number"
                  value={mealPlanGoals.calories}
                  onChange={(e) =>
                    setMealPlanGoals((prev) => ({
                      ...prev,
                      calories: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Protein (g)
                </label>
                <input
                  type="number"
                  value={mealPlanGoals.protein}
                  onChange={(e) =>
                    setMealPlanGoals((prev) => ({
                      ...prev,
                      protein: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Type
                </label>
                <select
                  value={mealPlanGoals.dietType}
                  onChange={(e) =>
                    setMealPlanGoals((prev) => ({
                      ...prev,
                      dietType: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="balanced">Balanced</option>
                  <option value="high-protein">High Protein</option>
                  <option value="low-carb">Low Carb</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </div>

              <button
                onClick={generateMealPlan}
                disabled={isGeneratingPlan}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingPlan ? (
                  <>
                    <BiLoaderAlt className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Meal Plan"
                )}
              </button>
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GiKnifeFork className="h-6 w-6 text-orange-600" />
              Daily Totals
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {totalNutrition.calories}
                  </div>
                  <div className="text-sm text-gray-600">Total Calories</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {totalNutrition.protein}g
                  </div>
                  <div className="text-xs text-gray-600">Protein</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {totalNutrition.carbs}g
                  </div>
                  <div className="text-xs text-gray-600">Carbs</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-600">
                    {totalNutrition.fat}g
                  </div>
                  <div className="text-xs text-gray-600">Fat</div>
                </div>
              </div>

              {/* Save to Firebase Button */}
              <button
                onClick={saveToFirebase}
                disabled={isSavingToFirebase || totalNutrition.calories === 0}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {isSavingToFirebase ? (
                  <>
                    <BiLoaderAlt className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Meal Plan"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Meal Plan Display */}
        {(mealPlan.breakfast.length > 0 ||
          mealPlan.lunch.length > 0 ||
          mealPlan.dinner.length > 0 ||
          mealPlan.snacks.length > 0) && (
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Daily Meal Plan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(["breakfast", "lunch", "dinner", "snacks"] as const).map(
                (mealType) => (
                  <div key={mealType} className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                      {mealType}
                    </h4>
                    <div className="space-y-3">
                      {mealPlan[mealType].map((food, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-3 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-900 text-sm">
                              {food.name}
                            </span>
                            <button
                              onClick={() => removeFromMeal(index, mealType)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-xs text-gray-600">
                            {food.calories} cal | P: {food.protein}g | C:{" "}
                            {food.carbs}g | F: {food.fat}g
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
