import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';
import { Wallet } from './utils/wallet';
import { ethers } from 'ethers';
import { 
  useCreateWallet, 
  useDeriveAddresses, 
  useSignInToEthereum, 
  useExportAddresses 
} from './hooks';
import { useFetchPrices } from './hooks/useFetchPrices';
import SignMessageModal from './components/SignMessageModal';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [walletInstance, setWalletInstance] = useState<Wallet | null>(null);
  const [derivedAddresses, setDerivedAddresses] = useState<Record<string, string>>({});
  const [privateKeys, setPrivateKeys] = useState<Record<string, string>>({});
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<Record<string, boolean>>({});
  const [mnemonicObj, setMnemonicObj] = useState<any>(null);
  const [ethereumWallet, setEthereumWallet] = useState<ethers.Wallet | null>(null);
  const [ethBalance, setEthBalance] = useState<string>('');
  const [privatekey, setPrivatekey] = useState<string>('');
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [signature, setSignature] = useState<string>('');
  const [recoveredAddress, setRecoveredAddress] = useState<string>('');
  const [signedMessage, setSignedMessage] = useState<string>('');
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);
  const [walletForSigning, setWalletForSigning] = useState<ethers.Wallet | null>(null);

  // Custom hooks
  const { createWallet, isLoading: isCreatingWallet } = useCreateWallet();
  const { deriveAddresses, isLoading: isDerivingAddresses } = useDeriveAddresses();
  const { signInToEthereum, signMessage, isLoading: isSigningIn } = useSignInToEthereum();
  const { exportAddressesToCSV } = useExportAddresses();
  const { prices, isLoading: isLoadingPrices, error: priceError } = useFetchPrices(derivedAddresses);

  // Combined loading state
  const isLoading = isCreatingWallet || isDerivingAddresses || isSigningIn || isLoadingPrices;

  const handleCreateWallet = async () => {
    const result = await createWallet();
    if (result) {
      const { wallet, mnemonicObj, mnemonicPhrase } = result;
      setMnemonic(mnemonicPhrase);
      setMnemonicObj(mnemonicObj);
      setWalletInstance(wallet);
      setDerivedAddresses({});
      setEthereumWallet(null);
      setPrivatekey('');
      setEthBalance('');
      setShowPrivateKey(false);
    }
  };

  const handleDeriveAddresses = async () => {
    if (!mnemonicObj || !walletInstance) return;
    
    const result = await deriveAddresses(mnemonicObj, walletInstance);
    if (result) {
      const { addresses, privateKeys } = result;
      setDerivedAddresses(addresses);
      setPrivateKeys(privateKeys);
      
      // Initialize all private keys as hidden
      const initialVisibility: Record<string, boolean> = {};
      Object.keys(addresses).forEach(chain => {
        initialVisibility[chain] = false;
      });
      setVisiblePrivateKeys(initialVisibility);
    }
  };

  const handleSignInToEthereum = async () => {
    if (!mnemonicObj || !walletInstance) return;
    
    const result = await signInToEthereum(mnemonicObj, walletInstance);
    if (result) {
      const { wallet, balance } = result;
      setEthereumWallet(wallet);
      setEthBalance(balance);
      setWalletForSigning(wallet);
      // Open the sign modal
      setIsSignModalOpen(true);
    }
  };

  const handleSignMessage = async (message: string) => {
    if (!walletForSigning) return;
    
    try {
      const result = await signMessage(walletForSigning, message);
      if (result) {
        const { signature, recoveredAddress, message } = result;
        setSignature(signature);
        setRecoveredAddress(recoveredAddress);
        setSignedMessage(message);
      }
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  const handleExportAddresses = () => {
    exportAddressesToCSV(derivedAddresses);
  };

  const togglePrivateKey = (chain: string) => {
    setVisiblePrivateKeys(prev => ({
      ...prev,
      [chain]: !prev[chain]
    }));
  };

  const cancelWallet = () => {
    // Clear all wallet data from memory
    setMnemonic('');
    setMnemonicObj(null);
    setWalletInstance(null);
    setDerivedAddresses({});
    setPrivateKeys({});
    setVisiblePrivateKeys({});
    setEthereumWallet(null);
    setPrivatekey('');
    setEthBalance('');
    setShowPrivateKey(false);
    setSignature('');
    setRecoveredAddress('');
    setSignedMessage('');
  };

  // Format price with appropriate precision
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 1) {
      return `$${price.toFixed(3)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(8)}`;
    }
  };

  // Format 24h change with color
  const formatChange = (change: number) => {
    const color = change >= 0 ? '#4caf50' : '#f44336';
    const sign = change >= 0 ? '+' : '';
    return <span style={{ color }}>{sign}{change.toFixed(2)}%</span>;
  };

  return (
    <div className="App">
      <h1>Multi-Chain Wallet Dashboard</h1>
      <div className="button-container">
        { !Object.keys(derivedAddresses).length && (
          <button
            onClick={handleCreateWallet}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Wallet'}
          </button>
        )}
        
        {mnemonic && (
          <>
            <button
              onClick={handleDeriveAddresses}
              disabled={isLoading}
              className="derive-button"
            >
              {isLoading ? 'Deriving...' : 'Derive Addresses'}
            </button>
            <button
              onClick={cancelWallet}
              className="cancel-button"
            >
              Cancel & Clear Wallet
            </button>
          </>
        )}
      </div>
      
      <SignMessageModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSign={handleSignMessage}
      />
      
    
      {Object.keys(derivedAddresses).length > 0 && (
        <div className="addresses-display bg-black">
          <h2>Derived Addresses:</h2>
          <div className="action-buttons">
            <button
              onClick={handleExportAddresses}
              className="export-button"
            >
              Export Addresses as CSV
            </button>
            
            {derivedAddresses['Ethereum'] && !ethereumWallet && (
              <button
                onClick={handleSignInToEthereum}
                className="eth-signin-button"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect to Ethereum'}
              </button>
            )}
          </div>
          
          {ethereumWallet && (
            <div className="ethereum-wallet-info">
              <h3>Ethereum Wallet Connected</h3>
              <p>Address: {ethereumWallet.address}</p>
              <p>Balance: {ethBalance} ETH</p>
              
              {signature && (
                <div className="signature-info">
                  <h4>Message Signature</h4>
                  <p className="signed-message">Message: "{signedMessage}"</p>
                  <p className="signature">Signature: {signature}</p>
                  <p className="recovered-address">Recovered Address: {recoveredAddress}</p>
                  <p className="verification-result">
                    Verification: {recoveredAddress === ethereumWallet.address ? 
                      <span className="success">✓ Addresses match</span> : 
                      <span className="error">✗ Addresses don't match</span>}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {priceError && (
            <div className="price-error">
              <p>Error fetching prices: {priceError}</p>
            </div>
          )}
          
          <div className="addresses-grid">
            {Object.entries(derivedAddresses).map(([chain, address]) => (
              <div key={chain} className="address-item">
                <h3>{chain}</h3>
                
                {/* Price display */}
                {prices[chain] && (
                  <div className="price-info">
                    <p className="price">{formatPrice(prices[chain].price)}</p>
                    <p className="change">24h: {formatChange(prices[chain].change24h)}</p>
                  </div>
                )}
                
                <div className="qr-code-container">
                  <QRCodeSVG
                    value={address}
                    size={128}
                    level="H"
                    includeMargin={true}
                    className="qr-code"
                  />
                </div>
                <p className="address-text">{address}</p>
                
                {/* Private Key Toggle */}
                <div className="private-key-section">
                  <button 
                    onClick={() => togglePrivateKey(chain)}
                    className="toggle-button"
                  >
                    {visiblePrivateKeys[chain] ? 'Hide Private Key' : 'Show Private Key'}
                  </button>
                  
                  {visiblePrivateKeys[chain] && (
                    <div className="private-key-display">
                      <p className="warning">⚠️ WARNING: Never share your private key with anyone!</p>
                      <p className="private-key-text">{privateKeys[chain]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
