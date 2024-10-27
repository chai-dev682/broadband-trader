'use client';

import React from 'react';

interface DefaultSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  margin?: number;
}

const sizeMap = {
  xs: 'w-4 h-4 border-2',
  sm: 'w-8 h-8 border-2',
  md: 'w-16 h-16 border-4',
  lg: 'w-24 h-24 border-8'
};

const DefaultSpinner: React.FC<DefaultSpinnerProps> = ({
  size = 'sm',
  color = 'primary',
  margin = 1
}) => {
  if (!color.includes('-') && color != 'primary') {
    // if color isn't passed as tailwind color like red-500, blue-500
    // then convert the passed color to the tailwind color
    color = `${color}-500`; //500 means medium shade
  }

  const sizeClasses = sizeMap[size];
  return (
    <span
      className={`inline-block m-${margin} ${sizeClasses} border-${color} text-red border-t-${color} animate-spin rounded-full border-t-transparent`}
    ></span>
  );
};

export { DefaultSpinner };
