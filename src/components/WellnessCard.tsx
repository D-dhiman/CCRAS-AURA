import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface WellnessCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const WellnessCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
  onClick,
  children,
  className = "",
}: WellnessCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`wellness-card cursor-pointer ${className}`}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`p-3 rounded-xl bg-muted ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          {value && (
            <p className="text-xl font-display font-semibold text-foreground mt-1">
              {value}
            </p>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessCard;
