/* eslint-disable no-console */
const generateShareUrl = (
  endpoint: string,
  params?: { [k in string]: string },
) => {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_DOMAIN_NAME;

  try {
    const url = new URL(baseUrl);
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
