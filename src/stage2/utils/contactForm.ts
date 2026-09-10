const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_MESSAGE_LENGTH = 2000;

export const validateEmail = (email: unknown): boolean => {
  if (typeof email !== "string") return false;

  const normalizedEmail = email.trim().toLowerCase();
  const [localPart, domain, extraPart] = normalizedEmail.split("@");

  return Boolean(
    normalizedEmail.length <= MAX_EMAIL_LENGTH &&
      !extraPart &&
      localPart &&
      localPart.length <= 64 &&
      !localPart.startsWith(".") &&
      !localPart.endsWith(".") &&
      !localPart.includes("..") &&
      domain &&
      EMAIL_PATTERN.test(normalizedEmail)
  );
};

export const validateMessage = (message: unknown): boolean =>
  typeof message === "string" &&
  message.trim().length > 0 &&
  message.length <= MAX_MESSAGE_LENGTH;

export interface ContactFormValidation {
  email: boolean;
  message: boolean;
}

export const validateContactForm = (
  email: unknown,
  message: unknown
): ContactFormValidation => ({
  email: validateEmail(email),
  message: validateMessage(message),
});
