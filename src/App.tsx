import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { OnboardingOverlay } from "@/components/onboarding/OnboardingOverlay";
import MarketingLayout from "./layouts/MarketingLayout";
import AuthLayout from "./layouts/AuthLayout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import MarketplacePage from "./pages/MarketplacePage";
import AgentDetailPage from "./pages/AgentDetailPage";
import LoginPage from "./pages/LoginPage";
import ChatsPage from "./pages/ChatsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import BillingPage from "./pages/BillingPage";
import FilesPage from "./pages/FilesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ActivityPage from "./pages/ActivityPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import PitchDeckPage from "./pages/PitchDeckPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OnboardingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to integrations (onboarding overlays here) */}
            <Route path="/" element={<Navigate to="/integrations" replace />} />

            {/* Marketing routes */}
            <Route element={<MarketingLayout />}>
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/:agentId" element={<AgentDetailPage />} />
            </Route>

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Workspace routes */}
            <Route element={<WorkspaceLayout />}>
              <Route path="/chats" element={<ChatsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
            </Route>

            {/* Standalone pitch deck */}
            <Route path="/pitch-deck" element={<PitchDeckPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Onboarding overlay — renders on top of everything */}
          <OnboardingOverlay />
        </BrowserRouter>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
