import { useState } from 'react';
import { initWasm } from '@trustwallet/wallet-core';
import { Wallet } from '../utils/wallet';

export const useCreateWallet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const walletCore = await initWasm();
      const wallet = new Wallet(walletCore);
     
   
      const mnemonicObj = wallet.HDWallet.create(128, "password");
  
      const mnemonicPhrase = mnemonicObj.mnemonic();
      
      
      return {
        wallet,
        mnemonicObj,
        mnemonicPhrase
      };
    } catch (error) {
      console.error('Error creating wallet', error);
      setError('Failed to create wallet');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWallet,
    isLoading,
    error
  };
}; 