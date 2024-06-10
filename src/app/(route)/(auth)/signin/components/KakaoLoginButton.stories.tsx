import type { Meta, StoryObj } from '@storybook/react';

import KakaoLoginBtn from './kakao-login-btn';

const meta = {
  title: 'SignIn/components/KakaoLoginBtn',
  component: KakaoLoginBtn,
  argTypes: {
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof KakaoLoginBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
