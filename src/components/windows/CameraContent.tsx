import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Download, RefreshCw, X, Aperture } from "lucide-react";

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: Date;
}

const formatTimestampForFilename = (date: Date): string => {
  return date.toISOString().slice(0, 19).replace(/[:-]/g, "");
};

export const CameraContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [showFlash, setShowFlash] = useState(false);

  const startCamera = async (mode: "user" | "environment" = facingMode) => {
    setIsLoading(true);
    setError(null);

    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError("Camera access denied. Please allow camera permissions in your browser.");
        } else if (err.name === "NotFoundError") {
          setError("No camera found. Please connect a camera and try again.");
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError("Failed to access camera. Please check your permissions.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Failed to switch camera:", err);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data URL
    const dataUrl = canvas.toDataURL("image/png");

    // Show flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);

    // Add to captured photos
    const newPhoto: CapturedPhoto = {
      id: Date.now().toString(),
      dataUrl,
      timestamp: new Date()
    };

    setCapturedPhotos(prev => [newPhoto, ...prev]);
  };

  const downloadPhoto = (photo: CapturedPhoto) => {
    const link = document.createElement("a");
    link.href = photo.dataUrl;
    link.download = `arch-camera-${formatTimestampForFilename(photo.timestamp)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deletePhoto = (photoId: string) => {
    setCapturedPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {/* Camera View */}
      <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Aperture className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="text-sm text-muted-foreground">Starting camera...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 p-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <Camera className="w-12 h-12 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
              <button
                onClick={startCamera}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Flash effect */}
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-10"
          />
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
        />

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Camera controls overlay */}
        {!isLoading && !error && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
            <button
              onClick={switchCamera}
              className="p-3 bg-secondary/80 hover:bg-secondary rounded-full transition-colors"
              title="Switch Camera"
            >
              <RefreshCw className="w-5 h-5 text-foreground" />
            </button>
            
            <button
              onClick={capturePhoto}
              className="p-4 bg-primary hover:bg-primary/90 rounded-full transition-colors shadow-lg shadow-primary/30"
              title="Take Photo"
            >
              <Camera className="w-6 h-6 text-primary-foreground" />
            </button>
            
            <div className="w-11" /> {/* Spacer for balance */}
          </div>
        )}
      </div>

      {/* Captured Photos Gallery */}
      {capturedPhotos.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase">
              Captured Photos ({capturedPhotos.length})
            </h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {capturedPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex-shrink-0 group"
              >
                <img
                  src={photo.dataUrl}
                  alt="Captured"
                  className="w-20 h-20 object-cover rounded-md border border-border"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-1">
                  <button
                    onClick={() => downloadPhoto(photo)}
                    className="p-1.5 bg-primary rounded-full hover:bg-primary/90 transition-colors"
                    title="Download"
                  >
                    <Download className="w-3 h-3 text-primary-foreground" />
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="p-1.5 bg-destructive rounded-full hover:bg-destructive/90 transition-colors"
                    title="Delete"
                  >
                    <X className="w-3 h-3 text-destructive-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Info text */}
      <div className="mt-2 text-xs text-muted-foreground text-center">
        <span className="text-terminal-green">$</span> Photos are stored locally and never uploaded to any server
      </div>
    </div>
  );
};
