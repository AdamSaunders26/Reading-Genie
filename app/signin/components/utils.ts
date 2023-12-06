export const makeArray = (
  obj: Record<string, boolean> | Record<string, string>
): (string | undefined)[] => {
  return Object.keys(obj)
    .map((key) => {
      if (obj[key] === true) {
        return key;
      }
    })
    .filter((i) => i);
};
