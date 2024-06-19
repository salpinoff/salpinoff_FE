/* eslint-disable no-console */
const generateShareUrl = (
  endpoint: string,
  params?: { [k in string]: string },
) => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_DOMAIN_NAME);
    url.pathname = endpoint;

    if (params)
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    return url.toString();
  } catch (err) {
    console.error(err);
  }

  return null;
};

export default generateShareUrl;
