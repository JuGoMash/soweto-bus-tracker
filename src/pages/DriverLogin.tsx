import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { drivers } from "@/data/mockData";

const DriverLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Validate credentials against drivers database
      const driver = drivers.find((d) => d.phone === phone && d.pin === pin);

      if (driver) {
        // Store driver session (in a real app, this would be in localStorage/session)
        sessionStorage.setItem("driverId", driver.id);
        setIsLoading(false);
        navigate("/driver/dashboard");
      } else {
        setError("Invalid phone number or PIN. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-body">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bus className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-display text-primary-foreground tracking-tight">
            Driver Portal
          </h1>
        </div>
        <p className="text-sm text-secondary-foreground/80 font-body">
          Sign in to access your dashboard
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-background/95 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle>Driver Login</CardTitle>
            <CardDescription>Enter your phone number and PIN</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: 10 digits (e.g., 0712345678)
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="pin" className="text-sm font-medium">
                  PIN
                </label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  4-digit PIN provided by admin
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading || !phone || !pin}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo credentials hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700"
            >
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-1 font-mono text-blue-600">
                <p>Phone: 0712345678 | PIN: 1234</p>
                <p>Phone: 0723456789 | PIN: 5678</p>
                <p>Phone: 0734567890 | PIN: 9012</p>
                <p>Phone: 0745678901 | PIN: 3456</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-secondary-foreground/50 text-sm font-body relative z-10"
      >
        PUTCO Bus Services — Soweto & Johannesburg
      </motion.p>
    </div>
  );
};

export default DriverLogin;
