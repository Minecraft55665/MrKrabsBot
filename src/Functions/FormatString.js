/**
 * @param {string} string
 * @return {string}
 */
export function formatString(string) {
    return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}
