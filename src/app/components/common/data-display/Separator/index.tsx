import { cva } from 'class-variance-authority';

type SeparatorProps = {
  orientation?: 'vertical' | 'horizontal';
};

const separatorStyle = cva('bg-white/5', {
  variants: {
    orientation: {
      vertical: 'my-1 h-px w-full',
      horizontal: 'mx-1 w-px h-full',
    },
  },
});

export default function Separator({
  orientation = 'horizontal',
}: SeparatorProps) {
  return <div className={separatorStyle({ orientation })} />;
}
