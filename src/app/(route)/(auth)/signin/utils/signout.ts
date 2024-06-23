import requestSignOut from '@api/auth/base/signout';

type Props = {
  redirect?: boolean;
  callbackUrl?: string;
};

const signOut = async ({ redirect, callbackUrl }: Props) => {
  return requestSignOut().then(() => {
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
  });
};

export default signOut;
