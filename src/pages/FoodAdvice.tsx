import { motion } from "framer-motion";
import { ArrowLeft, Check, X, Utensils, Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const FoodAdvice = () => {
  const navigate = useNavigate();

  const preferFoods = [
    { name: "Cucumber & Melon", reason: "Cooling effect for Pitta", emoji: "🥒" },
    { name: "Coconut Water", reason: "Natural coolant", emoji: "🥥" },
    { name: "Leafy Greens", reason: "Bitter taste balances fire", emoji: "🥬" },
    { name: "Basmati Rice", reason: "Light and cooling grain", emoji: "🍚" },
    { name: "Sweet Fruits", reason: "Mangoes, grapes, sweet berries", emoji: "🍇" },
    { name: "Milk & Ghee", reason: "Cooling dairy options", emoji: "🥛" },
  ];

  const avoidFoods = [
    { name: "Spicy Foods", reason: "Increases Pitta heat", emoji: "🌶️" },
    { name: "Fermented Foods", reason: "Can aggravate acidity", emoji: "🫙" },
    { name: "Red Meat", reason: "Heavy and heating", emoji: "🥩" },
    { name: "Alcohol", reason: "Increases internal heat", emoji: "🍺" },
    { name: "Sour Fruits", reason: "Citrus, sour berries", emoji: "🍋" },
    { name: "Fried Foods", reason: "Heavy and oily", emoji: "🍟" },
  ];

  const eatingHabits = [
    { habit: "Eat at regular times", detail: "Maintain consistent meal schedule" },
    { habit: "Avoid eating when angry", detail: "Emotions affect digestion" },
    { habit: "Drink room temperature water", detail: "Not too cold or hot" },
    { habit: "Eat your largest meal at lunch", detail: "When digestive fire is strongest" },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Food Advice</h1>
          <p className="text-sm text-muted-foreground">Personalized for Pitta + Hot Weather</p>
        </div>
      </motion.div>

      {/* Context Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wellness-card mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-pitta/10">
            <Flame className="w-6 h-6 text-pitta" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Why this advice?</p>
            <p className="text-foreground font-medium">
              Because today is hot and your body type is Pitta, prefer cooling foods to maintain balance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Foods to Prefer */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-kapha/10">
            <Check className="w-4 h-4 text-kapha" />
          </div>
          <h2 className="section-title mb-0">Foods to Prefer</h2>
        </div>
        <div className="grid gap-3">
          {preferFoods.map((food, index) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <span className="text-2xl">{food.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{food.name}</p>
                <p className="text-sm text-muted-foreground">{food.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Foods to Avoid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-destructive/10">
            <X className="w-4 h-4 text-destructive" />
          </div>
          <h2 className="section-title mb-0">Foods to Avoid</h2>
        </div>
        <div className="grid gap-3">
          {avoidFoods.map((food, index) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border opacity-80"
            >
              <span className="text-2xl">{food.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{food.name}</p>
                <p className="text-sm text-muted-foreground">{food.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Eating Habits */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-24"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Clock className="w-4 h-4 text-accent" />
          </div>
          <h2 className="section-title mb-0">Eating Habits for Today</h2>
        </div>
        <div className="wellness-card">
          <div className="space-y-4">
            {eatingHabits.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.habit}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <BottomNavigation />
    </div>
  );
};

export default FoodAdvice;
