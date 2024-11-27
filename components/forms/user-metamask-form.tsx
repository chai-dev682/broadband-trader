'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMetaMaskTatum } from '@/hooks/useMetamaskTatum';

export const UserMetamaskForm: React.FC = () => {
  const { connectMetaMask, account, error } = useMetaMaskTatum();

  return (
    <div>
      {account ? (
        <div>Connected to: {account}</div>
      ) : (
        <Button onClick={connectMetaMask}>Connect MetaMask</Button>
      )}
      {/* // TODO: @Muhammad Zohaib, please handle metamask error here */}
      {error}
    </div>
  );
};
