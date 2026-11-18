const setError = (field, message) => {
  field.classList.toggle('is-invalid', Boolean(message));
  const error = field.querySelector('[data-error]');
  const control = field.querySelector('input, textarea, select');

  if (error) error.textContent = message ?? '';
  if (control) {
    if (message) control.setAttribute('aria-invalid', 'true');
    else control.removeAttribute('aria-invalid');
  }
};

const validateField = (field) => {
  const control = field.querySelector('input, textarea, select');
  if (!control) return true;

  const value = control.value.trim();
  const label = control.dataset.label ?? 'این فیلد';

  if (control.required && !value) {
    setError(field, `${label} را تکمیل کنید.`);
    return false;
  }

  if (control.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    setError(field, 'ایمیل را در قالب name@example.com وارد کنید.');
    return false;
  }

  if (control.type === 'tel' && value && !/^[0-9۰-۹+\-\s()]{7,}$/.test(value)) {
    setError(field, 'شماره تماس معتبر نیست.');
    return false;
  }

  if (control.minLength > 0 && value.length < control.minLength) {
    setError(field, `${label} باید حداقل ${control.minLength} نویسه باشد.`);
    return false;
  }

  setError(field, '');
  return true;
};

/**
 * Demo-only forms: validation runs in the browser and nothing is sent anywhere.
 */
export const initForms = () => {
  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const fields = Array.from(form.querySelectorAll('.field'));
      const valid = fields.map(validateField).every(Boolean);

      if (!valid) {
        form.querySelector('.field.is-invalid input, .field.is-invalid textarea')?.focus();
        if (status) status.textContent = 'لطفاً خطاهای مشخص‌شده را اصلاح کنید.';
        return;
      }

      form.reset();
      if (status) {
        status.textContent =
          'این فرم نمایشی است و اطلاعاتی ارسال نشد. برای فعال کردن آن، آدرس سرویس فرم را در مستندات ببینید.';
      }
    });

    form.querySelectorAll('.field').forEach((field) => {
      const control = field.querySelector('input, textarea, select');
      control?.addEventListener('blur', () => validateField(field));
    });
  });
};
