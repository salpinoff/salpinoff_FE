import type { Meta, StoryObj } from '@storybook/react';

import OutlineCard from '.';

const meta = {
  title: 'Components/Cards/OutlineCard',
  component: OutlineCard,
  argTypes: {
    className: {
      control: false,
    },
    width: {
      control: { type: 'number', min: 240, max: 400, step: 10 },
    },
    height: {
      control: { type: 'number', min: 240, max: 400, step: 10 },
    },
  },
} satisfies Meta<typeof OutlineCard>;

export default meta;

type Story = StoryObj<typeof OutlineCard>;

export const Default: Story = {
  args: {
    color: '#9e86fc',
    width: 240,
    height: 240,
  },
};
