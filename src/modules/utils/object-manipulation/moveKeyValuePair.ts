/**
 * Moves a key-value pair into a specific position in a object.
 * @param obj - The object to modify.
 * @param key - The property key to move.
 * @param newIndex - The position in the object to move the new pair to.
 * @returns A new object.
 */
export function moveKeyValuePair<T>(obj: Record<string, T>, key: string, newIndex: number) {
  const keyValues = Object.entries(obj);
  const initialIndex = keyValues.map(([key]) => key).indexOf(key);
  if ( initialIndex == -1 ) {
    return obj;
  }
  const value = obj[key];
  keyValues.splice(initialIndex, 1);
  keyValues.splice(newIndex, 0, [key, value]);
  return Object.fromEntries(keyValues);
}

export function moveUpKeyValuePair<T>(obj: Record<string, T>, key: string, increment: number) {
  const keyValues = Object.entries(obj);
  const initialIndex = keyValues.map(([key]) => key).indexOf(key);
  if ( initialIndex == -1 ) {
    return obj;
  }
  const value = obj[key];
  keyValues.splice(initialIndex, 1);
  keyValues.splice(Math.max(0, initialIndex-increment), 0, [key, value]);
  return Object.fromEntries(keyValues);
}
