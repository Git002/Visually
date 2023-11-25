export function random(length: number, numbers: boolean = false, special_char: boolean = false): string {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) {
    charset += '0123456789';
  }
  if (special_char) {
    charset += '!@#$%^&*()_+[]{}|;:,.<>?';
  }

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}
