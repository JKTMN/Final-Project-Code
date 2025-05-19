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

export const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
};


export const validImageURL = (str) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

    if (!validURL(str)) return false;

    try {
        const url = new URL(str);
        const pathname = url.pathname.toLowerCase();
        return validExtensions.some(ext => pathname.endsWith(ext));
    } catch (error) {
        console.error('Error validating image URL:', error);
        return false;
    }
};