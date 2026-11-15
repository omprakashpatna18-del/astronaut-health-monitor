import { Link, useLocation } from "react-router-dom";

const pageTitles = [
  ["/crew-overview", "Crew Overview"],
  ["/anatomy", "Anatomy Explorer"],
  ["/health-monitoring", "Health Monitoring"],
  ["/cognitive-test", "Cognitive Reaction Test"],
  ["/ai-assistant", "ASTRA AI Assistant"],
  ["/health-history", "Health History"],
  ["/cognitive-test", "Cognitive Reaction Test"],
  ["/risk-alerts", "Risk Alerts"],
  ["/settings", "Settings"],
];

export default function Header({ menuButtonRef, isOpen, isCollapsed, isMobile, onToggle }) {
  const { pathname } = useLocation();
  const pageTitle = pathname === "/dashboard" || pathname === "/"
    ? "Mission Control"
    : pageTitles.find(([route]) => pathname.startsWith(route))?.[1] || "Mission Control";

  return (
    <header className="app-topbar">
      <button
        ref={menuButtonRef}
        type="button"
        className="app-menu-toggle"
        aria-label={isMobile
          ? isOpen ? "Close navigation drawer" : "Open navigation drawer"
          : isCollapsed ? "Expand navigation sidebar" : "Collapse navigation sidebar"}
        aria-expanded={isMobile ? isOpen : !isCollapsed}
        aria-controls="app-navigation-drawer"
        onClick={onToggle}
      >
        {isOpen || (!isMobile && isCollapsed) ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      <div className="app-topbar-context">
         
        <strong className="app-topbar-title">{pageTitle}</strong>
      </div>
      <div className="app-topbar-actions">
         
         
        <Link className="app-topbar-alerts" to="/risk-alerts" aria-label="Open risk alerts" title="Risk alerts">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />
          </svg>
        </Link>
        <span className="app-topbar-user"><b>FS</b><span><strong>Flight Surgeon</strong><small>Astronaut Health Division</small></span></span>
      </div>
    </header>
  );
}
