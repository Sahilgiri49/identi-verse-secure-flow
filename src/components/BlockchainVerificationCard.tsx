
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ShieldCheck } from 'lucide-react';

interface BlockchainVerificationCardProps {
  onComplete: () => void;
  autoStart?: boolean;
}

const BlockchainVerificationCard: React.FC<BlockchainVerificationCardProps> = ({ 
  onComplete,
  autoStart = false
}) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'hashing' | 'consensus' | 'encrypting' | 'complete'>('idle');

  useEffect(() => {
    if (autoStart && stage === 'idle') {
      startVerification();
    }
  }, [autoStart]);

  useEffect(() => {
    if (stage !== 'idle' && stage !== 'complete') {
      const timer = setTimeout(() => {
        setProgress(prevProgress => {
          const newProgress = Math.min(prevProgress + (Math.random() * 10), 100);
          
          // Update stages based on progress
          if (prevProgress < 30 && newProgress >= 30) {
            setStage('consensus');
            toast({
              title: "Blockchain Verification",
              description: "Reaching consensus across distributed network...",
            });
          } else if (prevProgress < 70 && newProgress >= 70) {
            setStage('encrypting');
            toast({
              title: "Blockchain Verification",
              description: "Encrypting identity records with private keys...",
            });
          } else if (newProgress === 100) {
            setStage('complete');
            toast({
              title: "Verification Complete",
              description: "Your identity has been securely verified and stored on blockchain.",
              variant: "default",
            });
            setTimeout(() => {
              onComplete();
            }, 1000);
          }
          
          return newProgress;
        });
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [progress, stage, onComplete]);

  const startVerification = () => {
    if (stage === 'idle') {
      setStage('hashing');
      toast({
        title: "Blockchain Verification",
        description: "Creating secure cryptographic hash of your identity...",
      });
    }
  };

  const getStageText = () => {
    switch (stage) {
      case 'idle':
        return "Click to begin blockchain verification";
      case 'hashing':
        return "Creating cryptographic hash...";
      case 'consensus':
        return "Reaching network consensus...";
      case 'encrypting':
        return "Encrypting identity records...";
      case 'complete':
        return "Verification complete";
    }
  };

  return (
    <Card className={`w-full max-w-sm glass-card overflow-hidden transition-all duration-500 ${
      stage === 'complete' 
        ? 'border-green-500 shadow-lg shadow-green-500/20' 
        : stage !== 'idle' 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border'
    }`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              stage === 'complete' 
                ? 'bg-green-500/20' 
                : stage !== 'idle' 
                  ? 'bg-primary/20 animate-pulse' 
                  : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={startVerification}
          >
            <ShieldCheck 
              size={40} 
              className={`transition-all duration-300 cursor-pointer ${
                stage === 'complete' 
                  ? 'text-green-500' 
                  : stage !== 'idle' 
                    ? 'text-primary animate-pulse' 
                    : 'text-foreground/70 hover:text-primary'
              }`}
            />
          </div>
          
          <h3 className="text-xl font-semibold mt-2 text-foreground">
            {stage === 'complete' 
              ? "Blockchain Verification Complete" 
              : "Blockchain Verification"}
          </h3>
          
          <p className="text-sm text-foreground/70 text-center">
            {getStageText()}
          </p>
          
          <Progress value={progress} className="w-full h-2" />
          
          <div className="text-xs text-foreground/60 w-full text-center mt-2">
            {stage === 'idle' 
              ? "Waiting to verify..." 
              : `${Math.round(progress)}% Complete`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainVerificationCard;
