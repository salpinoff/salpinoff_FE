const setLocalItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalItem = <T>(key: string) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const removeLocalItem = (key: string) => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  localStorage.removeItem(key);
};

const removeLocalAll = () => {
  if (typeof window === 'undefined') {
    throw new Error('this method is only allowed in Client-side');
  }

  localStorage.clear();
};

export { getLocalItem, setLocalItem, removeLocalItem, removeLocalAll };
