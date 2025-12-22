import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    question: "How would you describe your body frame?",
    options: [
      { id: "a", text: "Thin and light, I find it hard to gain weight", dosha: "vata" },
      { id: "b", text: "Medium build, well-proportioned", dosha: "pitta" },
      { id: "c", text: "Solid and sturdy, I gain weight easily", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    question: "How is your skin typically?",
    options: [
      { id: "a", text: "Dry, thin, and prone to roughness", dosha: "vata" },
      { id: "b", text: "Warm, oily, or prone to redness", dosha: "pitta" },
      { id: "c", text: "Thick, smooth, and well-moisturized", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    question: "How do you handle cold weather?",
    options: [
      { id: "a", text: "I get cold easily and dislike it", dosha: "vata" },
      { id: "b", text: "I tolerate cold well, prefer cooler temperatures", dosha: "pitta" },
      { id: "c", text: "I handle cold okay but prefer warm weather", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    question: "How is your appetite typically?",
    options: [
      { id: "a", text: "Variable - sometimes hungry, sometimes not", dosha: "vata" },
      { id: "b", text: "Strong and regular, I get irritable if I skip meals", dosha: "pitta" },
      { id: "c", text: "Steady but moderate, I can skip meals easily", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    question: "How would you describe your sleep?",
    options: [
      { id: "a", text: "Light sleeper, often wake up during the night", dosha: "vata" },
      { id: "b", text: "Moderate sleep, may wake up feeling warm", dosha: "pitta" },
      { id: "c", text: "Deep and long, hard to wake up in the morning", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    question: "How do you typically respond to stress?",
    options: [
      { id: "a", text: "Anxious, worried, overthinking", dosha: "vata" },
      { id: "b", text: "Irritable, frustrated, critical", dosha: "pitta" },
      { id: "c", text: "Withdrawn, avoidant, unmotivated", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    question: "How is your digestion?",
    options: [
      { id: "a", text: "Irregular - bloating, gas, constipation", dosha: "vata" },
      { id: "b", text: "Strong but prone to acidity or heartburn", dosha: "pitta" },
      { id: "c", text: "Slow but steady, may feel heavy after eating", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    question: "How would you describe your energy levels?",
    options: [
      { id: "a", text: "Comes in bursts, I tire easily", dosha: "vata" },
      { id: "b", text: "High and intense, but can burn out", dosha: "pitta" },
      { id: "c", text: "Steady and sustainable throughout the day", dosha: "kapha" },
    ],
  },
];

const DoshaQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (dosha: string) => {
    setAnswers({ ...answers, [currentQuestion]: dosha });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant dosha
      const doshaCount = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(answers).forEach((dosha) => {
        doshaCount[dosha as keyof typeof doshaCount]++;
      });
      
      const dominantDosha = Object.entries(doshaCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      
      navigate("/dosha-result", { state: { dosha: dominantDosha } });
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
                    answers[currentQuestion] === option.dosha
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className={`text-sm ${
                    answers[currentQuestion] === option.dosha
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
          disabled={!answers[currentQuestion]}
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
