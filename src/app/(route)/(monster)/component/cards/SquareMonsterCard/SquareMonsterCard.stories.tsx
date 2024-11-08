import type { Meta, StoryObj } from '@storybook/react';

import SquareMonsterCard from '.';

const meta = {
  title: 'Components/Cards/SquareMonsterCard',
  component: SquareMonsterCard,
  argTypes: {
    className: {
      control: false,
    },
    width: {
      control: { type: 'number', min: 240, max: 240, step: 10 },
    },
    height: {
      control: { type: 'number', min: 240, max: 240, step: 10 },
    },
  },
} satisfies Meta<typeof SquareMonsterCard>;

export default meta;

type Story = StoryObj<typeof SquareMonsterCard>;

export const Default: Story = {
  args: {
    color: '#029cfd',
    name: '테스트',
    width: 240,
    height: 240,
  },
};
