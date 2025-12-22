import { motion } from "framer-motion";

interface DoshaBadgeProps {
  dosha: "vata" | "pitta" | "kapha";
  size?: "sm" | "md" | "lg";
}

const doshaInfo = {
  vata: {
    label: "Vata",
    emoji: "🌬️",
    description: "Air & Space",
  },
  pitta: {
    label: "Pitta",
    emoji: "🔥",
    description: "Fire & Water",
  },
  kapha: {
    label: "Kapha",
    emoji: "🌿",
    description: "Earth & Water",
  },
};

const DoshaBadge = ({ dosha, size = "md" }: DoshaBadgeProps) => {
  const info = doshaInfo[dosha];
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`dosha-badge dosha-${dosha} ${sizeClasses[size]}`}
    >
      <span>{info.emoji}</span>
      <span className="font-semibold">{info.label}</span>
      {size === "lg" && (
        <span className="opacity-75">• {info.description}</span>
      )}
    </motion.div>
  );
};

export default DoshaBadge;
