import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Camera } from 'lucide-react';

interface FacialVerificationCardProps {
  onComplete: () => void;
}

const FacialVerificationCard: React.FC<FacialVerificationCardProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 15;
          const newProgress = Math.min(prevProgress + increment, 100);
          
          if (newProgress === 100) {
            setIsComplete(true);
            setTimeout(() => {
              onComplete();
            }, 1000);
          }
          
          return newProgress;
        });
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isScanning, onComplete]);

  const handleScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      toast({
        title: "Facial Recognition",
        description: "Please position your face within the frame...",
      });
    }
  };

  return (
    <Card className={`w-full max-w-sm glass-card overflow-hidden transition-all duration-500 ${isComplete ? 'border-green-500 shadow-lg shadow-green-500/20' : isScanning ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`w-24 h-24 rounded-full bg-muted flex items-center justify-center transition-all duration-300 ${isComplete ? 'bg-green-500/20' : isScanning ? 'bg-primary/20 animate-pulse' : 'bg-muted'}`}
            onClick={handleScan}
          >
            <Camera 
              size={40} 
              className={`transition-all duration-300 cursor-pointer ${isComplete ? 'text-green-500' : isScanning ? 'text-primary animate-pulse' : 'text-foreground/70 hover:text-primary'}`}
            />
          </div>
          
          <h3 className="text-xl font-semibold mt-2 text-foreground">
            {isComplete 
              ? "Facial Recognition Complete" 
              : isScanning 
                ? "Scanning..." 
                : "Facial Recognition"}
          </h3>
          
          <p className="text-sm text-foreground/70 text-center">
            {isComplete 
              ? "Your facial features have been securely verified." 
              : isScanning 
                ? "Please keep your face within the frame." 
                : "Click to start facial recognition."}
          </p>
          
          <Progress value={progress} className="w-full h-2" />
          
          <div className="text-xs text-foreground/60 w-full text-center mt-2">
            {isComplete 
              ? "100% Complete" 
              : isScanning 
                ? `${Math.round(progress)}% Complete` 
                : "Waiting to scan..."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacialVerificationCard; 