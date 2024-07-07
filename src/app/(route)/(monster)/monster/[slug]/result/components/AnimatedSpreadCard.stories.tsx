import type { Meta, StoryObj } from '@storybook/react';

import AnimatedSpreadCard from './AnimatedSpreadCard';

const meta = {
  title: 'Components/Cards/AnimatedSpreadCard',
  component: AnimatedSpreadCard,
  argTypes: {
    color: {
      control: {
        type: 'color',
        presetColors: [],
      },
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof AnimatedSpreadCard>;

export default meta;

type Story = StoryObj<typeof AnimatedSpreadCard>;

export const Default: Story = {
  args: {
    name: '테스트',
    color: '#029cfd',
  },
};
