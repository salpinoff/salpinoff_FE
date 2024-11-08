import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useEffect, useState, useCallback } from 'react';

const useQueryString = <T extends string>(
  name: string,
  defaultValue?: T,
): [string, (v: T) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState(searchParams.get(name) ?? defaultValue);

  const setQueryString = useCallback(
    (value: T) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, `${value}`);
      router.push(`${pathname}?${params.toString()}`);

      setState(value);
    },
    [name, pathname, router, searchParams],
  );

  useEffect(() => {
    setState(searchParams.get(name) ?? defaultValue);
  }, [name, defaultValue, searchParams]);

  return [state ?? '', setQueryString];
};

export default useQueryString;
