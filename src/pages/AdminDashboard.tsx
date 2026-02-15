import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Users, MapPin, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { drivers, routes, buses } from "@/data/mockData";
import { useRealtimeBus } from "@/hooks/useRealtimeBus";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { buses: realtimeBuses } = useRealtimeBus();

  useEffect(() => {
    const adminId = sessionStorage.getItem("adminId");
    if (!adminId) {
      navigate("/admin/login");
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return null;
  }

  const activeBuses = realtimeBuses.filter((b) => b.status === "active").length;
  const totalDrivers = drivers.length;
  const totalRoutes = routes.length;

  const handleLogout = () => {
    sessionStorage.removeItem("adminId");
    navigate("/");
  };

  const stats = [
    {
      label: "Active Buses",
      value: activeBuses,
      icon: "🚌",
      color: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      label: "Total Drivers",
      value: totalDrivers,
      icon: "👥",
      color: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      label: "Total Routes",
      value: totalRoutes,
      icon: "📍",
      color: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
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
          <div>
            <h1 className="text-3xl font-display">Admin Dashboard</h1>
            <p className="text-sm opacity-90 mt-1">Manage drivers, routes, and system settings</p>
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
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className={`${stat.color} border ${stat.borderColor}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-foreground">
                      {stat.label}
                    </span>
                    <span className="text-2xl">{stat.icon}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-display text-primary">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Management Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Driver Management */}
          <Card className="bg-background/95 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/admin/drivers")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Driver Management
              </CardTitle>
              <CardDescription>
                Add, edit, and manage driver accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-primary">{totalDrivers}</span> drivers in the system
                </p>
                <Button className="w-full mt-4" variant="outline">
                  Manage Drivers
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Management */}
          <Card className="bg-background/95 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/admin/routes")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Route Management
              </CardTitle>
              <CardDescription>
                Create and manage bus routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-primary">{totalRoutes}</span> active routes
                </p>
                <Button className="w-full mt-4" variant="outline">
                  Manage Routes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-background/95 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                System Analytics
              </CardTitle>
              <CardDescription>
                Real-time system metrics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Active Sessions</p>
                  <p className="text-2xl font-display text-primary">{activeBuses}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Idle Buses</p>
                  <p className="text-2xl font-display text-primary">{buses.length - activeBuses}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Total Buses</p>
                  <p className="text-2xl font-display text-primary">{buses.length}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                  <p className="text-2xl font-display text-primary">100%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Coming Soon</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Advanced features including: bulk driver invitations, route analytics, earnings reports, and system notifications.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
