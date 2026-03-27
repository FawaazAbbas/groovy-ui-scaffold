import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { OnboardingOverlay } from "@/components/onboarding/OnboardingOverlay";
import ProtectedRoute from "@/components/ProtectedRoute";
import MarketingLayout from "./layouts/MarketingLayout";
import AuthLayout from "./layouts/AuthLayout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import MarketplacePage from "./pages/MarketplacePage";
import WorkspaceMarketplacePage from "./pages/WorkspaceMarketplacePage";
import AgentDetailPage from "./pages/AgentDetailPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatsPage from "./pages/ChatsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import BillingPage from "./pages/BillingPage";
import FilesPage from "./pages/FilesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ActivityPage from "./pages/ActivityPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import PermissionsPage from "./pages/PermissionsPage";
import GuardrailsPage from "./pages/GuardrailsPage";
import PricingPage from "./pages/PricingPage";
import SettingsPage from "./pages/SettingsPage";
import WorkspaceSetupPage from "./pages/WorkspaceSetupPage";
import PitchDeckPage from "./pages/PitchDeckPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <OnboardingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to marketplace */}
            <Route path="/" element={<Navigate to="/marketplace" replace />} />

            {/* Marketing routes */}
            <Route element={<MarketingLayout />}>
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/:agentId" element={<AgentDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Route>

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>

            {/* Workspace setup (needs auth, no workspace yet) */}
            <Route element={<AuthLayout />}>
              <Route path="/workspace-setup" element={<WorkspaceSetupPage />} />
            </Route>

            {/* Workspace routes (protected) */}
            <Route element={<ProtectedRoute />}>
            <Route element={<WorkspaceLayout />}>
              {/* Locked for MVP — redirect to marketplace */}
              <Route path="/space/chats" element={<Navigate to="/space/marketplace" replace />} />
              <Route path="/space/tasks" element={<TasksPage />} />
              <Route path="/space/calendar" element={<Navigate to="/space/marketplace" replace />} />
              <Route path="/space/billing" element={<BillingPage />} />
              <Route path="/space/files" element={<FilesPage />} />
              <Route path="/space/architecture" element={<ArchitecturePage />} />
              <Route path="/space/activity" element={<ActivityPage />} />
              <Route path="/space/integrations" element={<IntegrationsPage />} />
              <Route path="/space/marketplace" element={<WorkspaceMarketplacePage />} />
              <Route path="/space/permissions" element={<PermissionsPage />} />
              <Route path="/space/guardrails" element={<GuardrailsPage />} />
              <Route path="/space/settings" element={<SettingsPage />} />
            </Route>
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
