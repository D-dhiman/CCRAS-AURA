import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Calendar, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const Insights = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 68 },
    { day: "Thu", score: 75 },
    { day: "Fri", score: 82 },
    { day: "Sat", score: 78 },
    { day: "Sun", score: 85 },
  ];

  const insights = [
    {
      icon: "🌧️",
      title: "Weather Impact",
      description: "You tend to feel more tired on humid days. Consider lighter activities when humidity is above 75%.",
    },
    {
      icon: "😴",
      title: "Sleep Pattern",
      description: "Your wellness scores are 20% higher when you sleep before 10:30 PM.",
    },
    {
      icon: "🍽️",
      title: "Diet Connection",
      description: "Days when you avoided spicy food showed better digestion scores.",
    },
    {
      icon: "🧘",
      title: "Activity Insight",
      description: "Light yoga on hot days helped reduce your Pitta imbalance by 15%.",
    },
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
          <h1 className="text-2xl font-display font-bold text-foreground">Insights</h1>
          <p className="text-sm text-muted-foreground">Your wellness patterns</p>
        </div>
      </motion.div>

      {/* Weekly Score Chart */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="wellness-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Weekly Wellness Score</h3>
            </div>
            <div className="flex items-center gap-1 text-kapha">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  domain={[50, 100]} 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.section>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="wellness-card text-center">
            <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Days Logged</p>
          </div>
          <div className="wellness-card text-center">
            <Droplets className="w-5 h-5 text-vata mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">76</p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
        </div>
      </motion.section>

      {/* Insights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-24"
      >
        <h2 className="section-title">Personalized Insights</h2>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="wellness-card"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <h4 className="font-medium text-foreground">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <BottomNavigation />
    </div>
  );
};

export default Insights;
