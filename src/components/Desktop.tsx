import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Panel } from "./Panel";
import { AboutContent } from "./windows/AboutContent";
import { ProjectsContent } from "./windows/ProjectsContent";
import { ResumeContent } from "./windows/ResumeContent";
import { ContactContent } from "./windows/ContactContent";
import { TerminalContent } from "./windows/TerminalContent";
import { CameraContent } from "./windows/CameraContent";
import { MinecraftContent } from "./windows/MinecraftContent";
import { FirefoxContent } from "./windows/FirefoxContent";
import { User, FolderGit2, FileText, Mail, Terminal, Camera, Gamepad2 } from "lucide-react";

type WindowType =
  | "about"
  | "projects"
  | "resume"
  | "contact"
  | "terminal"
  | "camera"
  | "minecraft"
  | "firefox"
  | null;

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface DesktopProps {
  onPowerOff?: () => void;
}

export const Desktop = ({ onPowerOff }: DesktopProps) => {
  const [activeWindow, setActiveWindow] = useState<WindowType>(null);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: { isOpen: false, isMinimized: false, zIndex: 0 },
    projects: { isOpen: false, isMinimized: false, zIndex: 0 },
    resume: { isOpen: false, isMinimized: false, zIndex: 0 },
    contact: { isOpen: false, isMinimized: false, zIndex: 0 },
    terminal: { isOpen: false, isMinimized: false, zIndex: 0 },
    camera: { isOpen: false, isMinimized: false, zIndex: 0 },
    minecraft: { isOpen: false, isMinimized: false, zIndex: 0 },
    firefox: { isOpen: false, isMinimized: false, zIndex: 0 },
  });
  const [maxZIndex, setMaxZIndex] = useState(20);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Play Linux startup sound when desktop loads
  useEffect(() => {
    const playStartupSound = async () => {
      try {
        // Try to play the startup sound
        const audio = new Audio('/startup-sound.mp3');
        audio.volume = 0.3; // Set to 30% volume to not be too loud
        
        // Handle autoplay restrictions - user interaction may be required
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Autoplay was prevented, this is expected in many browsers
            console.log('Startup sound autoplay prevented:', error);
          });
        }
      } catch (error) {
        // Sound file may not exist, silently fail
        console.log('Startup sound not available');
      }
    };

    playStartupSound();
  }, []);

  const openWindow = (type: WindowType) => {
    if (!type) return;
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [type]: { isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 },
    }));
    setActiveWindow(type);
  };

  const closeWindow = (type: WindowType) => {
    if (!type) return;
    setWindows((prev) => ({
      ...prev,
      [type]: { ...prev[type], isOpen: false },
    }));
    if (activeWindow === type) setActiveWindow(null);
  };

  const minimizeWindow = (type: WindowType) => {
    if (!type) return;
    setWindows((prev) => ({
      ...prev,
      [type]: { ...prev[type], isMinimized: true },
    }));
  };

  const focusWindow = (type: WindowType) => {
    if (!type) return;
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [type]: { ...prev[type], isMinimized: false, zIndex: maxZIndex + 1 },
    }));
    setActiveWindow(type);
  };

  const desktopIcons = [
    { id: "about", label: "About Me", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "terminal", label: "Terminal", icon: Terminal },
  ];

  const getOpenWindows = () => {
    return Object.entries(windows)
      .filter(([, state]) => state.isOpen)
      .map(([type]) => type as WindowType);
  };

  // Check if any window is open (not minimized) - used for mobile to hide desktop icons
  const hasVisibleWindow = Object.values(windows).some(
    (w) => w.isOpen && !w.isMinimized,
  );

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Animated Gradient Background - Solo Leveling Theme */}
      <div className="absolute inset-0 z-0 animated-gradient-bg solo-leveling-glow" />

      {/* Video Wallpaper - Sung Jinwoo Solo Leveling (loads if video file exists) */}
      <div className="absolute inset-0 z-[1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-wallpaper"
          poster="/wallpaper-poster.jpg"
        ></video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Modern geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.05] z-[2] pointer-events-none overflow-hidden">
        {/* Large centered Arch logo */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-primary opacity-20"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 460c-117 0-212-95-212-212S139 44 256 44s212 95 212 212-95 212-212 212zm113.9-302.7c-3.7-11.2-8.4-22.9-15.5-34.8-1.8 4.4-4.5 10.3-7.4 16.3-8.5 17.7-20.1 38.7-20.1 38.7s-11.6-21-20.1-38.7c-2.9-6-5.6-11.9-7.4-16.3-7.1 11.9-11.8 23.6-15.5 34.8-22.3 67.3-21.4 134.5-21.4 134.5h34.3s.7-44.4 14.4-93.5c2.1-7.3 4.4-14.6 7.4-21.9 2.3 5.6 4.6 11.3 7.1 17.3 9 21.8 20.6 46.1 20.6 46.1s11.6-24.3 20.6-46.1c2.5-6 4.8-11.7 7.1-17.3 3 7.3 5.3 14.6 7.4 21.9 13.7 49.1 14.4 93.5 14.4 93.5h34.3s.9-67.2-21.4-134.5z" />
        </svg>
        {/* Decorative geometric lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
          <div className="absolute bottom-16 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
          <div className="absolute bottom-16 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
        </div>
        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-primary/30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Desktop Icons - Hidden on mobile when a window is open */}
      {(!isMobile || !hasVisibleWindow) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4 flex flex-col gap-2 z-10"
        >
          {desktopIcons.map((icon, idx) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <DesktopIcon
                icon={icon.icon}
                label={icon.label}
                onClick={() => openWindow(icon.id as WindowType)}
                isActive={windows[icon.id]?.isOpen}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Windows */}
      {windows.about.isOpen && !windows.about.isMinimized && (
        <Window
          title="neofetch - About Me"
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
          onFocus={() => focusWindow("about")}
          zIndex={windows.about.zIndex}
          defaultPosition={{ x: 100, y: 50 }}
          defaultSize={{ width: 700, height: 500 }}
        >
          <AboutContent />
        </Window>
      )}

      {windows.projects.isOpen && !windows.projects.isMinimized && (
        <Window
          title="~/projects"
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          onFocus={() => focusWindow("projects")}
          zIndex={windows.projects.zIndex}
          defaultPosition={{ x: 150, y: 80 }}
          defaultSize={{ width: 800, height: 550 }}
        >
          <ProjectsContent />
        </Window>
      )}

      {windows.resume.isOpen && !windows.resume.isMinimized && (
        <Window
          title="cat resume.md"
          onClose={() => closeWindow("resume")}
          onMinimize={() => minimizeWindow("resume")}
          onFocus={() => focusWindow("resume")}
          zIndex={windows.resume.zIndex}
          defaultPosition={{ x: 200, y: 100 }}
          defaultSize={{ width: 650, height: 500 }}
        >
          <ResumeContent />
        </Window>
      )}

      {windows.contact.isOpen && !windows.contact.isMinimized && (
        <Window
          title="mail -s 'Hello'"
          onClose={() => closeWindow("contact")}
          onMinimize={() => minimizeWindow("contact")}
          onFocus={() => focusWindow("contact")}
          zIndex={windows.contact.zIndex}
          defaultPosition={{ x: 250, y: 120 }}
          defaultSize={{ width: 500, height: 400 }}
        >
          <ContactContent />
        </Window>
      )}

      {windows.terminal.isOpen && !windows.terminal.isMinimized && (
        <Window
          title="bash"
          onClose={() => closeWindow("terminal")}
          onMinimize={() => minimizeWindow("terminal")}
          onFocus={() => focusWindow("terminal")}
          zIndex={windows.terminal.zIndex}
          defaultPosition={{ x: 300, y: 140 }}
          defaultSize={{ width: 600, height: 400 }}
        >
          <TerminalContent />
        </Window>
      )}

      {windows.camera.isOpen && !windows.camera.isMinimized && (
        <Window
          title="camera - Arch Camera"
          onClose={() => closeWindow("camera")}
          onMinimize={() => minimizeWindow("camera")}
          onFocus={() => focusWindow("camera")}
          zIndex={windows.camera.zIndex}
          defaultPosition={{ x: 150, y: 60 }}
          defaultSize={{ width: 640, height: 520 }}
        >
          <CameraContent />
        </Window>
      )}

      {windows.minecraft.isOpen && !windows.minecraft.isMinimized && (
        <Window
          title="minecraft - Eaglercraft"
          onClose={() => closeWindow("minecraft")}
          onMinimize={() => minimizeWindow("minecraft")}
          onFocus={() => focusWindow("minecraft")}
          zIndex={windows.minecraft.zIndex}
          defaultPosition={{ x: 100, y: 40 }}
          defaultSize={{ width: 900, height: 650 }}
        >
          <MinecraftContent />
        </Window>
      )}

      {windows.firefox.isOpen && !windows.firefox.isMinimized && (
        <Window
          title="firefox - Web Browser"
          onClose={() => closeWindow("firefox")}
          onMinimize={() => minimizeWindow("firefox")}
          onFocus={() => focusWindow("firefox")}
          zIndex={windows.firefox.zIndex}
          defaultPosition={{ x: 120, y: 50 }}
          defaultSize={{ width: 900, height: 650 }}
        >
          <FirefoxContent />
        </Window>
      )}

      {/* Panel */}
      <Panel
        openWindows={getOpenWindows().filter(Boolean) as string[]}
        onWindowClick={(type) => focusWindow(type as WindowType)}
        activeWindow={activeWindow}
        onOpenWindow={(type) => openWindow(type as WindowType)}
        onPowerOff={onPowerOff}
      />

      <div className="scanline" />
    </div>
  );
};
