import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Music,
  Info,
  Power,
  X,
  Camera,
} from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";

interface ActivitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onVolumeChange?: (volume: number) => void;
  onOpenWindow?: (windowType: string) => void;
  onPowerOff?: () => void;
}

interface SocialLink {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  color: string;
}

interface AppItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  opensWindow?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    id: "source",
    label: "Source Code",
    icon: Github,
    url: "https://github.com/IndrajeethY/Arch-Portifolio",
    color: "hover:text-primary",
  },
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    url: "https://github.com/Indrajeethy",
    color: "hover:text-white",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/indrajeethy",
    color: "hover:text-blue-400",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/tamilvip07",
    color: "hover:text-pink-400",
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/tamilvip007",
    color: "hover:text-sky-400",
  },
];

const MinecraftIcon3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeLinecap="square"
    {...props}
  >
    {/* Top Grass */}
    <polygon
      points="32 6, 56 18, 32 30, 8 18"
      fill="#4CAF50"
    />
    <polygon
      points="32 6, 56 18, 32 30, 8 18"
      fill="#3DAE48"
      opacity="0.4"
    />

    {/* Right Dirt Face */}
    <polygon
      points="56 18, 56 42, 32 54, 32 30"
      fill="#7A4F2A"
    />
    <polygon
      points="56 18, 56 42, 32 54, 32 30"
      fill="#5C3A1E"
      opacity="0.35"
    />

    {/* Left Dirt Face */}
    <polygon
      points="8 18, 8 42, 32 54, 32 30"
      fill="#7A4F2A"
    />
    <polygon
      points="8 18, 8 42, 32 54, 32 30"
      fill="#5C3A1E"
      opacity="0.35"
    />

    {/* Grass Highlights */}
    <rect x="24" y="12" width="8" height="4" fill="#6DEB72" opacity="0.9" />
    <rect x="38" y="18" width="6" height="4" fill="#6DEB72" opacity="0.7" />

    {/* Dirt Pixel Noise */}
    <rect x="40" y="34" width="6" height="6" fill="#5A3A20" opacity="0.55" />
    <rect x="20" y="38" width="6" height="6" fill="#5A3A20" opacity="0.5" />
  </svg>
);


const apps: AppItem[] = [
  { id: "music", label: "Music Player", icon: Music, color: "text-green-400" },
  { id: "firefox", label: "Firefox", iconImage: "/icons/firefox.svg", color: "text-orange-500", opensWindow: true },
  { id: "camera", label: "Camera", icon: Camera, color: "text-terminal-cyan", opensWindow: true },
  { id: "minecraft", label: "Minecraft", icon: MinecraftIcon3D, color: "text-terminal-green", opensWindow: true },
  { id: "about", label: "About System", icon: Info, color: "text-primary" },
];

