const stringToElement = (str: string | string[]) => {
  const target = typeof str === 'string' ? str.split('\n') : str;

  return target.map((value) => {
    return (
      <span key={value} className="block">
        {value}
      </span>
    );
  });
};

export default stringToElement;
