export function capitalizeFirstLetter(str: string) {
  return str
    ? str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
    : str;
}

/**
 * Converts an enumValue with camelCase or underscore_case to a readable format.
 *
 * @param {string} value - The enum value to convert.
 * @param {boolean} capitalizeFirstWordOnly - Whether to capitalize only the first word of the converted value. Default is true.
 * @returns {string} - The converted enum value in a readable format with spaces and proper capitalization.
 *
 * @example
 * let enumValue = "IN_PROGRESS";
 * let readableValue = toReadableFormat(enumValue);
 * console.log(readableValue); // "In Progress"
 */
export function toReadableFormat(
  enumValue: string | undefined,
  capitalizeFirstWordOnly = true,
) {
  if (!enumValue) {
    return '';
  }
  let spacedValue = enumValue.replace(/([a-z])([A-Z])/g, '$1 $2');
  spacedValue = spacedValue.replace(/_/g, ' ');

  if (!capitalizeFirstWordOnly) {
    spacedValue = spacedValue
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else {
    let firstWord = capitalizeFirstLetter(
      spacedValue.substr(0, spacedValue.indexOf(' ')),
    );
    firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    spacedValue = firstWord.trim()
      ? firstWord + spacedValue.substr(spacedValue.indexOf(' '))
      : capitalizeFirstLetter(spacedValue);
  }

  return spacedValue;
}
