// Simple encryption/decryption functions
// In a production environment, use a proper encryption library and secure key management
export function encrypt(text: string): string {
  const buffer = Buffer.from(text, 'utf8');
  return buffer.toString('base64');
}

export function decrypt(text: string): string {
  const buffer = Buffer.from(text, 'base64');
  return buffer.toString('utf8');
}