import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Maximize2, ChevronDown, ChevronUp } from "lucide-react";

const EAGLERCRAFT_URL = "https://mc-wasm.vercel.app/";

export const MinecraftContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
    // Focus the iframe when it loads so keyboard events work
    iframeRef.current?.focus();
  };

  // Focus iframe function - to be called on click or button press
  const focusGame = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, []);

  // Prevent keyboard events from being captured by parent when iframe should have focus
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If the iframe has focus, don't prevent the event
      if (document.activeElement === iframeRef.current) {
        return;
      }
      // If clicking in the game container, focus the iframe
      focusGame();
    };

    // Focus iframe when container receives focus
    container.addEventListener('focus', focusGame, true);
    
    return () => {
      container.removeEventListener('focus', focusGame, true);
    };
  }, [focusGame]);

  // Also try to focus after loading completes
  useEffect(() => {
    if (!isLoading && iframeRef.current) {
      // Small delay to ensure iframe is ready
      const timer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Minecraft</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={focusGame}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            title="Focus Game (for keyboard controls)"
          >
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Game Container - Takes all available space */}
      <div 
        ref={containerRef}
        className="relative flex-1 min-h-0 bg-black rounded-lg overflow-hidden border border-border"
        onClick={focusGame}
        onMouseDown={focusGame}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 z-10">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Gamepad2 className="w-12 h-12 text-terminal-green" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm text-foreground mb-1">Loading Minecraft...</p>
                <p className="text-xs text-muted-foreground">This may take a moment</p>
              </div>
              <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-terminal-green"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={EAGLERCRAFT_URL}
          className="w-full h-full border-0"
          allow="fullscreen; autoplay; clipboard-write"
          allowFullScreen
          onLoad={handleIframeLoad}
          tabIndex={0}
          title="Minecraft Eaglercraft"
        />
      </div>

      {/* Controls Info - Collapsible */}
      <div className="mt-2 flex-shrink-0">
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-full flex items-center justify-between p-2 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
        >
          <span className="text-xs font-medium text-primary uppercase">Controls</span>
          {showControls ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showControls && (
          <div className="p-3 bg-secondary/30 rounded-b-lg border-t border-border/50">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div><span className="text-foreground">W A S D</span> - Move</div>
              <div><span className="text-foreground">Space</span> - Jump</div>
              <div><span className="text-foreground">Left Click</span> - Attack/Break</div>
              <div><span className="text-foreground">Right Click</span> - Place/Use</div>
              <div><span className="text-foreground">E</span> - Inventory</div>
              <div><span className="text-foreground">Esc</span> - Menu/Pause</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Click on the game area or the focus button to enable keyboard controls
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
