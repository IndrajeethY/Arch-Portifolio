import { useState, useRef } from "react";
import { ExternalLink, Maximize2, Minimize2, ArrowLeft, ArrowRight, RotateCcw, Home } from "lucide-react";

// Firefox logo as SVG component matching the theme
const FirefoxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="M503.52,241.48c-.12-1.56-.24-3.12-.24-4.68v-.12l-.36-4.68v-.12a245.86,245.86,0,0,0-7.32-41.15c0-.12,0-.12-.12-.24l-1.08-4c-.12-.24-.12-.48-.24-.6-.36-1.2-.72-2.52-1.08-3.72-.12-.24-.12-.6-.24-.84-.36-1.2-.72-2.4-1.2-3.6a.678.678,0,0,0-.12-.36c-.36-1.2-.72-2.28-1.2-3.48l-.36-.84c-.36-1.08-.84-2.28-1.2-3.36a8.27,8.27,0,0,0-.36-1c-.48-1.08-.84-2.28-1.32-3.36-.12-.24-.24-.6-.36-.84-.48-1.2-1-2.28-1.44-3.48,0-.12-.12-.24-.12-.36-1.56-3.48-3.24-6.96-5-10.44-1.32-2.64-2.76-5.28-4.2-7.8-.36-.72-.84-1.32-1.2-2C464.64,115.68,442.2,92.16,415.8,75.36c-2.4-1.56-4.92-3-7.32-4.44-1.32-.72-2.64-1.56-3.84-2.28l-1-.6c-1.44-.84-2.88-1.56-4.32-2.28a9.61,9.61,0,0,1-1.44-.72c-1.32-.6-2.64-1.32-3.96-1.92-.24-.12-.6-.24-.84-.36-1.32-.6-2.76-1.2-4.08-1.8-.36-.12-.6-.24-.96-.36-1.44-.6-2.88-1.08-4.32-1.68-.24-.12-.6-.12-.84-.24-1.44-.48-2.88-1.08-4.44-1.44-.12,0-.24-.12-.36-.12-1.56-.48-3-1-4.56-1.44l-1.44-.36c-1.44-.36-2.88-.84-4.44-1.2l-1.44-.36c-1.56-.36-3-.72-4.56-1.08l-.96-.24c-1.68-.36-3.36-.72-5-1a6.47,6.47,0,0,1-1.08-.24c-1.56-.24-3.12-.6-4.68-.84l-1.32-.24c-1.8-.24-3.48-.6-5.28-.72l-.36-.12c-1.92-.24-3.72-.48-5.64-.6l-1.08-.12c-1.8-.12-3.48-.36-5.16-.36h-.72c-1.92-.12-3.72-.24-5.64-.24h-2.88c-1.68,0-3.36.12-5,.12h-1c-1.68,0-3.24.12-4.92.24h-.84c-1.68.12-3.36.24-5,.36h-.12a246,246,0,0,0-204.24,139.2A245.88,245.88,0,0,0,8.72,241.48c0,1.56-.12,3-.24,4.56V247c0,1.68-.12,3.24-.12,4.92v1c0,1.56.12,3,.12,4.56V259c.12,1.56.12,3,.24,4.56v.24A245.86,245.86,0,0,0,16.04,304.95c0,.12,0,.12.12.24l1.08,4c.12.24.12.48.24.6.36,1.2.72,2.52,1.08,3.72.12.24.12.6.24.84.36,1.2.72,2.4,1.2,3.6a.678.678,0,0,0,.12.36c.36,1.2.72,2.28,1.2,3.48l.36.84c.36,1.08.84,2.28,1.2,3.36a8.27,8.27,0,0,0,.36,1c.48,1.08.84,2.28,1.32,3.36.12.24.24.6.36.84.48,1.2,1,2.28,1.44,3.48,0,.12.12.24.12.36,1.56,3.48,3.24,6.96,5,10.44,1.32,2.64,2.76,5.28,4.2,7.8.36.72.84,1.32,1.2,2,18.6,34.92,41.04,58.44,67.44,75.24,2.4,1.56,4.92,3,7.32,4.44,1.32.72,2.64,1.56,3.84,2.28l1,.6c1.44.84,2.88,1.56,4.32,2.28a9.61,9.61,0,0,0,1.44.72c1.32.6,2.64,1.32,3.96,1.92.24.12.6.24.84.36,1.32.6,2.76,1.2,4.08,1.8.36.12.6.24.96.36,1.44.6,2.88,1.08,4.32,1.68.24.12.6.12.84.24,1.44.48,2.88,1.08,4.44,1.44.12,0,.24.12.36.12,1.56.48,3,1,4.56,1.44l1.44.36c1.44.36,2.88.84,4.44,1.2l1.44.36c1.56.36,3,.72,4.56,1.08l.96.24c1.68.36,3.36.72,5,1a6.47,6.47,0,0,0,1.08.24c1.56.24,3.12.6,4.68.84l1.32.24c1.8.24,3.48.6,5.28.72l.36.12c1.92.24,3.72.48,5.64.6l1.08.12c1.8.12,3.48.36,5.16.36h.72c1.92.12,3.72.24,5.64.24h2.88c1.68,0,3.36-.12,5-.12h1c1.68,0,3.24-.12,4.92-.24h.84c1.68-.12,3.36-.24,5-.36h.12A246.06,246.06,0,0,0,503.52,263v-.12c.12-1.44.24-3,.24-4.44v-.12l.12-4.68v-.12c0-1.56.12-3,.12-4.56V247C504,244.48,503.64,243,503.52,241.48ZM398.04,280.92c-15.72,52.08-65.52,90.12-124.32,90.12-71.64,0-129.84-58.08-129.84-129.84,0-4.56.24-9,.72-13.44,5.04,10.68,10.92,21.12,17.64,31.08,9.12,13.44,20.04,25.92,32.52,36.84,3.24,2.88,6.6,5.64,10.08,8.28,13.08,10.08,27.6,18.48,43.2,24.84,10.92,4.44,22.44,7.8,34.32,9.84,5.28.96,10.68,1.68,16.08,2.04l1.92.12c-.24-2.16-.36-4.32-.36-6.6a67.56,67.56,0,0,1,67.44-67.44,67.08,67.08,0,0,1,30.6,7.32V280.92ZM458.16,198c-10.08-3.36-20.4-6-30.96-7.8-3.96-.72-7.92-1.32-11.88-1.8-1.56-.24-3.12-.36-4.68-.48-3.72-.36-7.44-.6-11.16-.72-.6,0-1.08-.12-1.68-.12-4.08-.12-8.16-.12-12.24,0-1.08,0-2.16.12-3.24.12-3.48.12-6.96.36-10.44.72-1.44.12-2.88.24-4.32.48-3,.36-5.88.84-8.76,1.32-1.68.24-3.36.6-5,1-2.52.48-5.04,1.08-7.56,1.68-1.8.48-3.6.96-5.4,1.44-2.28.6-4.56,1.32-6.84,2-1.8.6-3.48,1.2-5.28,1.8-2.16.72-4.32,1.56-6.36,2.4-1.68.72-3.36,1.32-5,2-2,1-4.08,1.92-6.12,2.88l-4.68,2.4c-1.92,1.08-3.84,2.16-5.76,3.24l-4.2,2.64c-1.8,1.2-3.6,2.4-5.4,3.6l-3.6,2.76c-1.8,1.32-3.48,2.76-5.16,4.2l-3,2.64c-1.8,1.56-3.48,3.12-5.16,4.8l-2.16,2.16c-1.56,1.68-3.12,3.36-4.56,5.16-.72.84-1.44,1.56-2.04,2.4-1.32,1.68-2.64,3.36-3.84,5.04-.84,1.08-1.56,2.28-2.4,3.36a113.78,113.78,0,0,0-9.24,16.08,103.24,103.24,0,0,0-3.36,7.44c-.48,1.08-.84,2.16-1.32,3.24-.36,1.08-.84,2.16-1.2,3.24-1.32,3.6-2.52,7.32-3.48,11.04-.12.48-.24.84-.36,1.32-3.48,14.16-4.08,29.04-1.44,43.8.12.6.24,1.2.36,1.8a89.58,89.58,0,0,0,5.4,18.24l.72,1.8c.6,1.32,1.08,2.52,1.68,3.84.12.24.24.48.36.72.72,1.44,1.44,2.88,2.28,4.2.48.84.96,1.68,1.44,2.52.48.72,1,1.56,1.44,2.28.6.84,1.2,1.68,1.8,2.52.36.48.72.96,1.08,1.44.84,1.08,1.68,2.16,2.52,3.12.12.12.24.36.36.48,1.08,1.2,2.16,2.4,3.24,3.48.12.12.24.24.36.36,2.52,2.52,5.16,4.92,7.92,7.08a94.62,94.62,0,0,0,11.04,8.16c1.2.72,2.4,1.44,3.6,2.16a57.42,57.42,0,0,0,5.28,2.76c.84.36,1.56.72,2.4,1.08.48.24,1,.36,1.44.6,1.32.48,2.64,1,4,1.44l.96.24c2.16.72,4.32,1.32,6.48,1.8l1.56.36a62.38,62.38,0,0,0,6.36,1.08l1.92.24c2.04.24,4.08.36,6.12.36h3.6c.96,0,1.8-.12,2.76-.12a97.36,97.36,0,0,0,16.56-2.4c1.44-.36,2.88-.72,4.32-1.08,3.48-1,6.84-2.16,10.08-3.6,40.8-17.64,61.2-66.24,45.48-108.48-1.2-3.36-2.64-6.6-4.2-9.72l-2.16-4.2a89.29,89.29,0,0,0-6.72-10.8,97.53,97.53,0,0,0-13.44-15.48c36.12-8.64,72.24-1.68,106.68,20.28C471.72,237.84,466.92,217.68,458.16,198Z" />
  </svg>
);

