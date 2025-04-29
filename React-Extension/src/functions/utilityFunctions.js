/**
 * This function removes hyphens from strings.
 * 
 * @param {*} str - The string from which to remove hyphens.
 * @returns The string with hyphens removed.
 * 
 * @see https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
 */
export const removeHyphen = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/-/g, " ");
};

export const removeScheme = (str) => {
    return str.replace(/(^\w+:|^)\/\/|www\./g, '').replace(/\/+$/g, '');
};