import React from 'react';

interface PairItemProps {
  tag: string;
  value: string;
  textStyle?: string;
}

const PairItem: React.FC<PairItemProps> = ({ tag, value, textStyle }) => {
  return (
    <div className="flex flex-row font-semibold">
      <div className={`flex-1 p-1 ${textStyle || ''}`}>{tag}</div>
      <div className={`flex-1 p-1 ${textStyle || ''}`}>{value}</div>
    </div>
  );
};

export default PairItem;
