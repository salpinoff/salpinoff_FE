import { cva, VariantProps } from 'class-variance-authority';

const colorStyles = cva(
  'rounded-circular min-w-[36px] min-h-[36px] aspect-square	relative',
  {
    variants: {
      color: {
        RED_ORANGE: 'bg-red-orange-70',
        GREEN: 'bg-green-70',
        CYAN: 'bg-cyan-70',
        LIGHT_BLUE: 'bg-light-blue-70',
        VIOLET: 'bg-violet-70',
      },
    },
  },
);

export type ColorProps = VariantProps<typeof colorStyles>;

export function Color({ color }: ColorProps) {
  return <div className={colorStyles({ color })} />;
}
