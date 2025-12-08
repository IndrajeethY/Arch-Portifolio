import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [typing, setTyping] = useState("");

  const handleClick = () => {
    setShowPassword(true);
    // Simulate typing password
    const password = "********";
    let i = 0;
    const interval = setInterval(() => {
      setTyping(password.slice(0, i + 1));
      i++;
      if (i >= password.length) {
        clearInterval(interval);
        setTimeout(onLogin, 500);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-background z-40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Terminal Login */}
        <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4">
          <div className="flex items-center gap-2 text-primary mb-6">
            <span className="text-terminal-green">indrajeeth-portfolio</span>
            <span className="text-foreground">login:</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={handleClick}
              className="group flex flex-col items-center gap-4 p-6 rounded-lg hover:bg-secondary/50 transition-all w-full"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  Indrajeeth
                </div>
                <div className="text-sm text-muted-foreground">Developer</div>
              </div>
            </button>
          </motion.div>

          {showPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Password:</span>
              <span className="text-foreground">{typing}</span>
              <span className="inline-block w-2 h-4 bg-foreground cursor-blink" />
            </motion.div>
          )}

          <div className="mt-8 text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <span>Click on the user to login</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          <div>Arch Linux 6.6.8-arch1-1 (tty1)</div>
        </motion.div>
      </motion.div>
      <div className="scanline" />
    </div>
  );
};
