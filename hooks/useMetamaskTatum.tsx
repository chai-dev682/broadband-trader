import { useState } from 'react';
import { TatumSDK, Network, Ethereum, MetaMask } from '@tatumio/tatum';

export function useMetaMaskTatum() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = async () => {
    setError(null); // Clear any previous errors

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM
      });
      const metamaskAccount = await tatum.walletProvider
        .use(MetaMask)
        .getWallet();
      setAccount(metamaskAccount);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { connectMetaMask, account, error };
}
