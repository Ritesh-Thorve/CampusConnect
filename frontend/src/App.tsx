import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppToaster from "../src/components/AppToaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "@/redux/store/hooks";
import { hydrateFromStorage } from "@/redux/features/auth/authSlice";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import College from "./pages/College";
import Updates from "./pages/Updates";
import Trends from "./pages/Trends";
import NotFound from "./pages/NotFound";
import OAuthCallback from "./pages/OAuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateFromStorage()); // Restore token/user at startup
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppToaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/college" element={<College />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
