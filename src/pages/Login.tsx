import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset previous error

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      if (data.user.role === "doctor") {
        navigate("/doctor-home"); // Doctor page
      } else {
        navigate("/dashboard"); // Regular user page
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background">
      {/* Header */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
      >
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to continue your wellness journey
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-12 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="button" className="text-sm text-primary hover:underline">
            Forgot password?
          </button>

          <Button type="submit" variant="wellness" size="lg" className="w-full mt-6">
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
