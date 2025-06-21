import { useState, useEffect } from "react";
import {
  HiPlus,
  HiMinus,
  HiOutlineChartBar,
  HiTrendingUp,
  HiCalendar,
} from "react-icons/hi";

interface CalorieEntry {
  id: string;
  date: string;
  calories: number;
  goal: number;
}

const CalorieTracker = () => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [addAmount, setAddAmount] = useState(100);
  const [entries, setEntries] = useState<CalorieEntry[]>([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Load data from localStorage
    const savedEntries = localStorage.getItem("calorieEntries");
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);

      // Find today's entry
      const todayEntry = parsedEntries.find(
        (entry: CalorieEntry) => entry.date === today
      );
      if (todayEntry) {
        setTodayCalories(todayEntry.calories);
        setDailyGoal(todayEntry.goal);
      }
    }
  }, [today]);

  const saveToStorage = (newEntries: CalorieEntry[]) => {
    localStorage.setItem("calorieEntries", JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const updateTodayCalories = (newCalories: number) => {
    setTodayCalories(newCalories);

    const existingEntryIndex = entries.findIndex(
      (entry) => entry.date === today
    );
    let newEntries;

    if (existingEntryIndex >= 0) {
      newEntries = [...entries];
      newEntries[existingEntryIndex] = {
        ...newEntries[existingEntryIndex],
        calories: newCalories,
        goal: dailyGoal,
      };
    } else {
      newEntries = [
        ...entries,
        {
          id: Date.now().toString(),
          date: today,
          calories: newCalories,
          goal: dailyGoal,
        },
      ];
    }

    saveToStorage(newEntries);
  };

  const addCalories = () => {
    const newTotal = todayCalories + addAmount;
    updateTodayCalories(newTotal);
  };

  const subtractCalories = () => {
    const newTotal = Math.max(0, todayCalories - addAmount);
    updateTodayCalories(newTotal);
  };

  const updateGoal = (newGoal: number) => {
    setDailyGoal(newGoal);
    updateTodayCalories(todayCalories);
  };

  const progressPercentage = Math.min((todayCalories / dailyGoal) * 100, 100);
  const remaining = Math.max(dailyGoal - todayCalories, 0);

  const getLastWeekData = () => {
    const lastWeek = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const entry = entries.find((e) => e.date === dateString);
      lastWeek.push({
        date: dateString,
        calories: entry ? entry.calories : 0,
        goal: entry ? entry.goal : dailyGoal,
      });
    }
    return lastWeek;
  };

  const weekData = getLastWeekData();
  const weeklyAverage =
    weekData.reduce((sum, day) => sum + day.calories, 0) / 7;

  return (
    <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Daily Calorie Tracker
          </h2>
          <p className="text-xl text-gray-600">
            Track your daily calorie intake and stay on target with your fitness
            goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Tracker */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Today's Progress
              </h3>
              <div className="flex items-center text-gray-500">
                <HiCalendar className="h-5 w-5 mr-2" />
                {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Progress Circle */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg
                className="w-48 h-48 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {todayCalories}
                </span>
                <span className="text-gray-500">calories</span>
                <span className="text-sm text-gray-400">of {dailyGoal}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {remaining}
                </div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Add/Remove:
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addCalories}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiPlus className="h-5 w-5" />
                  Add
                </button>
                <button
                  onClick={subtractCalories}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiMinus className="h-5 w-5" />
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Daily Goal:
                </label>
                <input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => updateGoal(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1000"
                  max="5000"
                />
              </div>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HiTrendingUp className="h-6 w-6 text-blue-600" />
              Weekly Overview
            </h3>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineChartBar className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  Weekly Average
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(weeklyAverage)} calories
              </div>
            </div>

            <div className="space-y-3">
              {weekData.map((day, index) => {
                const dayProgress =
                  day.goal > 0 ? (day.calories / day.goal) * 100 : 0;
                const dayName = new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const isToday = day.date === today;

                return (
                  <div
                    key={day.date}
                    className={`p-4 rounded-xl ${
                      isToday
                        ? "bg-blue-50 border-2 border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`font-medium ${
                          isToday ? "text-blue-900" : "text-gray-700"
                        }`}
                      >
                        {dayName} {isToday && "(Today)"}
                      </span>
                      <span
                        className={`text-sm ${
                          isToday ? "text-blue-700" : "text-gray-500"
                        }`}
                      >
                        {day.calories} / {day.goal}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isToday
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "bg-gradient-to-r from-green-400 to-green-500"
                        }`}
                        style={{ width: `${Math.min(dayProgress, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;
