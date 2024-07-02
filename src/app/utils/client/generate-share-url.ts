/* eslint-disable no-console */
const generateShareUrl = (id: string) => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_DOMAIN_NAME);
    url.pathname = `monster/${id}/share`;

    return url.toString();
  } catch (err) {
    console.error(err);
  }

  return null;
};

export default generateShareUrl;
