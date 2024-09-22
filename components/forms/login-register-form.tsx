'use client';
import React, { useState } from 'react';
import { UserAuthForm } from './user-auth-form';
import { UserRegForm } from './user-reg-form';

const LoginRegisterForm = () => {
  const [haveAccount, setHaveAccount] = useState(true);

  if (haveAccount)
    return (
      <UserAuthForm
        onNotHaveAccount={() => {
          setHaveAccount(false);
        }}
      />
    );

  return (
    <UserRegForm
      onHaveAccount={() => {
        setHaveAccount(true);
      }}
    />
  );
};

export default LoginRegisterForm;
