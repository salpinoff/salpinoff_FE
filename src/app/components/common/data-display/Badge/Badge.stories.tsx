import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';

const meta = {
  title: 'Components/Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: false,
    },
    children: {
      control: 'text',
    },
    variant: {
      table: {
        defaultValue: {
          summary: '"string"',
        },
      },
      options: ['string', 'dot', 'standard'],
      control: {
        type: 'inline-radio',
      },
    },
    color: {
      options: ['primary', 'inverse'],
      control: {
        type: 'inline-radio',
      },
    },
    size: {
      options: [24],
      control: {
        type: 'inline-radio',
      },
    },
    count: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    showZero: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    className: 'text-black font-semibold',
    children: '받은 응원 메시지',
    variant: 'string',
    count: 999,
  },
};
