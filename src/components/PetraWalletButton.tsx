import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wallet, LogOut } from 'lucide-react';

interface PetraWalletButtonProps {
  onConnect?: (address: string) => void;
}

const PetraWalletButton: React.FC<PetraWalletButtonProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check initial connection status
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.aptos !== 'undefined') {
        try {
          const account = await window.aptos.account();
          if (account) {
            setWalletAddress(account.address);
            setIsConnected(true);
            if (onConnect) {
              onConnect(account.address);
            }
          }
        } catch (error) {
          console.log('Not connected to Petra wallet');
        }
      }
    };
    checkConnection();
  }, [onConnect]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if Petra wallet is installed
      if (typeof window.aptos === 'undefined') {
        toast({
          title: "Petra Wallet Not Found",
          description: "Please install Petra wallet extension first.",
          variant: "destructive",
        });
        window.open("https://petra.app/", "_blank");
        return;
      }

      try {
        // Request connection to wallet
        await window.aptos.connect();
        
        // Get account after connection
        const account = await window.aptos.account();
        
        if (account) {
          const address = account.address;
          setWalletAddress(address);
          setIsConnected(true);
          
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to Petra wallet.",
          });

          // Call the onConnect callback with the address
          if (onConnect) {
            onConnect(address);
          }
        } else {
          throw new Error('No account found');
        }
      } catch (verifyError) {
        console.error('Error verifying wallet:', verifyError);
        toast({
          title: "Connection Failed",
          description: "Failed to connect to Petra wallet. Please make sure the wallet is unlocked and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting to Petra wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Petra wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (typeof window.aptos !== 'undefined') {
        await window.aptos.disconnect();
        setWalletAddress(null);
        setIsConnected(false);
        toast({
          title: "Wallet Disconnected",
          description: "Successfully disconnected from Petra wallet.",
        });
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect from Petra wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isConnected && walletAddress) {
    return (
      <div className="flex gap-2 w-full">
        <Button
          className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          disabled
        >
          <Wallet size={16} className="mr-2" />
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </Button>
        <Button
          onClick={disconnectWallet}
          className="h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium px-4"
        >
          <LogOut size={16} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="w-full h-12 bg-[#1a1f37] hover:bg-[#252b45] text-white rounded-lg font-medium border border-blue-500/20 flex items-center justify-center gap-2"
    >
      <Wallet size={16} className="text-blue-400" />
      {isConnecting ? "Connecting..." : "Connect Petra Wallet"}
    </Button>
  );
};

export default PetraWalletButton; 