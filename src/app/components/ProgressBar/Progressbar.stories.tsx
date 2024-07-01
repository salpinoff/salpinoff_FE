import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '.';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, step: 5 },
    },
    min: {
      control: { type: 'number', min: 0, step: 5 },
    },
    max: {
      control: { type: 'number', min: 0, step: 5 },
    },
    fractionDigits: {
      control: { type: 'inline-radio' },
    },
  },
  decorators: [
    (Story, args) => (
      <div className="w-[240px] text-[#029CFD]">
        <Story {...args} />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 70,
    min: 0,
    max: 100,
    label: 'percent',
    fractionDigits: 0,
  },
};
