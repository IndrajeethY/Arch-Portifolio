import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export const Window = ({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
}: WindowProps) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(() => window.innerWidth < 768);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // On mobile, maximize by default
        setIsMaximized(true);
        setPosition({ x: 0, y: 0 });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Constrain window position to viewport
  useEffect(() => {
    if (!isMobile && !isMaximized) {
      const maxX = Math.max(0, window.innerWidth - size.width);
      const maxY = Math.max(0, window.innerHeight - size.height - 48); // 48 for panel
      setPosition((prev) => ({
        x: Math.min(Math.max(0, prev.x), maxX),
        y: Math.min(Math.max(0, prev.y), maxY),
      }));
    }
  }, [size, isMobile, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    setIsDragging(true);
    onFocus();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + deltaX,
        y: Math.max(0, dragRef.current.startPosY + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition(defaultPosition);
    }
  };

  // Compute responsive size
  const responsiveSize = isMobile
    ? { width: "100%", height: "calc(100% - 48px)" }
    : isMaximized
      ? { width: "100%", height: "calc(100% - 48px)" }
      : {
          width: Math.min(size.width, window.innerWidth - 16),
          height: Math.min(size.height, window.innerHeight - 64),
        };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed window-open"
      style={{
        left: isMobile || isMaximized ? 0 : position.x,
        top: isMobile || isMaximized ? 0 : position.y,
        width: responsiveSize.width,
        height: responsiveSize.height,
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 48px)",
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div className="h-full flex flex-col bg-card border border-window-border rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-3 py-2 bg-window-header cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-3 h-3 rounded-full bg-destructive hover:brightness-110 transition-all flex items-center justify-center group"
              >
                <X className="w-2 h-2 text-destructive-foreground opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="w-3 h-3 rounded-full bg-terminal-yellow hover:brightness-110 transition-all flex items-center justify-center group"
              >
                <Minus className="w-2 h-2 text-background opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximize();
                }}
                className="w-3 h-3 rounded-full bg-terminal-green hover:brightness-110 transition-all flex items-center justify-center group"
              >
                <Square className="w-1.5 h-1.5 text-background opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          </div>
          <span className="text-xs text-primary-foreground font-medium">
            {title}
          </span>
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-background p-4">{children}</div>
      </div>
    </motion.div>
  );
};
