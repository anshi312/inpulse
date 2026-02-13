import { NavLink } from "react-router-dom";
import { LayoutGrid, QrCode, Trophy } from "lucide-react";

const tabs = [
  { to: "/dashboard", icon: LayoutGrid, label: "Quests" },
  { to: "/qr", icon: QrCode, label: "QR" },
  { to: "/leaderboard", icon: Trophy, label: "Board" },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-md items-center justify-around py-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <tab.icon className={`h-5 w-5 ${isActive ? "neon-text" : ""}`} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;
