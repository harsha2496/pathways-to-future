import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import SpecializationsPage from "./pages/SpecializationsPage";
import TopCollegesPage from "./pages/TopCollegesPage";
import AIChatPage from "./pages/AIChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="courses/:streamId" element={<CoursesPage />} />
            <Route path="specializations/:streamId/:courseId" element={<SpecializationsPage />} />
            <Route path="top-colleges/:streamId/:courseId/:specializationId" element={<TopCollegesPage />} />
            <Route path="top-colleges/:streamId/:courseId" element={<TopCollegesPage />} />
            <Route path="ai-chat" element={<AIChatPage />} />
            <Route path="suggestion-box" element={<div className="p-8 text-center">Suggestion Box - Coming Soon!</div>} />
            <Route path="colleges" element={<div className="p-8 text-center">Colleges - Coming Soon!</div>} />
            <Route path="ai-suggestions" element={<div className="p-8 text-center">AI Suggestions - Coming Soon!</div>} />
            <Route path="ask-question" element={<div className="p-8 text-center">Ask Question - Coming Soon!</div>} />
            <Route path="top-careers" element={<div className="p-8 text-center">Top Careers - Coming Soon!</div>} />
            <Route path="nearby-colleges" element={<div className="p-8 text-center">Nearby Colleges - Coming Soon!</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
