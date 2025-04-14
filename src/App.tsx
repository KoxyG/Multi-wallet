import { useState } from 'react';
import { initWasm } from '@trustwallet/wallet-core';
import './App.css';
import { TTranx } from './utils/wallet/types';
import { Wallet } from './utils/wallet';

function App() {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [walletInstance, setWalletInstance] = useState<any>(null);
  const [derivedAddresses, setDerivedAddresses] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mnemonicObj, setMnemonicObj] = useState<any>(null);

  const createWallet = async () => {
    try {
      setIsLoading(true);
      const walletCore = await initWasm();
      const wallet = new Wallet(walletCore);
      console.log('wallet', wallet);
      const mnemonicObj = wallet.HDWallet.create(128, "password");
      const mnemonicPhrase = mnemonicObj.mnemonic();
      console.log(mnemonicPhrase);
      
      // Store in state
      setMnemonic(mnemonicPhrase);
      setMnemonicObj(mnemonicObj);
      setWalletInstance(wallet);
      setDerivedAddresses({});
    } catch (error) {
      console.error('Error creating wallet', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deriveAddresses = async () => {
    if (!mnemonicObj || !mnemonic) return;
    
    try {
      setIsLoading(true);
      const addresses: Record<string, string> = {};
      
     
      // Derive addresses for different blockchains
      // Bitcoin
      const btcAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.bitcoin);
      addresses['Bitcoin'] = btcAddress;
      
      // Ethereum
      const ethAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.ethereum);
      addresses['Ethereum'] = ethAddress;
      
      // Binance Chain
      const bnbAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.binance);
      addresses['Binance Chain'] = bnbAddress;

      // Polygon Chain
      const polyAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.polygon);
      addresses['Polygon Chain'] = polyAddress;
      
      // Avalanche Chain
      const avaxAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.avalancheCChain);
      addresses['Avalanche Chain'] = avaxAddress;
      
      //Fantom Chain
      const fantomAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.fantom);
      addresses['Fantom Chain'] = fantomAddress;

      // Dogecoin Chain
      const dogeAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.dogecoin);
      addresses['Dogecoin'] = dogeAddress;

      // Cosmos Chain
      const cosmosAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.cosmos);
      addresses['Cosmos Chain'] = cosmosAddress;

      // Near Chain
      const nearAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.near);
      addresses['Near Chain'] = nearAddress;

      // Sui Chain
      const suiAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.sui);
      addresses['Sui Chain'] = suiAddress;

      // Sei Chain
      const seiAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.sei);
      addresses['Sei Chain'] = seiAddress;

      // Tron Chain
      const tronAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.tron);
      addresses['Tron Chain'] = tronAddress;

      // Solana Chain
      const solanaAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.solana);
      addresses['Solana Chain'] = solanaAddress;

      // OM (Mantra) Chain
      const omAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.ethereum);
      addresses['OM (Mantra) Chain'] = omAddress;

      
      // addresses['OM (Mantra) Chain'] = omAddress;
      setDerivedAddresses(addresses);
    } catch (error) {
      console.error('Error deriving addresses', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportAddressesToCSV = () => {
    if (Object.keys(derivedAddresses).length === 0) return;

    // Create CSV content
    const csvContent = [
      ['Chain', 'Address'],
      ...Object.entries(derivedAddresses).map(([chain, address]) => [chain, address])
    ].map(row => row.join(',')).join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'wallet_addresses.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>Wallet Core Sign Sample</h1>
      <div className="button-container">
        <button
          onClick={async () => {
            await createWallet();
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Wallet'}
        </button>
        
        {mnemonic && (
          <button
            onClick={deriveAddresses}
            disabled={isLoading}
            className="derive-button"
          >
            {isLoading ? 'Deriving...' : 'Derive Addresses'}
          </button>
        )}
      </div>
      
      {mnemonic && (
        <div className="mnemonic-display bg-black">
          <h2>Your Mnemonic (12 words):</h2>
          <p className="mnemonic-text">{mnemonic}</p>
          <p className="warning">⚠️ Keep this mnemonic secure and never share it!</p>
        </div>
      )}
      
      {Object.keys(derivedAddresses).length > 0 && (
        <div className="addresses-display bg-black">
         
          <h2>Derived Addresses:</h2>
          <button
            onClick={exportAddressesToCSV}
            className="export-button"
          >
            Export Addresses as CSV
          </button>
          <div className="addresses-grid">
            {Object.entries(derivedAddresses).map(([chain, address]) => (
              <div key={chain} className="address-item">
                <h3>{chain}</h3>
                <p className="address-text">{address}</p>
              </div>
            ))}
          </div>
          
        </div>
      )}
      
      <p className="read-the-docs">Click on the buttons above and check the console</p>
    </div>
  );
}

export default App;
