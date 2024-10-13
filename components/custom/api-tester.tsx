'use client';

import React from 'react';
import { useEffect } from 'react';
import { useGet } from '@/hooks/fetcher';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';

const ApiTester = () => {
  const { toast } = useToast();
  const { data, loading, error } = useGet('/api/test/hello');

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
      <Button disabled={loading} onClick={() => {}}>
        Test Hello
      </Button>
    </div>
  );
};

export default ApiTester;
