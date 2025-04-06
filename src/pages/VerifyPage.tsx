import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import IdentityAnimation from '@/components/IdentityAnimation';
import BiometricCard from '@/components/BiometricCard';
import FacialVerificationCard from '@/components/FacialVerificationCard';
import PasswordVerificationCard from '@/components/PasswordVerificationCard';
import BlockchainVerificationCard from '@/components/BlockchainVerificationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, ChevronRight } from 'lucide-react';

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<'initial' | 'verification' | 'blockchain' | 'complete'>('initial');
  const [verificationType, setVerificationType] = useState<'biometric' | 'facial' | 'password'>('biometric');
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const startVerification = () => {
    setStep('verification');
    toast({
      title: "Starting Verification",
      description: "Choose your preferred verification method...",
    });
  };
  
  const handleVerificationComplete = () => {
    setVerificationComplete(true);
    setStep('blockchain');
    navigate('/services');
  };
  
  const handleBlockchainComplete = () => {
    setStep('complete');
  };
  
  const goToServices = () => {
    navigate('/services');
  };

  const renderVerificationCard = () => {
    switch (verificationType) {
      case 'biometric':
        return <BiometricCard onComplete={handleVerificationComplete} />;
      case 'facial':
        return <FacialVerificationCard onComplete={handleVerificationComplete} />;
      case 'password':
        return <PasswordVerificationCard onComplete={handleVerificationComplete} />;
    }
  };

  // If user is not logged in, don't render anything while redirecting
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[60vh] lg:h-[80vh] flex items-center justify-center">
            <div className="w-full h-full">
              <IdentityAnimation 
                isVerifying={step === 'verification' || step === 'blockchain'} 
                isComplete={step === 'complete'} 
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {step === 'complete' 
                ? "Identity Verified!" 
                : "Secure Identity Verification"}
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 text-center lg:text-left">
              {step === 'complete' 
                ? "Your identity has been securely verified and cryptographically stored on our blockchain network. You can now access secure services." 
                : "Our advanced platform uses blockchain technology and multiple verification methods to securely authenticate your identity without exposing your personal data."}
            </p>
            
            {step === 'initial' && (
              <Button 
                onClick={startVerification}
                className="animate-pulse-glow text-lg py-6 px-8"
                size="lg"
              >
                Begin Verification <ChevronRight className="ml-2" />
              </Button>
            )}
            
            {step === 'verification' && !verificationComplete && (
              <div className="space-y-6 w-full max-w-sm">
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    variant={verificationType === 'biometric' ? 'default' : 'outline'}
                    onClick={() => setVerificationType('biometric')}
                    className="flex-1"
                  >
                    Fingerprint
                  </Button>
                  <Button
                    variant={verificationType === 'facial' ? 'default' : 'outline'}
                    onClick={() => setVerificationType('facial')}
                    className="flex-1"
                  >
                    Facial
                  </Button>
                  <Button
                    variant={verificationType === 'password' ? 'default' : 'outline'}
                    onClick={() => setVerificationType('password')}
                    className="flex-1"
                  >
                    Password
                  </Button>
                </div>
                {renderVerificationCard()}
              </div>
            )}
            
            {step === 'blockchain' && (
              <BlockchainVerificationCard 
                onComplete={handleBlockchainComplete} 
                autoStart
              />
            )}
            
            {step === 'complete' && (
              <div className="space-y-6 w-full max-w-sm">
                <Card className="glass-card border-green-500 shadow-lg shadow-green-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="text-green-500 h-10 w-10" />
                      <div>
                        <h3 className="text-lg font-medium text-foreground">Verification Successful</h3>
                        <p className="text-sm text-foreground/70">Your digital identity is now secure</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={goToServices}
                  className="w-full py-6"
                  size="lg"
                  variant="default"
                >
                  Access Secure Services <ChevronRight className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyPage;
