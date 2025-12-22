import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DoshaBadge from "@/components/DoshaBadge";
import { Sparkles } from "lucide-react";

const doshaDetails = {
  vata: {
    title: "Vata Dominant",
    elements: "Air & Space",
    description: "You have a creative, quick-thinking mind with natural enthusiasm. Vata types are known for their energy, flexibility, and innovative spirit. When balanced, you're lively, imaginative, and inspiring.",
    qualities: ["Creative & Imaginative", "Quick Learner", "Energetic & Enthusiastic", "Flexible & Adaptable"],
    tips: "Focus on grounding routines, warm foods, and calming practices to stay balanced.",
  },
  pitta: {
    title: "Pitta Dominant",
    elements: "Fire & Water",
    description: "You have a sharp intellect with natural leadership abilities. Pitta types are known for their determination, courage, and strong digestion. When balanced, you're focused, confident, and joyful.",
    qualities: ["Sharp Intellect", "Natural Leader", "Strong Digestion", "Goal-Oriented"],
    tips: "Focus on cooling practices, moderate exercise, and avoiding excessive heat to stay balanced.",
  },
  kapha: {
    title: "Kapha Dominant",
    elements: "Earth & Water",
    description: "You have a calm, nurturing nature with great endurance. Kapha types are known for their stability, loyalty, and compassion. When balanced, you're grounded, loving, and supportive.",
    qualities: ["Calm & Stable", "Strong Endurance", "Compassionate", "Loyal & Supportive"],
    tips: "Focus on stimulating activities, light foods, and regular exercise to stay balanced.",
  },
};

const DoshaResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dosha = (location.state?.dosha as "vata" | "pitta" | "kapha") || "vata";
  const details = doshaDetails[dosha];

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className={`absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl ${
            dosha === "vata" ? "bg-vata" : dosha === "pitta" ? "bg-pitta" : "bg-kapha"
          }`}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Celebration icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-accent" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-muted-foreground font-medium">Your Constitution</p>
          <h1 className="text-3xl font-display font-bold text-foreground mt-2">
            {details.title}
          </h1>
          <div className="flex justify-center mt-4">
            <DoshaBadge dosha={dosha} size="lg" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-muted-foreground leading-relaxed text-center">
            {details.description}
          </p>
        </motion.div>

        {/* Qualities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <h3 className="text-sm font-medium text-foreground mb-3">Your Natural Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {details.qualities.map((quality, index) => (
              <motion.span
                key={quality}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground"
              >
                {quality}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <p className="text-sm text-foreground">
            <span className="font-medium">💡 Tip: </span>
            {details.tips}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-auto pt-8"
        >
          <Button
            variant="wellness"
            size="lg"
            className="w-full"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default DoshaResult;
