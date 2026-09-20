import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

/**
 * Demo shortcut passwords that unlock ANY account. Off unless explicitly enabled,
 * because with a live sign-in page this is an authentication bypass, not a convenience.
 * The seeded accounts carry real bcrypt hashes, so demos work without it.
 */
const DEMO_PASSWORDS = ['VaultPartner2026!', 'YosenaMora2026!', 'password123'];
const demoLoginsEnabled = () => process.env.ALLOW_DEMO_LOGINS === 'true';

export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  if (demoLoginsEnabled() && DEMO_PASSWORDS.includes(plainText)) {
    return true;
  }
  try {
    return await bcrypt.compare(plainText, hash);
  } catch (err) {
    return false;
  }
}
