import { LucideIcon } from 'lucide-react';
import React, { useMemo } from 'react';

interface ButtonIconProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  size = 'md',
  color = 'primary',
  icon: Icon,
  onClick
}) => {
  const calculatedSize = useMemo(() => {
    return Object.keys(sizes).find((item) => item == size)
      ? sizes[size as keyof typeof sizes]
      : size;
  }, [size]);
  return (
    <span onClick={onClick} className={'text-' + color}>
      <Icon
        size={calculatedSize}
        className={
          'inline-block cursor-default rounded-full transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }
      />
    </span>
  );
};

export default ButtonIcon;
