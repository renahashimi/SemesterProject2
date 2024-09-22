/**
 * Saves a value in local storage under the specified key.
 * 
 * @function save
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to be stored. It will be converted to a JSON string.
 * @returns {void}
 * 
 * @example
 * save("userSettings", { theme: "dark", notifications: true });
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
* Loads a value from local storage by the specified key.
* 
* @function load
* @param {string} key - The key for the value to be retrieved.
* @returns {*} The parsed value if found; returns null if the key does not exist or if an error occurs.
* 
* @example
* const settings = load("userSettings");
*/
export function load(key) {
  try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
  } catch {
      return null;
  }
}

/**
* Removes a value from local storage by the specified key.
* 
* @function remove
* @param {string} key - The key of the value to be removed.
* @returns {void}
* 
* @example
* remove("userSettings");
*/
export function remove(key) {
  localStorage.removeItem(key);
}
