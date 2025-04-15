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
      const privateKeys: Record<string, string> = {};
      
      // Derive addresses for different blockchains
      
      // Ethereum
      const ethAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.ethereum);
      addresses['Ethereum'] = ethAddress;
      const ethPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.ethereum); 
      const privateKeyBytes = ethPrivateKey.data();
      const privateKeyHex = walletInstance.HexCoding.encode(privateKeyBytes).replace('0x', '');
      privateKeys['Ethereum'] = privateKeyHex;

      
    
      // Bitcoin
      const btcAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.bitcoin);
      addresses['Bitcoin'] = btcAddress;
      const btcPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.bitcoin);
      const btcPrivateKeyBytes = btcPrivateKey.data();
      const btcPrivateKeyHex = walletInstance.HexCoding.encode(btcPrivateKeyBytes).replace('0x', '');
      privateKeys['Bitcoin'] = btcPrivateKeyHex;

      // Binance Chain
      const bnbAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.binance);
      addresses['Binance Chain'] = bnbAddress;
      const bnbPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.binance); 
      const bnbprivateKeyBytes = bnbPrivateKey.data();
      const bnbprivateKeyHex = walletInstance.HexCoding.encode(bnbprivateKeyBytes).replace('0x', '');
      privateKeys['Binance Chain'] = bnbprivateKeyHex;
      
      // Polygon Chain
      const polyAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.polygon);
      addresses['Polygon Chain'] = polyAddress;
      const polyPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.polygon);
      const polyPrivateKeyBytes = polyPrivateKey.data();
      const polyPrivateKeyHex = walletInstance.HexCoding.encode(polyPrivateKeyBytes).replace('0x', '');
      privateKeys['Polygon Chain'] = polyPrivateKeyHex;
      
      // Avalanche Chain
      const avaxAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.avalancheCChain);
      addresses['Avalanche Chain'] = avaxAddress;
      const avaxPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.avalancheCChain);
      const avaxPrivateKeyBytes = avaxPrivateKey.data();
      const avaxPrivateKeyHex = walletInstance.HexCoding.encode(avaxPrivateKeyBytes).replace('0x', '');
      privateKeys['Avalanche Chain'] = avaxPrivateKeyHex;

      // Stellar
      const stellarAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.stellar);
      addresses['Stellar'] = stellarAddress;
      const stellarPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.stellar);
      const stellarPrivateKeyBytes = stellarPrivateKey.data();
      const stellarPrivateKeyHex = walletInstance.HexCoding.encode(stellarPrivateKeyBytes).replace('0x', '');
      privateKeys['Stellar'] = stellarPrivateKeyHex;

      
      //Fantom Chain
      const fantomAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.fantom);
      addresses['Fantom Chain'] = fantomAddress;
      const fantomPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.fantom);
      const fantomPrivateKeyBytes = fantomPrivateKey.data();
      const fantomPrivateKeyHex = walletInstance.HexCoding.encode(fantomPrivateKeyBytes).replace('0x', '');
      privateKeys['Fantom Chain'] = fantomPrivateKeyHex;

      // Dogecoin Chain
      const dogeAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.dogecoin);
      addresses['Dogecoin'] = dogeAddress;
      const dogePrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.dogecoin);
      const dogePrivateKeyBytes = dogePrivateKey.data();
      const dogePrivateKeyHex = walletInstance.HexCoding.encode(dogePrivateKeyBytes).replace('0x', '');
      privateKeys['Dogecoin'] = dogePrivateKeyHex;

      // Cosmos Chain
      const cosmosAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.cosmos);
      addresses['Cosmos Chain'] = cosmosAddress;
      const cosmosPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.cosmos);
      const cosmosPrivateKeyBytes = cosmosPrivateKey.data();
      const cosmosPrivateKeyHex = walletInstance.HexCoding.encode(cosmosPrivateKeyBytes).replace('0x', '');
      privateKeys['Cosmos Chain'] = cosmosPrivateKeyHex;

      // Near Chain
      const nearAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.near);
      addresses['Near Chain'] = nearAddress;
      const nearPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.near);
      const nearPrivateKeyBytes = nearPrivateKey.data();
      const nearPrivateKeyHex = walletInstance.HexCoding.encode(nearPrivateKeyBytes).replace('0x', '');
      privateKeys['Near Chain'] = nearPrivateKeyHex;

      // Sui Chain
      const suiAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.sui);
      addresses['Sui Chain'] = suiAddress;
      const suiPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.sui);
      const suiPrivateKeyBytes = suiPrivateKey.data();
      const suiPrivateKeyHex = walletInstance.HexCoding.encode(suiPrivateKeyBytes).replace('0x', '');
      privateKeys['Sui Chain'] = suiPrivateKeyHex;

      
      // Sei Chain
      const seiAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.sei);
      addresses['Sei Chain'] = seiAddress;
      const seiPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.sei);
      const seiPrivateKeyBytes = seiPrivateKey.data();
      const seiPrivateKeyHex = walletInstance.HexCoding.encode(seiPrivateKeyBytes).replace('0x', '');
      privateKeys['Sei Chain'] = seiPrivateKeyHex;

      // Tron Chain
      const tronAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.tron);
      addresses['Tron Chain'] = tronAddress;
      const tronPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.tron);
      const tronPrivateKeyBytes = tronPrivateKey.data();
      const tronPrivateKeyHex = walletInstance.HexCoding.encode(tronPrivateKeyBytes).replace('0x', '');
      privateKeys['Tron Chain'] = tronPrivateKeyHex;

      // Solana Chain
      const solanaAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.solana);
      addresses['Solana Chain'] = solanaAddress;
      const solanaPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.solana);
      const solanaPrivateKeyBytes = solanaPrivateKey.data();
      const solanaPrivateKeyHex = walletInstance.HexCoding.encode(solanaPrivateKeyBytes).replace('0x', '');
      privateKeys['Solana Chain'] = solanaPrivateKeyHex;

      // OM (Mantra) Chain
      const omAddress = mnemonicObj.getAddressForCoin(walletInstance.CoinType.ethereum);
      addresses['OM (Mantra) Chain'] = omAddress;
      privateKeys['OM (Mantra) Chain'] = privateKeyHex; // Using Ethereum private key
      
      return {
        addresses,
        privateKeys
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