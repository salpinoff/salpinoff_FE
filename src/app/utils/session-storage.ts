const setSessionItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionItem = <T>(key: string) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const removeSessionItem = (key: string) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  sessionStorage.removeItem(key);
};

const removeSessionAll = () => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  sessionStorage.clear();
};

export { getSessionItem, setSessionItem, removeSessionItem, removeSessionAll };
