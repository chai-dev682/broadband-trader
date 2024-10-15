'use client';

import React from 'react';
import { useEffect } from 'react';
import { useGet } from '@/hooks/fetcher';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';

const ApiTester = () => {
  const { toast } = useToast();
  const { get, data, loading, error } = useGet('/api/test/hello', false);

  useEffect(() => {
    if (data || error) {
      toast({
        title: 'results',
        description: JSON.stringify(data || error),
        variant: 'default'
      });
    }
  }, [data, error]);
  return (
    <div>
      {' '}
      <Button disabled={loading} onClick={get}>
        Test Hello
      </Button>
    </div>
  );
};

export default ApiTester;
