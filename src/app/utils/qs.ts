const qs = <T extends string>(url: string) => {
  const queryStringIndex = url.indexOf('?');
  const queryString =
    queryStringIndex !== -1 ? url.slice(queryStringIndex + 1) : '';

  const params = {} as Record<T, string>;
  queryString.split('&').forEach((pair) => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    params[key as T] = value;
  });

  return params;
};

export default qs;
