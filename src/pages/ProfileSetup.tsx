import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";

const lifestyleOptions = [
  { id: "student", label: "Student", emoji: "📚" },
  { id: "working", label: "Working Professional", emoji: "💼" },
  { id: "active", label: "Active & Athletic", emoji: "🏃" },
  { id: "sedentary", label: "Sedentary", emoji: "🪑" },
];

const genderOptions = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
  { id: "prefer-not", label: "Prefer not to say" },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [selectedLifestyle, setSelectedLifestyle] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dosha-quiz");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background">
      {/* Header */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/signup")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col max-w-sm mx-auto w-full mt-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground">
          Tell us about yourself
        </h1>
        <p className="mt-2 text-muted-foreground">
          We'll personalize your wellness experience
        </p>

        <form onSubmit={handleContinue} className="mt-8 space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input type="text" placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Age</label>
            <Input type="number" placeholder="Your age" min="1" max="120" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender (optional)</label>
            <div className="grid grid-cols-2 gap-2">
              {genderOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedGender(option.id)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedGender === option.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">City</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="text" placeholder="Your city" className="pl-12" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Lifestyle</label>
            <div className="grid grid-cols-2 gap-3">
              {lifestyleOptions.map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedLifestyle(option.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedLifestyle === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <p className={`mt-2 text-sm font-medium ${
                    selectedLifestyle === option.id ? "text-primary" : "text-foreground"
                  }`}>
                    {option.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="wellness"
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
