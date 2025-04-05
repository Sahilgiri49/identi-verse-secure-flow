import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

interface PasswordVerificationCardProps {
  onComplete: () => void;
}

const PasswordVerificationCard: React.FC<PasswordVerificationCardProps> = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsComplete(true);
    toast({
      title: "Password Verified",
      description: "Your password has been securely verified.",
    });
    
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <Card className={`w-full max-w-sm glass-card overflow-hidden transition-all duration-500 ${isComplete ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-border'}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`w-24 h-24 rounded-full bg-muted flex items-center justify-center transition-all duration-300 ${isComplete ? 'bg-green-500/20' : 'bg-muted'}`}
          >
            <Lock 
              size={40} 
              className={`transition-all duration-300 ${isComplete ? 'text-green-500' : 'text-foreground/70'}`}
            />
          </div>
          
          <h3 className="text-xl font-semibold mt-2 text-foreground">
            {isComplete ? "Password Verified" : "Password Verification"}
          </h3>
          
          <p className="text-sm text-foreground/70 text-center">
            {isComplete 
              ? "Your password has been securely verified." 
              : "Enter your secure password to continue."}
          </p>
          
          {!isComplete && (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-background/50 border-border/40"
                required
                minLength={8}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isComplete}
              >
                Verify Password
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordVerificationCard; 