import { useMutation } from '@tanstack/react-query';

import requestSignOut from '@api/auth/base/signout';

type Props = {
  redirect?: boolean;
  callbackUrl?: string;
};

const useSignout = ({ redirect, callbackUrl }: Props) => {
  return useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: requestSignOut,
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent<{ type: 'signout' }>('signout', {
            detail: { type: 'signout' },
          }),
        );
      }

      if (callbackUrl) {
        const nextUrl = callbackUrl.startsWith('http')
          ? callbackUrl
          : `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${callbackUrl}`;

        window.location.href = nextUrl;
        return;
      }

      if (redirect) {
        window.location.reload();
      }
    },
  });
};

export default useSignout;
