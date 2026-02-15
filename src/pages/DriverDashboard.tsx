import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus, LogOut, MapPin, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const driverStats = [
    { label: "Today's Routes", value: "3", icon: MapPin },
    { label: "Total Distance", value: "125 km", icon: Activity },
    { label: "Hours Online", value: "8h 30m", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-primary-foreground shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="w-8 h-8" />
            <h1 className="text-3xl font-display">Driver Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {driverStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-background/95 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-foreground">
                        {stat.label}
                      </span>
                      <Icon className="w-5 h-5 text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-display text-primary">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-background/95 border-primary/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your driving activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Start Route
              </Button>
              <Button variant="outline" className="w-full">
                View Schedule
              </Button>
              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg"
        >
          <p className="text-center text-secondary-foreground font-body">
            Welcome! This is your driver dashboard. Use the buttons above to manage your routes and activities.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverDashboard;
