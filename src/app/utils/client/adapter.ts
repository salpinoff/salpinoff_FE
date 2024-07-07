export const Adapter = (() => {
  const from = <Source>(originData: Source) => {
    const to = <Output>(mapperFn: (value: Source) => Output) =>
      mapperFn(originData);

    return { to };
  };

  return { from };
})();
