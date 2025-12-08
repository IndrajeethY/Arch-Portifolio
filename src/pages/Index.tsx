import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BootScreen } from "@/components/BootScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { Desktop } from "@/components/Desktop";

type Stage = "boot" | "login" | "desktop" | "shutdown";

const shutdownMessages = [
  "Stopping user sessions...",
  "Unmounting filesystems...",
  "Stopping system services...",
  "Saving system state...",
  "Powering off...",
];

const Index = () => {
  const [stage, setStage] = useState<Stage>("boot");
  const [currentMessage, setCurrentMessage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup intervals and timeouts on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePowerOff = () => {
    // Clear any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStage("shutdown");
    setCurrentMessage(0);
    
    // Cycle through shutdown messages
    let messageIndex = 0;
    intervalRef.current = setInterval(() => {
      messageIndex++;
      if (messageIndex < shutdownMessages.length) {
        setCurrentMessage(messageIndex);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        // Go back to login screen after shutdown animation
        timeoutRef.current = setTimeout(() => {
          setStage("login");
          timeoutRef.current = null;
        }, 500);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "boot" && (
          <BootScreen key="boot" onBootComplete={() => setStage("login")} />
        )}
        {stage === "login" && (
          <LoginScreen key="login" onLogin={() => setStage("desktop")} />
        )}
        {stage === "desktop" && <Desktop key="desktop" onPowerOff={handlePowerOff} />}
        {stage === "shutdown" && (
          <motion.div
            key="shutdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            {/* Arch Logo */}
            <motion.svg
              viewBox="0 0 256 256"
              className="w-24 h-24 text-primary mb-8"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <path d="M128 0C113.7 33.2 105.3 54.3 89.7 87.7c9.7 10.2 21.6 22.3 40.8 35.8-20.7-8.5-34.8-16.8-46.7-25.3C63.3 147.8 32 202.5 0 256c33.8-19.5 60.3-34.2 86.2-43.5 7.8 5.2 26.2 14 41.8 14.5-22.4-12.1-30.2-23.8-33.5-31.8 11.2-3.2 22.8-4.8 33.5-4.8 10.6 0 22.4 1.6 33.5 4.8-3.3 8-11.1 19.7-33.5 31.8 15.6-.5 34-9.3 41.8-14.5 25.9 9.3 52.4 24 86.2 43.5-32-53.5-63.3-108.2-83.8-157.8-11.9 8.5-26 16.8-46.7 25.3 19.2-13.5 31.1-25.6 40.8-35.8C150.7 54.3 142.3 33.2 128 0z" />
            </motion.svg>

            {/* Terminal-style shutdown messages */}
            <div className="font-mono text-sm space-y-2 text-left w-80">
              {shutdownMessages.slice(0, currentMessage + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-terminal-green">[</span>
                  <span className="text-primary">OK</span>
                  <span className="text-terminal-green">]</span>
                  <span className="text-muted-foreground">{message}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-80 h-1 bg-secondary rounded-full overflow-hidden mt-8">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentMessage + 1) / shutdownMessages.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* System info footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 text-xs text-muted-foreground font-mono"
            >
              Arch Linux 6.6.8-arch1-1 (tty1)
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
