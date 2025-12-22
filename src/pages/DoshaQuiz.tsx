import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    question: "My body is",
    options: [
      { id: "a", text: "Small", dosha: "vata" },
      { id: "b", text: "Rough", dosha: "vata" },
      { id: "c", text: "Medium", dosha: "pitta" },
      { id: "d", text: "Strong", dosha: "pitta" },
      { id: "e", text: "Smooth", dosha: "kapha" },
      { id: "f", text: "Oily", dosha: "kapha" },
      { id: "g", text: "Gentle", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    question: "My physique is",
    options: [
      { id: "a", text: "Thin", dosha: "vata" },
      { id: "b", text: "Weak", dosha: "vata" },
      { id: "c", text: "Medium", dosha: "pitta" },
      { id: "d", text: "Tender", dosha: "pitta" },
      { id: "e", text: "Heavy", dosha: "kapha" },
      { id: "f", text: "Attractive", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    question: "My skin is",
    options: [
      { id: "a", text: "Dry", dosha: "vata" },
      { id: "b", text: "Rough", dosha: "vata" },
      { id: "c", text: "Thin", dosha: "vata" },
      { id: "d", text: "Scaly", dosha: "vata" },
      { id: "e", text: "Soft", dosha: "kapha" },
      { id: "f", text: "Reddish", dosha: "pitta" },
      { id: "g", text: "Oily", dosha: "kapha" },
      { id: "h", text: "Thick", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    question: "My complexion is",
    options: [
      { id: "a", text: "Dark", dosha: "vata" },
      { id: "b", text: "Reddish", dosha: "pitta" },
      { id: "c", text: "With spots", dosha: "pitta" },
      { id: "d", text: "Moles and pimples", dosha: "pitta" },
      { id: "e", text: "Fair", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    question: "My hair is",
    options: [
      { id: "a", text: "Rough", dosha: "vata" },
      { id: "b", text: "Dry", dosha: "vata" },
      { id: "c", text: "Soft", dosha: "kapha" },
      { id: "d", text: "Brownish", dosha: "pitta" },
      { id: "e", text: "Thin", dosha: "vata" },
      { id: "f", text: "Oily", dosha: "kapha" },
      { id: "g", text: "Thick", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    question: "My nails are",
    options: [
      { id: "a", text: "Cracked", dosha: "vata" },
      { id: "b", text: "Dark", dosha: "vata" },
      { id: "c", text: "Reddish", dosha: "pitta" },
      { id: "d", text: "Sharp", dosha: "pitta" },
      { id: "e", text: "Whitish", dosha: "kapha" },
      { id: "f", text: "Soft", dosha: "kapha" },
      { id: "g", text: "Shining", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    question: "My teeth are",
    options: [
      { id: "a", text: "Small size", dosha: "vata" },
      { id: "b", text: "Irregular", dosha: "vata" },
      { id: "c", text: "Cracked", dosha: "vata" },
      { id: "d", text: "With gaps", dosha: "vata" },
      { id: "e", text: "Medium size", dosha: "pitta" },
      { id: "f", text: "Sometimes with discoloration", dosha: "pitta" },
      { id: "g", text: "Large size", dosha: "kapha" },
      { id: "h", text: "White", dosha: "kapha" },
      { id: "i", text: "Regular", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    question: "My gums are",
    options: [
      { id: "a", text: "Dry", dosha: "vata" },
      { id: "b", text: "Weak", dosha: "vata" },
      { id: "c", text: "Soft", dosha: "kapha" },
      { id: "d", text: "Tender", dosha: "pitta" },
      { id: "e", text: "Strong", dosha: "kapha" },
    ],
  },
  {
    id: 9,
    question: "My joints are",
    options: [
      { id: "a", text: "Weak", dosha: "vata" },
      { id: "b", text: "Make cracking sound on movement", dosha: "vata" },
      { id: "c", text: "Flaccid", dosha: "kapha" },
      { id: "d", text: "Lax", dosha: "kapha" },
      { id: "e", text: "Strong", dosha: "pitta" },
      { id: "f", text: "Stable", dosha: "kapha" },
    ],
  },
  {
    id: 10,
    question: "My activities are",
    options: [
      { id: "a", text: "Hyperactive", dosha: "vata" },
      { id: "b", text: "Moderate", dosha: "pitta" },
      { id: "c", text: "Slow", dosha: "kapha" },
      { id: "d", text: "Measured", dosha: "kapha" },
    ],
  },
  {
    id: 11,
    question: "My sleep is",
    options: [
      { id: "a", text: "Irregular", dosha: "vata" },
      { id: "b", text: "Disturbed", dosha: "vata" },
      { id: "c", text: "Moderate", dosha: "pitta" },
      { id: "d", text: "Sound", dosha: "kapha" },
      { id: "e", text: "Deep", dosha: "kapha" },
    ],
  },
  {
    id: 12,
    question: "My appetite is",
    options: [
      { id: "a", text: "Irregular", dosha: "vata" },
      { id: "b", text: "Heavy", dosha: "kapha" },
      { id: "c", text: "Uncontrollable", dosha: "pitta" },
      { id: "d", text: "Less but regular", dosha: "kapha" },
    ],
  },
  {
    id: 13,
    question: "My thirst is",
    options: [
      { id: "a", text: "Irregular", dosha: "vata" },
      { id: "b", text: "Excessive", dosha: "pitta" },
      { id: "c", text: "Less", dosha: "kapha" },
    ],
  },
  {
    id: 14,
    question: "My preferred tastes are",
    options: [
      { id: "a", text: "Sweet", dosha: "kapha" },
      { id: "b", text: "Sour", dosha: "pitta" },
      { id: "c", text: "Salty", dosha: "pitta" },
      { id: "d", text: "Bitter", dosha: "vata" },
      { id: "e", text: "Astringent", dosha: "vata" },
      { id: "f", text: "Pungent", dosha: "pitta" },
    ],
  },
  {
    id: 15,
    question: "My bowel habits are",
    options: [
      { id: "a", text: "Usually constipated", dosha: "vata" },
      { id: "b", text: "Dark coloured stools", dosha: "pitta" },
      { id: "c", text: "Loose", dosha: "pitta" },
      { id: "d", text: "Yellowish stools", dosha: "pitta" },
      { id: "e", text: "Semisolid stools with regular bowel habits", dosha: "kapha" },
    ],
  },
  {
    id: 16,
    question: "My cold tolerance is",
    options: [
      { id: "a", text: "Very less tolerance", dosha: "vata" },
      { id: "b", text: "Prefer cold conditions", dosha: "pitta" },
      { id: "c", text: "Medium tolerance", dosha: "kapha" },
    ],
  },
  {
    id: 17,
    question: "I sweat",
    options: [
      { id: "a", text: "Less", dosha: "vata" },
      { id: "b", text: "More", dosha: "pitta" },
      { id: "c", text: "My sweat has a foul smell", dosha: "pitta" },
    ],
  },
  {
    id: 18,
    question: "My eyes are",
    options: [
      { id: "a", text: "Dry", dosha: "vata" },
      { id: "b", text: "Drooping lids", dosha: "kapha" },
      { id: "c", text: "Moderate size", dosha: "pitta" },
      { id: "d", text: "Reddish", dosha: "pitta" },
      { id: "e", text: "Big", dosha: "kapha" },
      { id: "f", text: "Clear vision", dosha: "pitta" },
    ],
  },
  {
    id: 19,
    question: "My voice / speech is",
    options: [
      { id: "a", text: "Stammering", dosha: "vata" },
      { id: "b", text: "Weak", dosha: "vata" },
      { id: "c", text: "High pitch", dosha: "pitta" },
      { id: "d", text: "Deep rooted", dosha: "kapha" },
      { id: "e", text: "Strong", dosha: "kapha" },
    ],
  },
  {
    id: 20,
    question: "My concentration is",
    options: [
      { id: "a", text: "Very low", dosha: "vata" },
      { id: "b", text: "Medium", dosha: "pitta" },
      { id: "c", text: "Good", dosha: "kapha" },
    ],
  },
  {
    id: 21,
    question: "My intelligence is",
    options: [
      { id: "a", text: "Good grasping power but poor memory", dosha: "vata" },
      { id: "b", text: "Good grasping power with medium memory", dosha: "pitta" },
      { id: "c", text: "Good memory and retention power", dosha: "kapha" },
    ],
  },
  {
    id: 22,
    question: "My nature is",
    options: [
      { id: "a", text: "Confused", dosha: "vata" },
      { id: "b", text: "Vivacious", dosha: "vata" },
      { id: "c", text: "Anxious", dosha: "vata" },
      { id: "d", text: "Frightful", dosha: "vata" },
      { id: "e", text: "Hot and short tempered", dosha: "pitta" },
      { id: "f", text: "Impatient", dosha: "pitta" },
      { id: "g", text: "Passionate", dosha: "pitta" },
      { id: "h", text: "Calm and quiet with lots of patience", dosha: "kapha" },
    ],
  },
];


const DoshaQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (dosha: string) => {
    setAnswers(prev => {
      const currentSelections = prev[currentQuestion] || [];

      const updatedSelections = currentSelections.includes(dosha)
        ? currentSelections.filter(d => d !== dosha)
        : [...currentSelections, dosha];

      return {
        ...prev,
        [currentQuestion]: updatedSelections
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant dosha
      const doshaCount = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(answers).forEach((doshaArray) => {
        doshaArray.forEach((dosha) => {
          doshaCount[dosha as keyof typeof doshaCount]++;
        });
      });

      
      const dominantDosha = Object.entries(doshaCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      
      navigate("/dosha-result", {
        state: {
          dominantDosha,
          scores: doshaCount
        }
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => currentQuestion > 0 ? handlePrev() : navigate("/profile-setup")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
        
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion + 1} / {quizQuestions.length}
        </span>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 h-2 bg-muted rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-primary rounded-full"
        />
      </motion.div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-display font-semibold text-foreground leading-relaxed">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((option) => (
                <motion.button
                  key={option.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.dosha)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQuestion]?.includes(option.dosha)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className={`text-sm ${
                    answers[currentQuestion]?.includes(option.dosha)
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}>
                    {option.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="pt-6">
        <Button
          variant="wellness"
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!answers[currentQuestion] || answers[currentQuestion].length === 0}
        >
          {currentQuestion < quizQuestions.length - 1 ? (
            <>
              Next Question
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            "See My Results"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DoshaQuiz;
