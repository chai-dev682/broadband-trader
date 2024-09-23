'use client';
import React, { useState } from 'react';
import PairItem from '../custom/pair-item';
import { ChevronDown, ChevronUp } from 'lucide-react';
const MyNotesAtGlance = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div>
      <div className="text-2xl font-semibold">
        My Notes at-a-Glance {1172}
        <span
          className="inline-block cursor-pointer text-blue-600"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {isShow ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {isShow && (
        <div className="mt-2">
          <PairItem tag="In Funding" value="$0" />
          <PairItem tag="Issued & Current" value="$0" />
          <PairItem tag="Fully Paid" value="$0" />
          <PairItem tag="Late 16 - 30 Days" value="$0" />
          <PairItem tag="Late 31 - 120 Days" value="$0" />
          <PairItem tag="Default" value="$0" />
          <PairItem tag="Charged Off" value="$0" />
        </div>
      )}
    </div>
  );
};

export default MyNotesAtGlance;
