/**
 * Inserts a key-value pair into a specific position in a object.
 * @param newKey - The new key to insert.
 * @param newValue - The new value to insert.
 * @param obj - The object to modify.
 * @param insertIndex - The position in the object to insert the new pair into.
 * @returns A new object.
 */
function insertKeyValuePair(newKey: string, newValue: any, obj: object, insertIndex: number){
  const keyValues = Object.entries(obj);
  keyValues.splice(insertIndex, 0, [newKey, newValue]);
  return Object.fromEntries(keyValues);
}


export default insertKeyValuePair;
