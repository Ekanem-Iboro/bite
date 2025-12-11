import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import RiderProfile from "./pages/RiderProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useAuthStore } from "./store/useAuthStore";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const user = useAuthStore((s) => s.currentUser);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tracking/:riderId"
            element={
              <PrivateRoute>
                <Tracking />
              </PrivateRoute>
            }
          />
          <Route
            path="/rider/:id"
            element={
              <PrivateRoute>
                <RiderProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
