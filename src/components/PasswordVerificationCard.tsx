import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Lock, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import PetraWalletButton from './PetraWalletButton';

interface PasswordVerificationCardProps {
  onComplete: () => void;
}

const PasswordVerificationCard: React.FC<PasswordVerificationCardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  const { user, login } = useAuth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!user?.email) {
      setError('User email not found. Please log in again.');
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setError('Maximum attempts reached. Please try again later.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      // Verify password by attempting to login with current user's email
      await login(user.email, password);
      
      // Set complete state before showing toast
      setIsComplete(true);
      setIsVerifying(false);
      
      toast({
        title: "Password Verification Complete",
        description: "Your password has been successfully verified. Click continue to proceed.",
      });
    } catch (err) {
      setAttempts(prev => prev + 1);
      const remainingAttempts = MAX_ATTEMPTS - (attempts + 1);
      setError(
        remainingAttempts > 0
          ? `Incorrect password. ${remainingAttempts} attempts remaining.`
          : 'Maximum attempts reached. Please try again later.'
      );
      toast({
        title: "Verification Failed",
        description: "The password you entered is incorrect.",
        variant: "destructive",
      });
      setIsComplete(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && password && !isVerifying && !isComplete) {
      handleVerify();
    }
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsComplete(true);
    toast({
      title: "Wallet Connected",
      description: `Successfully connected wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleContinue = () => {
    onComplete();
    setTimeout(() => {
      navigate('/services');
    }, 500);
  };

  return (
    <Card className="w-full max-w-md bg-[#0f1225] text-white border-none shadow-xl max-h-[90vh] overflow-hidden">
      <CardContent className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-[#1a1f37]">
        <div className="flex flex-col items-center min-h-[500px]">
          {/* Header Section */}
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 sticky top-0 bg-[#0f1225] z-10">
            <Lock size={28} className="text-blue-400" />
          </div>

          {/* Main Content Section */}
          <div className="w-full flex flex-col gap-4 flex-grow">
            {/* Password Input Section - Sticky */}
            <div className="sticky top-20 z-10 bg-[#0f1225] pt-2 pb-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 bg-[#1a1f37] border-none text-white placeholder:text-gray-400 rounded-lg px-4"
                  disabled={isVerifying || isComplete}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <Button
                onClick={handleVerify}
                disabled={!password || isVerifying || isComplete || attempts >= MAX_ATTEMPTS}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium mt-4"
              >
                {isVerifying ? (
                  "Verifying..."
                ) : isComplete ? (
                  <span className="flex items-center justify-center gap-2">
                    Verified <CheckCircle size={16} />
                  </span>
                ) : (
                  "Verify Password"
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-2 my-4">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>

            {/* Wallet Section */}
            <div className="w-full">
              <PetraWalletButton 
                onConnect={handleWalletConnect}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-400 text-center mt-2">{error}</p>
            )}

            {/* Continue Button */}
            {isComplete && (
              <div className="sticky bottom-20 z-10 bg-[#0f1225] py-4">
                <Button
                  onClick={handleContinue}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  Continue to Services
                  <ArrowRight size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Footer Section - Always visible at bottom */}
          <div className="w-full space-y-2 mt-auto sticky bottom-0 bg-[#0f1225] pt-4">
            <p className="text-sm text-center text-gray-400">
              {isComplete 
                ? "Your identity has been successfully verified. Click continue to proceed." 
                : isVerifying 
                  ? "Please wait while we verify your identity." 
                  : walletAddress
                    ? `Connected to wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Enter your password or connect your Petra wallet"}
            </p>
            
            <div className="relative h-1 overflow-hidden rounded-full bg-[#1a1f37] mb-2">
              <Progress 
                value={isComplete ? 100 : isVerifying ? 60 : walletAddress ? 100 : 0} 
                className="h-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordVerificationCard; 