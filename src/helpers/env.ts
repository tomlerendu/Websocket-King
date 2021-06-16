const env = (name: string): string | boolean | number | undefined => {
  const value = process.env[`REACT_APP_${name}`];

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value === 'null') {
    return undefined;
  }

  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }

  return value;
};

export default env;
