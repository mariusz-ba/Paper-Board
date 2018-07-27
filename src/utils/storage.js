/**
 * Dumps state to localstorage
 * @param {string} key Name of key in localstorage that state will be assigned to
 * @param {object} state State that will be saved in localstorage
 */
export const dump = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
}

/**
 * Loads state from localstorage
 * @param {string} key Name of key in localstorage that state is assigned to
 */
export const load = (key) => {
  return JSON.parse(localStorage.getItem(key));
}