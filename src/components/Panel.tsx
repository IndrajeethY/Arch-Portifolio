import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  FolderGit2,
  FileText,
  Mail,
  Terminal,
  Wifi,
  Battery,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Volume2,
  Volume1,
  VolumeX,
  Camera,
  Gamepad2,
} from "lucide-react";
import { ActivitiesMenu } from "./ActivitiesMenu";

interface PanelProps {
  openWindows: string[];
  onWindowClick: (type: string) => void;
  activeWindow: string | null;
  onOpenWindow?: (windowType: string) => void;
  onPowerOff?: () => void;
}

const iconMap: Record<string, typeof User> = {
  about: User,
  projects: FolderGit2,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
  camera: Camera,
  minecraft: Gamepad2,
  firefox: FolderGit2,
};

const labelMap: Record<string, string> = {
  about: "About",
  projects: "Projects",
  resume: "Resume",
  contact: "Contact",
  terminal: "Terminal",
  camera: "Camera",
  minecraft: "Minecraft",
  firefox: "Firefox",
};

// Battery API types
interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

export const Panel = ({
  openWindows,
  onWindowClick,
  activeWindow,
  onOpenWindow,
  onPowerOff,
}: PanelProps) => {
  const [time, setTime] = useState(new Date());
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [volume, setVolume] = useState(70);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Battery Status API
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const getBatteryInfo = async () => {
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();

          const updateBatteryInfo = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          };

          updateBatteryInfo();

          battery.addEventListener("levelchange", updateBatteryInfo);
          battery.addEventListener("chargingchange", updateBatteryInfo);

          cleanup = () => {
            battery.removeEventListener("levelchange", updateBatteryInfo);
            battery.removeEventListener("chargingchange", updateBatteryInfo);
          };
        }
      } catch {
        // Battery API not supported
        setBatteryLevel(null);
      }
    };

    getBatteryInfo();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const getBatteryIcon = () => {
    if (isCharging) return BatteryCharging;
    if (batteryLevel === null) return Battery;
    if (batteryLevel <= 20) return BatteryLow;
    if (batteryLevel <= 50) return BatteryMedium;
    return BatteryFull;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const BatteryIcon = getBatteryIcon();
  const VolumeIcon = getVolumeIcon();

  return (
    <>
      <motion.div
        initial={{ y: 48 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 h-12 bg-panel-bg border-t border-border flex items-center justify-between px-2 z-50"
      >
        {/* Left - App Menu */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
              isActivitiesOpen ? "bg-primary/20" : "hover:bg-secondary"
            }`}
          >
            <svg
              viewBox="0 0 512 512"
              className="w-5 h-5 text-primary"
              fill="currentColor"
            >
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 460c-117 0-212-95-212-212S139 44 256 44s212 95 212 212-95 212-212 212zm113.9-302.7c-3.7-11.2-8.4-22.9-15.5-34.8-1.8 4.4-4.5 10.3-7.4 16.3-8.5 17.7-20.1 38.7-20.1 38.7s-11.6-21-20.1-38.7c-2.9-6-5.6-11.9-7.4-16.3-7.1 11.9-11.8 23.6-15.5 34.8-22.3 67.3-21.4 134.5-21.4 134.5h34.3s.7-44.4 14.4-93.5c2.1-7.3 4.4-14.6 7.4-21.9 2.3 5.6 4.6 11.3 7.1 17.3 9 21.8 20.6 46.1 20.6 46.1s11.6-24.3 20.6-46.1c2.5-6 4.8-11.7 7.1-17.3 3 7.3 5.3 14.6 7.4 21.9 13.7 49.1 14.4 93.5 14.4 93.5h34.3s.9-67.2-21.4-134.5z" />
            </svg>
            <span className="text-sm font-medium text-foreground">
              Activities
            </span>
          </button>
        </div>

        {/* Center - Open Windows */}
        <div className="flex items-center gap-1">
          {openWindows.map((windowType) => {
            const Icon = iconMap[windowType];
            const label = labelMap[windowType];
            return (
              <button
                key={windowType}
                onClick={() => onWindowClick(windowType)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                  activeWindow === windowType
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-xs hidden sm:inline">{label}</span>
                {activeWindow === windowType && (
                  <div className="w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right - System Tray */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <div
              className="flex items-center gap-1"
              title={`Volume: ${volume}%`}
            >
              <VolumeIcon className="w-4 h-4" />
            </div>
            <div
              className="flex items-center gap-1"
              title={
                batteryLevel !== null
                  ? `Battery: ${batteryLevel}%${isCharging ? " (Charging)" : ""}`
                  : "Battery status unavailable"
              }
            >
              <BatteryIcon
                className={`w-4 h-4 ${batteryLevel !== null && batteryLevel <= 20 && !isCharging ? "text-destructive" : ""}`}
              />
              {batteryLevel !== null && (
                <span className="text-xs">{batteryLevel}%</span>
              )}
            </div>
          </div>
          <div className="text-xs">
            <span>
              {time.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="mx-2">|</span>
            <span>
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Activities Menu */}
      <ActivitiesMenu
        isOpen={isActivitiesOpen}
        onClose={() => setIsActivitiesOpen(false)}
        onVolumeChange={handleVolumeChange}
        onOpenWindow={onOpenWindow}
        onPowerOff={onPowerOff}
      />
    </>
  );
};
