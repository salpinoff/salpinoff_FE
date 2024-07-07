import type { Meta, StoryObj } from '@storybook/react';

import FlipCard from '.';

const meta = {
  title: 'Components/Cards/FlipCard',
  component: FlipCard,
  argTypes: {
    flipped: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story, args) => (
      <div className="h-[240px] w-[240px] text-[#029CFD]">
        <Story {...args} />
      </div>
    ),
  ],
} satisfies Meta<typeof FlipCard>;

export default meta;

type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {
  args: {
    flipped: false,
    children: [
      <div
        key={1}
        className="flex h-[240px] w-[240px] items-center justify-center border bg-black"
      >
        Flip Card Front
      </div>,
      <div
        key={2}
        className="flex h-[240px] w-[240px] items-center justify-center border bg-white"
      >
        Flip Card Back
      </div>,
    ],
  },
};
