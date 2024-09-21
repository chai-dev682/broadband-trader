'use client';
import React from 'react';
import PairItem from '../custom/pair-item';

const MyAccountBalances = () => {
  return (
    <div>
      <div className="text-2xl font-semibold">
        My Account #{' '}
        <span className="cursor-pointer text-blue-600">More Details</span>
      </div>
      <div className="mt-2">
        <PairItem tag="Available Cash" value="$0" />
        <PairItem tag="In Funding Notes" value="$0" />
        <PairItem tag="Outstanding Principle" value="$0" />
        <PairItem tag="Accrued Revenue" value="$0" />
        <PairItem
          tag="Account Total"
          value="$0"
          textStyle="font-bold text-xl"
        />
      </div>
    </div>
  );
};

export default MyAccountBalances;
