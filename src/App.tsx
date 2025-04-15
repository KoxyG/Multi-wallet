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
  const [mnemonicObj, setMnemonicObj] = useState<any>(null);
  const [ethereumWallet, setEthereumWallet] = useState<ethers.Wallet | null>(null);
  const [ethBalance, setEthBalance] = useState<string>('');
  const [privatekey, setPrivatekey] = useState<string>('');
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

  // Custom hooks
  const { createWallet, isLoading: isCreatingWallet } = useCreateWallet();
  const { deriveAddresses, isLoading: isDerivingAddresses } = useDeriveAddresses();
  const { signInToEthereum, isLoading: isSigningIn } = useSignInToEthereum();
  const { exportAddressesToCSV } = useExportAddresses();

  // Combined loading state
  const isLoading = isCreatingWallet || isDerivingAddresses || isSigningIn;

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
      const { addresses, privateKeyHex } = result;
      setDerivedAddresses(addresses);
      
     
      setPrivatekey(privateKeyHex);
    }
  };

  const handleSignInToEthereum = async () => {
    if (!mnemonicObj || !walletInstance) return;
    
    const result = await signInToEthereum(mnemonicObj, walletInstance);
    if (result) {
      const { wallet, balance } = result;
      setEthereumWallet(wallet);
      setEthBalance(balance);
    }
  };

  const handleExportAddresses = () => {
    exportAddressesToCSV(derivedAddresses);
  };

  const cancelWallet = () => {
    // Clear all wallet data from memory
    setMnemonic('');
    setMnemonicObj(null);
    setWalletInstance(null);
    setDerivedAddresses({});
    setEthereumWallet(null);
    setPrivatekey('');
    setEthBalance('');
    setShowPrivateKey(false);
    console.log('Wallet cleared from memory');
  };

  return (
    <div className="App">
      <h1>Wallet Core Sign</h1>
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
      
      {mnemonic && !Object.keys(derivedAddresses).length && (
        <div className="mnemonic-display bg-black">
          <h2>Your Mnemonic (12 words):</h2>
          <p className="mnemonic-text">{mnemonic}</p>
          <p className="warning">⚠️ Keep this mnemonic secure and never share it!</p>
        </div>
      )}
      
      {privatekey && (
        <div className="private-key-display bg-black">
          <div className="private-key-header">
            <h2>Private Key</h2>
            <button 
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="toggle-button"
            >
              {showPrivateKey ? 'Hide Private Key' : 'Show Private Key'}
            </button>
          </div>
          
          {showPrivateKey ? (
            <>
              <p className="warning">⚠️ WARNING: Never share your private key with anyone!</p>
              <p className="private-key-text">{privatekey}</p>
            </>
          ) : (
            <p className="private-key-hidden">Private key is hidden. Click the button above to reveal it.</p>
          )}
        </div>
      )}
      
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
            </div>
          )}
          
          <div className="addresses-grid">
            {Object.entries(derivedAddresses).map(([chain, address]) => (
              <div key={chain} className="address-item">
                <h3>{chain}</h3>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
