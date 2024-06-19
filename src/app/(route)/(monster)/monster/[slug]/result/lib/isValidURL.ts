const isValidURL = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (err) {
    return false;
  }
};

export default isValidURL;
