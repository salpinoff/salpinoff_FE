import type { Meta, StoryObj } from '@storybook/react';

import SenderFormField from './SenderFormField';

const meta = {
  title: 'Share/Components/SenderFormField',
  component: SenderFormField,
  argTypes: {},
} satisfies Meta<typeof SenderFormField>;

export default meta;

type Story = StoryObj<typeof SenderFormField>;

export const Default: Story = {
  args: {},
};
