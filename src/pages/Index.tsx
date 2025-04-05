import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import IdentityScene from '@/components/IdentityScene';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Database, Lock, Globe } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Secure Digital Identity</span> in a Connected World
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                IdentiVerse provides blockchain-powered identity verification across online services without exposing your personal data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/verify')}
                  size="lg"
                  className="animate-pulse-glow text-lg py-6 px-8"
                >
                  Verify Identity <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button
                  onClick={() => navigate('/features')}
                  variant="outline"
                  size="lg"
                  className="text-lg py-6 px-8"
                >
                  Explore Features
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 h-[60vh]">
              <IdentityScene />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose IdentiVerse?</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our platform combines advanced technologies to create a secure and seamless identity verification experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass-card hover-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-primary mb-4 mt-2" />
                <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
                <p className="text-foreground/70">
                  Immutable verification records on distributed blockchain technology.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Database className="h-12 w-12 text-primary mb-4 mt-2" />
                <h3 className="text-xl font-semibold mb-2">Data Privacy</h3>
                <p className="text-foreground/70">
                  Zero-knowledge proofs verify without revealing personal data.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Lock className="h-12 w-12 text-primary mb-4 mt-2" />
                <h3 className="text-xl font-semibold mb-2">Biometric Auth</h3>
                <p className="text-foreground/70">
                  Multi-factor authentication with advanced biometrics.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Globe className="h-12 w-12 text-primary mb-4 mt-2" />
                <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
                <p className="text-foreground/70">
                  Seamless integration with multiple service providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Our platform makes identity verification simple, secure, and seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative animate-float">
                <span className="text-2xl font-bold text-primary">1</span>
                <div className="absolute w-full h-full rounded-full bg-primary/20 animate-pulse-glow"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Registration</h3>
              <p className="text-foreground/70">
                Register once with biometric verification and secure document upload.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="text-2xl font-bold text-primary">2</span>
                <div className="absolute w-full h-full rounded-full bg-primary/20 animate-pulse-glow" style={{ animationDelay: "0.5s" }}></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
              <p className="text-foreground/70">
                Your verification is securely stored on our blockchain network.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-2xl font-bold text-primary">3</span>
                <div className="absolute w-full h-full rounded-full bg-primary/20 animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Access</h3>
              <p className="text-foreground/70">
                Access services with one-click verification that protects your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Integration Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Services</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              IdentiVerse seamlessly integrates with multiple service providers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {/* Service Icons */}
            {['Banking', 'Healthcare', 'E-Commerce', 'Government', 'Travel', 'Education'].map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-muted/50 rounded-lg flex items-center justify-center mb-3 hover-glow transition-all duration-300">
                  <span className="text-primary font-bold">{service.charAt(0)}</span>
                </div>
                <span className="text-foreground/80 text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center rounded-xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Digital Identity?</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Experience the future of identity verification with our blockchain-powered platform. Get started today.
            </p>
            <Button
              onClick={() => navigate('/verify')}
              size="lg"
              className="animate-pulse-glow text-lg py-6 px-10"
            >
              Verify Your Identity <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
