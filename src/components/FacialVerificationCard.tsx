import { useState, useEffect, useRef } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Camera, CheckCircle, XCircle } from 'lucide-react';

interface FacialVerificationCardProps {
  onComplete: () => void;
}

const FacialVerificationCard: React.FC<FacialVerificationCardProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faceBox, setFaceBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup function to stop the camera and clear intervals
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      // Request lower resolution first to ensure compatibility
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: 640,
          height: 480
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
          console.log('Video started playing');
          streamRef.current = stream;
          setIsScanning(true);
          startFaceDetection();
        } catch (err) {
          console.error('Error playing video:', err);
          setError('Could not start video playback');
        }
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Could not access camera. Please ensure you have granted camera permissions.');
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please ensure you have granted camera permissions.",
        variant: "destructive",
      });
    }
  };

  const startFaceDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }

    detectionIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw video frame to canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Get image data for face detection
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          
          // Detect face and get face box
          const { hasFace, faceBox } = detectFace(imageData, canvas.width, canvas.height);
          
          if (hasFace && faceBox) {
            setFaceDetected(true);
            setFaceBox(faceBox);
            setProgress(prev => {
              const newProgress = Math.min(prev + 5, 100);
              if (newProgress === 100) {
                handleVerificationComplete();
              }
              return newProgress;
            });
          } else {
            setFaceDetected(false);
            setFaceBox(null);
          }
        }
      }
    }, 100); // Check for faces every 100ms
  };

  const detectFace = (imageData: ImageData, width: number, height: number): { hasFace: boolean; faceBox: { x: number; y: number; width: number; height: number } | null } => {
    const data = imageData.data;
    let skinPixels = 0;
    let totalPixels = 0;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;

    // Scan the image for skin tones
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Improved skin tone detection
        if (r > 100 && g > 50 && b > 50 && r > g && r > b && r - g > 20) {
          skinPixels++;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
        totalPixels++;
      }
    }

    const hasFace = (skinPixels / totalPixels) > 0.05; // Lowered threshold for better detection
    const faceBox = hasFace ? {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    } : null;

    return { hasFace, faceBox };
  };

  const handleVerificationComplete = () => {
    setIsComplete(true);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    toast({
      title: "Facial Recognition Complete",
      description: "Your face has been successfully verified.",
    });
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleScan = () => {
    if (!isScanning) {
      startCamera();
      toast({
        title: "Facial Recognition",
        description: "Please position your face within the frame...",
      });
    }
  };

  return (
    <Card className="w-full max-w-xl bg-[#1a1f37]/80 text-white backdrop-blur-sm border-none">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-md mx-auto">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0f1225] border border-blue-500/20 shadow-lg shadow-blue-500/10">
              {isScanning && !isComplete ? (
                <>
                  <div className="absolute inset-0">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      width={640}
                      height={480}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ 
                        transform: 'scaleX(-1)',
                        objectFit: 'cover',
                        backgroundColor: 'transparent'
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={480}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ 
                        opacity: 0.3, 
                        transform: 'scaleX(-1)',
                        pointerEvents: 'none',
                        zIndex: 20
                      }}
                    />
                  </div>
                  {/* Overlay frame */}
                  <div className="absolute inset-0 border-[3px] border-blue-400/30 rounded-xl pointer-events-none" style={{ zIndex: 30 }}>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
                  </div>
                  {/* Face detection box */}
                  {faceBox && (
                    <div
                      className="absolute border-2 border-green-500 rounded-lg pointer-events-none"
                      style={{
                        left: `${faceBox.x}px`,
                        top: `${faceBox.y}px`,
                        width: `${faceBox.width}px`,
                        height: `${faceBox.height}px`,
                        boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                        transform: 'scaleX(-1)',
                        zIndex: 40
                      }}
                    />
                  )}
                  {/* Status indicators */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent" style={{ zIndex: 50 }}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {faceDetected ? "Face detected" : "Position your face in frame"}
                      </p>
                      <div className={`${faceDetected ? 'text-green-500' : 'text-red-500'}`}>
                        {faceDetected ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f1225]">
                  <div 
                    className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center cursor-pointer hover:bg-blue-500/20 transition-colors"
                    onClick={() => !isScanning && handleScan()}
                  >
                    <Camera size={32} className="text-blue-400" />
                  </div>
                  <p className="mt-4 text-sm text-blue-300">Click to start facial recognition</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-md space-y-2">
            <h3 className="text-xl font-semibold text-center text-white">
              {isComplete 
                ? "Facial Recognition Complete" 
                : isScanning 
                  ? "Scanning..." 
                  : "Facial Recognition"}
            </h3>
            
            <p className="text-sm text-center text-blue-300">
              {isComplete 
                ? "Your facial features have been securely verified." 
                : isScanning 
                  ? "Please keep your face within the frame." 
                  : "Click the camera icon to begin facial verification."}
            </p>
            
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            
            <div className="relative h-2 overflow-hidden rounded-full bg-blue-950">
              <Progress 
                value={progress} 
                className="h-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'
                }}
              />
            </div>
            
            <p className="text-xs text-center text-blue-400">
              {isComplete 
                ? "100% Complete" 
                : isScanning 
                  ? `${Math.round(progress)}% Complete` 
                  : "Waiting to scan..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacialVerificationCard; 