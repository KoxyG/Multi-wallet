import { useState } from 'react';
import { Wallet } from '../utils/wallet';

export const useDeriveAddresses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deriveAddresses = async (mnemonicObj: any, walletInstance: Wallet) => {
    if (!mnemonicObj || !walletInstance) {
      setError('Mnemonic or wallet instance is missing');
      return null;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const addresses: Record<string, string> = {};
      
      // Derive addresses for different blockchains
      // Bitcoin
      const btcAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.bitcoin);
      addresses['Bitcoin'] = btcAddress;
      
      // Ethereum
      const ethAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.ethereum);
      addresses['Ethereum'] = ethAddress;
      const ethPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.ethereum);
      console.log('ethPrivateKey', ethPrivateKey);
      
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
      
      return {
        addresses,
        ethPrivateKey
      };
    } catch (error) {
      console.error('Error deriving addresses', error);
      setError('Failed to derive addresses');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deriveAddresses,
    isLoading,
    error
  };
}; 