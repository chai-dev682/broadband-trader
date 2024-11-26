import React, { useState, createContext, useContext } from 'react';
import { TatumSDK, Network, Ethereum, MetaMask } from '@tatumio/tatum';

const MetaContext = createContext({
  account: null as string | null,
  error: null as string | null,
  connectMetaMask: async () => {}
});

export const MetaProvider: React.FC<
  React.PropsWithChildren<React.ReactNode>
> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = async () => {
    setError(null);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM
      });
      const metamaskAccount = await tatum.walletProvider
        .use(MetaMask)
        .getWallet();
      setAccount(metamaskAccount);
    } catch (error: any) {
      // Consider logging the full error object for debugging purposes
      console.error('Error connecting to MetaMask:', error);
      setError(error.message);
    }
  };

  const contextValue = { account, error, connectMetaMask };

  return (
    <MetaContext.Provider value={contextValue}>{children}</MetaContext.Provider>
  );
};

export const useMetaMaskTatum = () => useContext(MetaContext);
