import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootMessages = [
  ":: Synchronizing package databases...",
  "[    0.000000] Linux version 6.6.8-arch1-1",
  "[    0.000001] Command line: BOOT_IMAGE=/boot/vmlinuz-linux",
  "[    0.000002] KERNEL supported cpus:",
  "[    0.000003]   Intel GenuineIntel",
  "[    0.000004]   AMD AuthenticAMD",
  "[    0.234567] ACPI: Early table checksum verification disabled",
  "[    0.345678] Initializing cgroup subsys cpuset",
  "[    0.456789] Initializing cgroup subsys cpu",
  "[    0.567890] Detected 8 CPU cores",
  "[    0.678901] Memory: 16384MB available",
  "[    0.789012] Loading initial ramdisk...",
  "[    1.234567] Starting systemd...",
  "[    1.345678] systemd[1]: Detected architecture x86-64.",
  "[    1.456789] systemd[1]: Set hostname to <arch-portfolio>.",
  "[    1.567890] systemd[1]: Starting Network Manager...",
  "[    1.678901] systemd[1]: Started Network Manager.",
  "[    2.123456] systemd[1]: Starting Display Manager...",
  "[    2.234567] systemd[1]: Started Display Manager.",
  "[  OK  ] Reached target Graphical Interface.",
];

const ArchLogo = () => (
  <svg
    viewBox="0 0 256 256"
    className="w-24 h-24 text-[#1793D1]"
    fill="currentColor"
  >
    <path d="M128 0C113.7 33.2 105.3 54.3 89.7 87.7c9.7 10.2 21.6 22.3 40.8 35.8-20.7-8.5-34.8-16.8-46.7-25.3C63.3 147.8 32 202.5 0 256c33.8-19.5 60.3-34.2 86.2-43.5 7.8 5.2 26.2 14 41.8 14.5-22.4-12.1-30.2-23.8-33.5-31.8 11.2-3.2 22.8-4.8 33.5-4.8 10.6 0 22.4 1.6 33.5 4.8-3.3 8-11.1 19.7-33.5 31.8 15.6-.5 34-9.3 41.8-14.5 25.9 9.3 52.4 24 86.2 43.5-32-53.5-63.3-108.2-83.8-157.8-11.9 8.5-26 16.8-46.7 25.3 19.2-13.5 31.1-25.6 40.8-35.8C150.7 54.3 142.3 33.2 128 0z" />
  </svg>
);

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show logo for 1.5 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 1500);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showLogo) return;

    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(interval);
          setTimeout(onBootComplete, 800);
          return prev;
        }
        return prev + 1;
      });
      setProgress((prev) => Math.min(prev + 5, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [showLogo, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <AnimatePresence mode="wait">
        {showLogo ? (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-6"
          >
            <ArchLogo />
            <div className="text-2xl font-bold text-primary crt-glow">
              Indrajeeth Portfolio
            </div>
            <div className="text-sm text-muted-foreground">
              A simple, lightweight portfolio
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col p-4 overflow-hidden"
          >
            <div className="flex-1 overflow-hidden">
              {bootMessages.slice(0, currentLine + 1).map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs md:text-sm ${
                    msg.includes("[  OK  ]")
                      ? "text-terminal-green"
                      : msg.includes("::")
                        ? "text-primary"
                        : "text-foreground/80"
                  }`}
                >
                  {msg}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-foreground cursor-blink" />
            </div>

            <div className="mt-4">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Loading... {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scanline" />
    </div>
  );
};
