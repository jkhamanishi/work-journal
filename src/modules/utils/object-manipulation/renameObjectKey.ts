/**
 * Rename a key in an object and preserve its position within the object.
 * @param oldObj - The object to modify.
 * @param oldKey - The name of the key you want to rename.
 * @param newKey - The new name of the key.
 * @returns A new object with the renamed key.
 */
function renameObjectKey<T>(oldObj: Record<string, T>, oldKey: string, newKey: string) {
  if (oldKey !== newKey && oldObj[oldKey] && !oldObj[newKey]) {
    const keys = Object.keys(oldObj);
    return keys.reduce((acc: Record<string, T>, val) => {
      if (val === oldKey) {
        acc[newKey] = oldObj[oldKey];
      } else {
        acc[val] = oldObj[val];
      }
      return acc;
    }, {});
  } else {
    return oldObj;
  }
}


export default renameObjectKey;