const DEFAULT_HOME_URL = "https://www.google.com/webhp?igu=1";

export const FirefoxContent = () => {
  const [url, setUrl] = useState(DEFAULT_HOME_URL);
  const [inputUrl, setInputUrl] = useState(DEFAULT_HOME_URL);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<string[]>([DEFAULT_HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const navigateTo = (newUrl: string, addToHistory = true) => {
    setUrl(newUrl);
    setInputUrl(newUrl);
    
    if (addToHistory) {
      // Remove any forward history and add new URL
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let newUrl = inputUrl.trim();
    
    // Add https:// if no protocol is specified
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      // Check if it looks like a URL or a search query
      if (newUrl.includes(".") && !newUrl.includes(" ")) {
        newUrl = "https://" + newUrl;
      } else {
        // Treat as Google search
        newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}&igu=1`;
      }
    }
    
    navigateTo(newUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const prevUrl = history[newIndex];
      setUrl(prevUrl);
      setInputUrl(prevUrl);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextUrl = history[newIndex];
      setUrl(nextUrl);
      setInputUrl(nextUrl);
    }
  };

  const goHome = () => {
    navigateTo(DEFAULT_HOME_URL);
  };

  const refresh = () => {
    // Force iframe refresh by changing key
    const refreshedUrl = url.replace(/[&?]_t=\d+/, '') + (url.includes("?") ? "&" : "?") + "_t=" + Date.now();
    setUrl(refreshedUrl);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-full min-h-[500px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <FirefoxLogo className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-foreground">Firefox Browser</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Maximize2 className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={openInNewTab}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={`p-2 rounded-md transition-colors ${canGoBack ? 'hover:bg-secondary cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            title={canGoBack ? "Go Back" : "No previous page"}
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={`p-2 rounded-md transition-colors ${canGoForward ? 'hover:bg-secondary cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            title={canGoForward ? "Go Forward" : "No next page"}
          >
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={refresh}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={goHome}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleNavigate} className="flex-1">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full px-3 py-1.5 bg-secondary/50 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search or enter URL..."
          />
        </form>
      </div>

      {/* Browser Container */}
      <div className="relative flex-1 bg-white rounded-lg overflow-hidden border border-border">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          style={{ minHeight: isFullscreen ? "100vh" : "400px" }}
          allow="fullscreen; autoplay; clipboard-write"
          allowFullScreen
          title="Firefox Browser"
          sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
        />
      </div>

      {/* Info text */}
      <div className="mt-2 text-xs text-muted-foreground text-center">
        <span className="text-orange-500">$</span> Firefox Browser - Type URL or search and press Enter
      </div>

      {/* Fullscreen close button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 p-2 bg-secondary/80 hover:bg-secondary rounded-md transition-colors"
          title="Exit Fullscreen"
        >
          <Minimize2 className="w-5 h-5 text-foreground" />
        </button>
      )}
    </div>
  );
};
