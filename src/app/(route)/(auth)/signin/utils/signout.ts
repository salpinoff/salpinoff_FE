import requestSignOut from '@api/auth/base/signout';

type Props = {
  redirect?: boolean;
  callbackUrl?: string;
};

const signOut = async ({ redirect, callbackUrl }: Props) => {
  return requestSignOut().then(() => {
    if (callbackUrl) {
      window.location.href = callbackUrl;
      return;
    }

    if (redirect) {
      window.location.reload();
    }
  });
};

export default signOut;
