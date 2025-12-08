import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export const DesktopIcon = ({
  icon: Icon,
  label,
  onClick,
  isActive,
}: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className={`desktop-icon flex flex-col items-center gap-1 p-3 rounded-lg w-20 text-center focus:outline-none ${
        isActive ? "bg-primary/20" : ""
      }`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded bg-card border border-border">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-xs text-foreground truncate w-full">{label}</span>
    </button>
  );
};
