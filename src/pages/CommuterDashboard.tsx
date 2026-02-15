import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, List, ArrowLeft, Tag, Settings } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import BusMap from "@/components/commuter/BusMap";
import RouteList from "@/components/commuter/RouteList";
import CommuterFeatures from "@/components/commuter/CommuterFeatures";
import { type Route } from "@/data/mockData";
import { cn } from "@/lib/utils";

const CommuterDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground px-4 py-3 flex items-center justify-between shrink-0 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg">
            MyBus<span className="text-primary">App</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors",
              showFeatures
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <Settings className="w-3 h-3" />
            Features
          </button>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-xs font-body font-medium cursor-not-allowed opacity-70">
                <Tag className="w-3 h-3" />
                Fill My Bus Tag
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-body">Coming Soon! 🚀</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex bg-muted rounded-lg p-0.5 ml-2">
            <button
              onClick={() => setView("map")}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-body font-medium transition-colors",
                view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Map className="w-3.5 h-3.5" />
              Map
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-body font-medium transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-3.5 h-3.5" />
              Routes
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: toggle views, Desktop: side-by-side */}
        <div className={cn("flex-1", view === "list" && "hidden md:block")}>
          <BusMap selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
        </div>
        <div
          className={cn(
            "md:w-96 md:border-l md:border-border bg-card overflow-hidden",
            view === "map" ? "hidden md:flex md:flex-col" : "flex flex-col w-full md:w-96"
          )}
        >
          {showFeatures ? (
            <div className="flex-1 overflow-y-auto p-4">
              <CommuterFeatures selectedRoute={selectedRoute} />
            </div>
          ) : (
            <RouteList selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
          )}
        </div>
      </div>

      {/* Selected route bar */}
      {selectedRoute && (
        <div className="bg-card border-t border-border px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedRoute.color }} />
            <span className="font-display text-sm">{selectedRoute.from} → {selectedRoute.to}</span>
            <span className="text-xs text-muted-foreground font-body">{selectedRoute.estimatedDuration}</span>
          </div>
          <button
            onClick={() => setSelectedRoute(null)}
            className="text-xs text-primary font-body font-medium hover:underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CommuterDashboard;
