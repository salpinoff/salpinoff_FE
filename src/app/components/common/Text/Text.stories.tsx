import type { Meta, StoryObj } from '@storybook/react';

import BaseText from './BaseText';
import { FONT_TYPES, FONT_WEIGHTS } from './Text.constants';

const meta = {
  title: 'Components/Common/Text',
  component: BaseText,
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: false,
      table: {
        defaultValue: {
          summary: '<p>',
        },
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'body-1',
        },
      },
      options: FONT_TYPES,
      control: {
        type: 'select',
      },
    },
    weight: {
      table: {
        defaultValue: {
          summary: 'regular',
        },
      },
      options: FONT_WEIGHTS,
      control: {
        type: 'select',
      },
    },
    align: {
      options: ['center', 'justify', 'left', 'right'],
      control: {
        type: 'inline-radio',
      },
    },
    decoration: {
      options: ['none', 'underline', 'overline', 'lineTrough'],
      control: {
        type: 'inline-radio',
      },
    },
    overflow: {
      options: ['truncate', 'ellipsis', 'clip'],
      control: {
        type: 'inline-radio',
      },
    },
    wrap: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
      options: [true, false],
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof BaseText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    variant: 'display-1',
    weight: 'bold',
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    decoration: 'none',
  },
};
