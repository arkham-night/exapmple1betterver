import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HeroSection from './components/HeroSection';
import PortfolioShowcase from './components/PortfolioShowcase';
import SkillVisualization from './components/SkillVisualization';
import ExperienceJourney from './components/ExperienceJourney';
import ImmersiveElements from './components/ImmersiveElements';
import Contact from './pages/Contact';
import './styles/global.css';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ImmersiveElements />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/portfolio" element={<PortfolioShowcase />} />
          <Route path="/skills" element={<SkillVisualization />} />
          <Route path="/experience" element={<ExperienceJourney />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;