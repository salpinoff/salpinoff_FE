import type { Meta, StoryObj } from '@storybook/react';

import FormLabel from '.';

const meta = {
  title: 'Components/Common/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: false,
    },
    className: {
      control: false,
    },
    children: {
      control: 'text',
    },
    required: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '',
    className: '',
    children: 'Form Label',
    required: false,
  },
};
