import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

interface ButtonLinkIconProps {
  title: string;
  href: string;
  icon?: LucideIcon;
}

const ButtonLinkIcon: React.FC<ButtonLinkIconProps> = ({
  title,
  href,
  icon: Icon
}) => {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: 'default' }))}>
      {Icon && <Icon className="mr-2 h-4 w-4" />} {title}
    </Link>
  );
};

export default ButtonLinkIcon;