export const ActivitiesMenu = ({
  isOpen,
  onClose,
  onVolumeChange,
  onOpenWindow,
  onPowerOff,
}: ActivitiesMenuProps) => {
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAppClick = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (app?.opensWindow && onOpenWindow) {
      onOpenWindow(appId);
      onClose();
    } else {
      setActiveApp(activeApp === appId ? null : appId);
    }
  };

  const renderAppContent = () => {
    switch (activeApp) {
      case "music":
        return <MusicPlayer onVolumeChange={onVolumeChange} />;
      case "about":
        return (
          <div className="text-left text-sm">
            <div className="flex items-center gap-3 mb-4">
              <svg
                viewBox="0 0 256 256"
                className="w-10 h-10 text-primary"
                fill="currentColor"
              >
                <path d="M128 0C113.7 33.2 105.3 54.3 89.7 87.7c9.7 10.2 21.6 22.3 40.8 35.8-20.7-8.5-34.8-16.8-46.7-25.3C63.3 147.8 32 202.5 0 256c33.8-19.5 60.3-34.2 86.2-43.5 7.8 5.2 26.2 14 41.8 14.5-22.4-12.1-30.2-23.8-33.5-31.8 11.2-3.2 22.8-4.8 33.5-4.8 10.6 0 22.4 1.6 33.5 4.8-3.3 8-11.1 19.7-33.5 31.8 15.6-.5 34-9.3 41.8-14.5 25.9 9.3 52.4 24 86.2 43.5-32-53.5-63.3-108.2-83.8-157.8-11.9 8.5-26 16.8-46.7 25.3 19.2-13.5 31.1-25.6 40.8-35.8C150.7 54.3 142.3 33.2 128 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-foreground">
                  Indrajeeth Portfolio
                </h4>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="text-primary">OS:</span> Arch Linux x86_64
              </p>
              <p>
                <span className="text-primary">Kernel:</span> 6.6.8-arch1-1
              </p>
              <p>
                <span className="text-primary">Shell:</span> bash 5.2.21
              </p>
              <p>
                <span className="text-primary">DE:</span> Portfolio DE
              </p>
              <p>
                <span className="text-primary">User:</span> Indrajeeth
              </p>
              <p>
                <span className="text-primary">Theme:</span> Arch Dark
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-14 left-2 right-2 sm:right-auto z-50 w-auto sm:w-[400px] max-w-[calc(100vw-1rem)] bg-card border border-border rounded-lg shadow-2xl shadow-primary/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-window-header border-b border-border">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 256 256"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M128 0C113.7 33.2 105.3 54.3 89.7 87.7c9.7 10.2 21.6 22.3 40.8 35.8-20.7-8.5-34.8-16.8-46.7-25.3C63.3 147.8 32 202.5 0 256c33.8-19.5 60.3-34.2 86.2-43.5 7.8 5.2 26.2 14 41.8 14.5-22.4-12.1-30.2-23.8-33.5-31.8 11.2-3.2 22.8-4.8 33.5-4.8 10.6 0 22.4 1.6 33.5 4.8-3.3 8-11.1 19.7-33.5 31.8 15.6-.5 34-9.3 41.8-14.5 25.9 9.3 52.4 24 86.2 43.5-32-53.5-63.3-108.2-83.8-157.8-11.9 8.5-26 16.8-46.7 25.3 19.2-13.5 31.1-25.6 40.8-35.8C150.7 54.3 142.3 33.2 128 0z" />
                </svg>
                <span className="text-sm font-medium text-primary-foreground">
                  Activities
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[320px]">
              {/* Left Side - Apps */}
              <div className="flex-1 p-3 flex flex-col border-r border-border">
                <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3 px-2">
                  Applications
                </h3>

                {activeApp ? (
                  <div className="flex-1">
                    <button
                      onClick={() => setActiveApp(null)}
                      className="text-xs text-primary hover:underline mb-3"
                    >
                      ← Back to apps
                    </button>
                    {renderAppContent()}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {apps.map((app) => {
                      const Icon = app.icon;
                      return (
                        <button
                          key={app.id}
                          onClick={() => handleAppClick(app.id)}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors group"
                        >
                          <div
                            className={`p-3 rounded-lg bg-secondary/50 group-hover:bg-primary/20 transition-colors`}
                          >
                            {app.iconImage ? (
                              <img src={app.iconImage} alt={app.label} className="w-6 h-6" />
                            ) : Icon ? (
                              <Icon className={`w-6 h-6 ${app.color}`} />
                            ) : null}
                          </div>
                          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                            {app.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side - Social Links */}
              <div className="w-1/3 bg-background/50 p-3 relative">
                <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3 px-2">
                  Connect
                </h3>
                <div className="space-y-1">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleSocialClick(link.url)}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground ${link.color}`}
                      >
                        {link.iconImage ? (
                          <img src={link.iconImage} alt={link.label} className="w-6 h-6" />
                        ) : Icon ? (
                          <Icon className="w-5 h-5" />
                        ) : null}
                        <span className="text-sm">{link.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Power options at bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <button
                    onClick={() => {
                      onClose();
                      onPowerOff?.();
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Power className="w-5 h-5" />
                    <span className="text-sm">Power Off</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
