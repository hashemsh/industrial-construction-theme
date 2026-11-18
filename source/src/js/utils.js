const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts ASCII digits to Persian digits for visible text only.
 */
export const toPersianDigits = (value) =>
  String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
