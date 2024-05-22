import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: false,
    },
    variant: {
      table: {
        defaultValue: {
          summary: '"primary"',
        },
      },
      options: ['primary', 'secondary', 'ghost'],
      control: {
        type: 'inline-radio',
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: '"medium"',
        },
      },
      options: ['small', 'medium', 'large'],
      control: {
        type: 'inline-radio',
      },
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    grouped: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary Button',
  },
};

export const SecondaryButton: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Secondary Button',
  },
};

export const GhostButton: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    children: 'Ghost Button',
  },
};
