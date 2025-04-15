import { useState } from 'react';
import { ethers } from 'ethers';
import { Wallet } from '../utils/wallet';

export const useSignInToEthereum = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signInToEthereum = async (mnemonicObj: any, walletInstance: Wallet) => {
    if (!mnemonicObj || !walletInstance) {
      setError('Mnemonic or wallet instance is missing');
      return null;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get Ethereum private key
      const ethPrivateKey = mnemonicObj.getKeyForCoin(walletInstance.CoinType.ethereum);
      const privateKeyBytes = ethPrivateKey.data();
      const privateKeyHex = walletInstance.HexCoding.encode(privateKeyBytes).replace('0x', '');
      
      
      // Create an ethers.js wallet from the private key
      const wallet = new ethers.Wallet(privateKeyHex);
      
      
      // Set up a provider to connect to Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Connect the wallet to the provider
      const connectedWallet = wallet.connect(provider);
      
      // Get the balance
      const balance = ethers.utils.formatEther(await connectedWallet.getBalance());
      
      // Return the wallet and balance without signing yet
      // The actual signing will be handled by the modal
      return {
        wallet: connectedWallet,
        balance,
        privateKeyHex
      };
    } catch (error) {
      console.error('Error signing in to Ethereum', error);
      setError('Failed to sign in to Ethereum');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Separate function to sign a message with our wallet
  const signMessage = async (wallet: ethers.Wallet, message: string) => {
    try {
      // Sign the message directly with our wallet
      const signature = await wallet.signMessage(message);
      
      
      // Verify the signature
      const recoveredAddress = ethers.utils.verifyMessage(message, signature);
      
      return {
        signature,
        recoveredAddress,
        message
      };
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  return {
    signInToEthereum,
    signMessage,
    isLoading,
    error
  };
}; 