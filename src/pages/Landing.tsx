import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus, UserRound, Settings } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4 relative overflow-hidden">
      {/* Admin button - top right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate("/admin/login")}
        className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors z-10 px-2 py-1.5 rounded-md hover:bg-muted/50"
      >
        <Settings className="w-4 h-4" />
        <span>Admin</span>
      </motion.button>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-bus-warm blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bus className="w-12 h-12 text-primary" />
          <h1 className="text-5xl md:text-6xl font-display text-primary-foreground tracking-tight">
            MyBus<span className="text-primary">App</span>
          </h1>
        </div>
        <p className="text-lg md:text-xl text-secondary-foreground/80 font-body italic">
          Turning Emotion into Information
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/commuter")}
          className="group flex flex-col items-center gap-4 bg-primary text-primary-foreground rounded-2xl px-12 py-10 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
        >
          <UserRound className="w-16 h-16 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-display">I'm a Commuter</span>
          <span className="text-sm opacity-80 font-body">Track buses & routes</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/driver/login")}
          className="group flex flex-col items-center gap-4 bg-secondary-foreground text-secondary rounded-2xl px-12 py-10 shadow-xl hover:shadow-2xl transition-shadow border-2 border-primary/20 cursor-pointer"
        >
          <Bus className="w-16 h-16 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-display">I'm a Driver</span>
          <span className="text-sm opacity-80 font-body">Access your dashboard</span>
        </motion.button>
      </div>

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

export default Landing;
