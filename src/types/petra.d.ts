interface PetraWallet {
  connect(): Promise<{ status: number }>;
  disconnect(): Promise<void>;
  account(): Promise<{ address: string }>;
  isConnected: boolean;
  network(): Promise<string>;
}

interface Window {
  aptos: PetraWallet;
} 