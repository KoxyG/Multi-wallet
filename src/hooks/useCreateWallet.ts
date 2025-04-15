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
     
      console.log('wallet', wallet);
      const mnemonicObj = wallet.HDWallet.create(128, "password");
      console.log('mnemonicObj', mnemonicObj);
      const mnemonicPhrase = mnemonicObj.mnemonic();
      console.log(mnemonicPhrase);
      
      console.log('mnemonicObj', mnemonicObj);
      
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