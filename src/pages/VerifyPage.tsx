import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import IdentityAnimation from '@/components/IdentityAnimation';
import BiometricCard from '@/components/BiometricCard';
import BlockchainVerificationCard from '@/components/BlockchainVerificationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, ChevronRight } from 'lucide-react';

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'initial' | 'biometric' | 'blockchain' | 'complete'>('initial');
  
  const startVerification = () => {
    setStep('biometric');
    toast({
      title: "Starting Verification",
      description: "Beginning the secure identity verification process...",
    });
  };
  
  const handleBiometricComplete = () => {
    setStep('blockchain');
  };
  
  const handleBlockchainComplete = () => {
    setStep('complete');
  };
  
  const goToServices = () => {
    navigate('/services');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[60vh] lg:h-[80vh] flex items-center justify-center">
            <div className="w-full h-full">
              <IdentityAnimation 
                isVerifying={step === 'biometric' || step === 'blockchain'} 
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
                : "Our advanced platform uses blockchain technology and biometric verification to securely authenticate your identity without exposing your personal data."}
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
            
            {step === 'biometric' && (
              <BiometricCard onComplete={handleBiometricComplete} />
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
