import { FormControl } from "@angular/forms";

/**
 * Check if input contains only whitespace
 *
 * @export
 * @param {FormControl} control
 * @returns
 */
export function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = String((control.value || '')).trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
