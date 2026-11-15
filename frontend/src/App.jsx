import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AssistantFloatingButton from "./components/AssistantFloatingButton";
import { AssistantProvider } from "./context/AssistantProvider";

import Dashboard from "./pages/Dashboard";
import AiAssistant from "./pages/AiAssistant";
import AnatomyExplorer from "./pages/AnatomyExplorer";
import CrewOverview from "./components/CrewOverview";
import HealthMonitoring from "./pages/HealthMonitoring";
import RiskAlerts from "./pages/RiskAlerts";
import HealthHistory from "./pages/HealthHistory";
import Setting from "./pages/Setting";
import CognitiveReactionTest from "./pages/CognitiveReactionTest";

import "./App.css";
import "./theme.css";

function AppLayout() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 1023px)").matches);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (pathname === "/" && hash === "#body-explorer") {
      navigate("/anatomy", { replace: true });
    }
  }, [hash, navigate, pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateViewport = (event) => {
      setIsMobile(event.matches);
      setIsDrawerOpen(false);
    };
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const menuButton = menuButtonRef.current;
    const closeButton = drawer?.querySelector(".app-sidebar-close");
    closeButton?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
        return;
      }

      if (event.key === "Tab" && drawer) {
        const focusableElements = drawer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          event.preventDefault();
        } else if (
          event.shiftKey &&
          (document.activeElement === firstElement || !drawer.contains(document.activeElement))
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === lastElement || !drawer.contains(document.activeElement))
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      menuButton?.focus();
    };
  }, [isDrawerOpen]);

  return (
    <div className={`app-layout${isSidebarCollapsed ? " app-layout-sidebar-collapsed" : ""}`}>
      <Sidebar
        drawerRef={drawerRef}
        isOpen={isDrawerOpen}
        isMobile={isMobile}
        onNavigate={() => setIsDrawerOpen(false)}
        onClose={() => setIsDrawerOpen(false)}
      />
      {isMobile && isDrawerOpen && (
        <button
          type="button"
          className="app-sidebar-backdrop"
          aria-label="Close navigation drawer"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <main className="app-main-content">
        <Header
          menuButtonRef={menuButtonRef}
          isOpen={isMobile && isDrawerOpen}
          isCollapsed={isSidebarCollapsed}
          isMobile={isMobile}
          onToggle={() => {
            if (isMobile) setIsDrawerOpen((isOpen) => !isOpen);
            else setIsSidebarCollapsed((collapsed) => !collapsed);
          }}
        />
        <div className="app-route-transition" key={pathname}>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/crew-overview"
              element={<CrewOverview />}
            />

            <Route
              path="/anatomy"
              element={<AnatomyExplorer />}
            />

            <Route
              path="/health-monitoring"
              element={<HealthMonitoring />}
            />

            <Route
              path="/ai-assistant"
              element={<AiAssistant />}
            />

            <Route
              path="/risk-alerts"
              element={<RiskAlerts />}
            />

            <Route
              path="/health-history"
              element={<HealthHistory />}
            />

            <Route
              path="/cognitive-test"
              element={<CognitiveReactionTest />}
            />

            <Route
              path="/settings"
              element={<Setting />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/cognitive-test"
              element={<CognitiveReactionTest />}
            />
          </Routes>
        </div>
      </main>
      {pathname !== "/ai-assistant" && !isDrawerOpen && <AssistantFloatingButton />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AssistantProvider>
        <AppLayout />
      </AssistantProvider>
    </BrowserRouter>
  );
}
