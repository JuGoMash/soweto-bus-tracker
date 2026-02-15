import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus, LogOut, MapPin, Clock, Activity, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRealtimeBus } from "@/hooks/useRealtimeBus";
import { drivers, routes as routeData } from "@/data/mockData";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { startRoute, stopRoute, activeBuses } = useRealtimeBus();
  const [driverId] = useState("driver-1"); // In real app, this would come from auth
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [onlineTime, setOnlineTime] = useState<number>(0);

  const driver = drivers.find((d) => d.id === driverId);
  const route = driver?.routeId ? routeData.find((r) => r.id === driver.routeId) : null;
  const bus = driver?.routeId ? { id: `bus-${driver.id.split("-")[1]}` } : null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeRoute) {
      interval = setInterval(() => {
        setOnlineTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeRoute]);

  const handleStartRoute = () => {
    if (route && bus) {
      setActiveRoute(route.id);
      startRoute(driverId, bus.id, route.id);
    }
  };

  const handleStopRoute = () => {
    if (bus) {
      stopRoute(bus.id);
      setActiveRoute(null);
      setOnlineTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const handleLogout = () => {
    if (activeRoute) {
      handleStopRoute();
    }
    navigate("/");
  };

  const driverStats = [
    { label: "Current Route", value: route ? route.name : "None", icon: MapPin },
    { label: "Status", value: activeRoute ? "On Trip" : "Off Duty", icon: Activity },
    { label: "Time Online", value: formatTime(onlineTime), icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`shadow-lg transition-colors ${
          activeRoute ? "bg-green-700 text-white" : "bg-primary text-primary-foreground"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-display">Driver Dashboard</h1>
              {activeRoute && route && (
                <p className="text-sm opacity-90 mt-1">
                  ● Live: {route.from} → {route.to}
                </p>
              )}
            </div>
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
              <CardDescription>
                {route ? `Route: ${route.from} → ${route.to}` : "No route assigned"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {route && (
                <>
                  {!activeRoute ? (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                      onClick={handleStartRoute}
                    >
                      <Play className="w-4 h-4" />
                      Start Route
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
                      onClick={handleStopRoute}
                    >
                      <Square className="w-4 h-4" />
                      Stop Route
                    </Button>
                  )}
                </>
              )}
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
            {activeRoute ? (
              <>
                <strong>Route Active!</strong> Your bus location is being tracked in real-time for commuters.
              </>
            ) : (
              <>
                Welcome, {driver?.name}! Start a route to begin tracking and show commuters your bus location in real-time.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverDashboard;
