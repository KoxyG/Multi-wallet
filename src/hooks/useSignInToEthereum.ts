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
      
      // Get the private key for Ethereum using the correct method
      const ethPrivateKey = mnemonicObj.getPrivateKey(walletInstance.CoinType.ethereum);
      
      // Create an ethers.js wallet from the private key
      const wallet = new ethers.Wallet(ethPrivateKey);
      console.log('Ethereum wallet created:', wallet.address);
      
      // Set up a provider to connect to Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Connect the wallet to the provider
      const connectedWallet = wallet.connect(provider);
      
      // Get the balance
      const balance = await connectedWallet.getBalance();
      const balanceInEth = ethers.utils.formatEther(balance);
      
      return {
        wallet: connectedWallet,
        balance: balanceInEth
      };
    } catch (error) {
      console.error('Error signing in to Ethereum:', error);
      setError('Failed to sign in to Ethereum');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInToEthereum,
    isLoading,
    error
  };
}; 