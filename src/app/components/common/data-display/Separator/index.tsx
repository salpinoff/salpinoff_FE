import { cva } from 'class-variance-authority';

type SeparatorProps = {
  orientation?: 'vertical' | 'horizontal';
};

const separatorStyle = cva('bg-white/5', {
  variants: {
    orientation: {
      vertical: 'mx-1 w-px h-full',
      horizontal: 'my-1 h-px w-full',
    },
  },
});

export default function Separator({
  orientation = 'horizontal',
}: SeparatorProps) {
  return <div className={separatorStyle({ orientation })} />;
}
