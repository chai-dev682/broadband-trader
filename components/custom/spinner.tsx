'use client';
import React from 'react';

const DefaultSpinner = ({ size = 8, width = 4, color = 'primary' }) => {
  const sizeCss = `h-${size} w-${size}`;
  return (
    <div
      className={`flex items-center justify-center ${sizeCss} animate-spin`}
      style={{ borderTopColor: 'transparent' }}
    >
      <div
        className={`border-${width} rounded-full border-solid border-${color} border-t-transparent ${sizeCss}`}
      ></div>
    </div>
  );
};

export { DefaultSpinner };
