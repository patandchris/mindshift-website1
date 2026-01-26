import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Blog from "./pages/Blog";
import Podcast from "./pages/Podcast";
import WeekOneOffer from "./pages/WeekOneOffer";
import CoachingProgram from "./pages/CoachingProgram";
import NotFound from "./pages/NotFound";
import UploadVideo from "./pages/UploadVideo";
import Auth from "./pages/Auth";
import MindshiftApp from "./pages/MindshiftApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/coaching-program" element={<CoachingProgram />} />
          <Route path="/week-one-offer" element={<WeekOneOffer />} />
          <Route path="/upload-video" element={<UploadVideo />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mindshift-app" element={<MindshiftApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
