import type { Meta, StoryObj } from '@storybook/react';

import EncouragementMessageFormField from './EncouragementMessageFormField';

const meta = {
  title: 'Share/Components/EncouragementMessageFormField',
  component: EncouragementMessageFormField,
  argTypes: {},
} satisfies Meta<typeof EncouragementMessageFormField>;

export default meta;

type Story = StoryObj<typeof EncouragementMessageFormField>;

export const Default: Story = {
  args: {},
};
