
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="text-gradient">About IdentiVerse</span>
          </h1>
          
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-xl text-foreground/80 mb-6">
              IdentiVerse is a cutting-edge digital identity verification platform built to address the growing challenges of online identity theft, data breaches, and privacy concerns in our increasingly digital world.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="text-foreground/80 mb-6">
              We believe that identity verification should be secure, private, and user-controlled. Our mission is to provide a platform that empowers individuals to verify their identity across digital services without exposing their personal information to unnecessary risks.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">The Problem We're Solving</h2>
            <p className="text-foreground/80 mb-6">
              Traditional identity verification systems often require users to repeatedly share sensitive personal information with multiple service providers, creating significant security and privacy risks:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-6">
              <li>Centralized databases of personal information are prime targets for hackers</li>
              <li>Users have limited control over how their data is stored and used</li>
              <li>Verification processes are often cumbersome and inconsistent</li>
              <li>Cross-border verification presents additional challenges</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Solution</h2>
            <p className="text-foreground/80 mb-6">
              IdentiVerse leverages blockchain technology, biometric authentication, and advanced cryptography to create a secure, decentralized identity verification system:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-6">
              <li>Blockchain-based verification creates an immutable, tamper-proof record</li>
              <li>Zero-knowledge proofs allow verification without revealing underlying data</li>
              <li>Biometric authentication ensures only the rightful user can access their identity</li>
              <li>Decentralized architecture eliminates single points of failure</li>
              <li>Cross-platform integration enables seamless verification across services</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Team</h2>
            <p className="text-foreground/80 mb-6">
              IdentiVerse was founded by a team of cybersecurity experts, blockchain developers, and privacy advocates committed to building a more secure digital identity ecosystem. Our diverse team brings together expertise from financial technology, cryptography, biometrics, and regulatory compliance.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Looking Forward</h2>
            <p className="text-foreground/80 mb-6">
              We are continuously developing new features and expanding our platform to meet the evolving needs of digital identity verification. Our roadmap includes enhanced biometric capabilities, additional service integrations, and expanded cross-border verification solutions.
            </p>
            
            <div className="mt-12 p-8 bg-muted/30 rounded-lg backdrop-blur-sm border border-primary/20 text-center">
              <h3 className="text-xl font-semibold mb-4">Experience Secure Identity Verification</h3>
              <p className="text-foreground/80 mb-6">
                Ready to take control of your digital identity? Try our secure verification process today.
              </p>
              <Button 
                onClick={() => navigate('/verify')}
                size="lg"
                className="animate-pulse-glow"
              >
                Verify Your Identity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
