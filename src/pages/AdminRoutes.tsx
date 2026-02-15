import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes as initialRoutes } from "@/data/mockData";
import type { Route } from "@/data/mockData";

const colors = ["#F97316", "#EAB308", "#1E40AF", "#DC2626", "#7C3AED", "#059669"];

const AdminRoutes = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    to: "",
    busNumber: "",
    busName: "",
    estimatedDuration: "",
    color: colors[0],
  });

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

  const handleAddRoute = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      name: "",
      from: "",
      to: "",
      busNumber: "",
      busName: "",
      estimatedDuration: "",
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  const handleEditRoute = (route: Route) => {
    setShowForm(true);
    setEditingId(route.id);
    setFormData({
      name: route.name,
      from: route.from,
      to: route.to,
      busNumber: route.busNumber,
      busName: route.busName,
      estimatedDuration: route.estimatedDuration,
      color: route.color,
    });
  };

  const handleSaveRoute = () => {
    if (!formData.name || !formData.from || !formData.to) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Edit existing route
      setRoutes(
        routes.map((r) =>
          r.id === editingId
            ? { ...r, ...formData }
            : r
        )
      );
    } else {
      // Add new route
      const newRoute: Route = {
        id: `route-${Date.now()}`,
        ...formData,
        stops: [
          { id: "s1", name: formData.from, lat: -26.2285, lng: 27.8965 },
          { id: "s2", name: formData.to, lat: -26.2041, lng: 28.0473 },
        ],
      };
      setRoutes([...routes, newRoute]);
    }

    setShowForm(false);
    setFormData({
      name: "",
      from: "",
      to: "",
      busNumber: "",
      busName: "",
      estimatedDuration: "",
      color: colors[0],
    });
  };

  const handleDeleteRoute = (id: string) => {
    if (confirm("Are you sure you want to delete this route?")) {
      setRoutes(routes.filter((r) => r.id !== id));
    }
  };

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
            <button onClick={() => navigate("/admin/dashboard")} className="hover:opacity-80">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-display">Route Management</h1>
              <p className="text-sm opacity-90 mt-1">{routes.length} routes in system</p>
            </div>
          </div>
          <Button onClick={handleAddRoute} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Route
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-background/95 border-primary/20">
              <CardHeader>
                <CardTitle>
                  {editingId ? "Edit Route" : "Add New Route"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Route Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Route 1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">From (Origin)</label>
                      <Input
                        value={formData.from}
                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                        placeholder="Meadowlands"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">To (Destination)</label>
                      <Input
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        placeholder="Johannesburg CBD"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Bus Number</label>
                      <Input
                        value={formData.busNumber}
                        onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                        placeholder="P-101"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bus Name</label>
                      <Input
                        value={formData.busName}
                        onChange={(e) => setFormData({ ...formData, busName: e.target.value })}
                        placeholder="PUTCO Meadowlands Express"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Estimated Duration</label>
                      <Input
                        value={formData.estimatedDuration}
                        onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                        placeholder="45 min"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Route Color</label>
                      <div className="flex gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormData({ ...formData, color })}
                            className={`w-8 h-8 rounded-full border-2 ${
                              formData.color === color ? "border-foreground" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSaveRoute} className="flex-1">
                      {editingId ? "Update" : "Create"} Route
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Routes List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {routes.map((route) => (
            <Card key={route.id} className="bg-background/95 border-primary/20 relative">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t"
                style={{ backgroundColor: route.color }}
              />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: route.color }}
                  />
                  {route.name}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {route.from} → {route.to}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Bus</p>
                    <p className="font-semibold">{route.busName}</p>
                    <p className="text-xs text-muted-foreground">{route.busNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Duration</p>
                    <p className="font-semibold">{route.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stops</p>
                    <p className="font-semibold">{route.stops.length} stops</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditRoute(route)}
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteRoute(route.id)}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRoutes;
