# Roadmap: سازه‌پاد صنعت (قالب صناعی فارسی)

Legend: [ ] todo, [~] in progress, [x] done and verified, [!] blocked
Last updated: 2026-11-19

## Decisions
- Stack: Tailwind CSS v4.3.5 (CSS-first) + esbuild + Vite برای پیش‌نمایش؛ بدون فریمورک.
- Blog: بله (فهرست، دو نوشته، دو آرشیو دسته).
- Dark mode: خیر.
- Languages and direction: فارسی، RTL.
- Palette: فولادی‌آبی `#2b6c88` روی زغالی `#1b2023` و کاغذ `#f6f2ec`.

## Phase 0: Setup and tooling
- [x] T0.1 ساختار مخزن، `source/`، `release/` و اسکریپت‌ها
  - Depends on: none
  - Files: `source/package.json`, `source/src/*`, `release/*`
  - Done when: `npm run build` از پوشه‌ی `source/` بدون خطا اجرا شد (exit 0).
- [x] T0.2 قواعد Prettier، Stylelint و ESLint
  - Done when: `npm run format`، `stylelint` و `eslint` همه بدون خطا اجرا شدند.

## Phase 1: Design system and tokens
- [x] T1.1 توکن‌ها (رنگ، تایپ، فاصله، شعاع، بریک‌پوینت)
  - Done when: همه‌ی رنگ‌ها در `@theme` تعریف شده و در مارک‌آپ هگز خام وجود ندارد.
- [x] T1.2 فونت Vazirmatn سلف‌هاست با preload و `font-display: swap`
  - Done when: فونت روی صفحه اعمال می‌شود (computed `font-family` بررسی شد).

## Phase 2: Shared layout
- [x] T2.1 هدر، نوار تماس، منوی دسکتاپ با زیرمنو و منوی موبایل (`<dialog>`)
  - Done when: منوی موبایل در عرض ۳۹۰px باز می‌شود؛ منوی اصلی در همان عرض پنهان است.
- [x] T2.2 فوتر، خبرنامه‌ی نمایشی و دکمه‌ی شناور تماس
  - Done when: مارک‌آپ هدر/فوتر در ۱۳ صفحه یکسان است (بازبینی شد).

## Phase 3: Pages
- [x] T3.1 `index.html` — همه‌ی بخش‌های مرجع
- [x] T3.2 `pages/about-us.html`
- [x] T3.3 `pages/services.html`
- [x] T3.4 `pages/service-detail.html`
- [x] T3.5 `pages/projects.html`
- [x] T3.6 `pages/project-detail.html`
- [x] T3.7 `pages/contact-us.html`
- [x] T3.8 وبلاگ: فهرست، دو نوشته، دو آرشیو دسته
- [x] T3.9 `404.html`
  - Done when: هر صفحه یک `h1`، عنوان و دیسکریپشن یکتا و canonical دارد (اسکریپت بازبینی).

## Phase 4: JavaScript behavior
- [x] T4.1 هدر چسبان، منوی موبایل، اسلایدر، شمارنده، reveal، دیالوگ ویدئو، اعتبارسنجی فرم
  - Done when: دیالوگ ویدئو باز می‌شود، اسلایدر اسکرول می‌شود و شمارنده مقدار نهایی را نشان می‌دهد.
- [ ] T4.2 آزمون کامل فرم‌ها با ورودی‌های نامعتبر در مرورگر
  - Deferred: نیاز به آزمون تعاملی دستی دارد؛ اعتبارسنجی فقط با بازبینی کد تأیید شد.

## Phase 5: SEO files and schema
- [x] T5.1 robots.txt، sitemap.xml و JSON-LD
  - Done when: همه‌ی بلوک‌های JSON-LD با `JSON.parse` معتبر بودند.

## Phase 6: Performance pass
- [x] T6.1 بیلد مینیفای‌شده، تصاویر AVIF/WebP با ابعاد و lazy-loading
  - Done when: اندازه‌ها اندازه‌گیری شد (نسخه‌ی ۱٫۳٫۰): CSS = 38,765 بایت (gzip 8,436)،
    JS = 7,642 بایت (gzip 2,546)، بزرگ‌ترین فایل هیرو = 147,850 بایت، بزرگ‌ترین تصویر
    دیگر = 98,238 بایت، فونت‌ها = 101,704 بایت (دو فایل).
- [!] T6.2 Lighthouse موبایل روی نسخه‌ی سرو‌شده
  - Blocked: در این محیط اجرا نشد؛ هیچ امتیازی ادعا نمی‌شود.

## Phase 7: Accessibility and RTL pass
- [x] T7.1 skip link، فوکوس مرئی، آکاردئون و دیالوگ بومی، `prefers-reduced-motion`
- [x] T7.2 RTL: `dir="rtl"`، ویژگی‌های منطقی، بدون اسکرول افقی در ۳۹۰ و ۱۴۴۰px
  - Done when: `scrollWidth > clientWidth` در هر دو عرض بررسی و منفی بود.

## Phase 8: QA
- [x] T8.1 بازبینی ساختار: یک `h1` در هر صفحه، alt و ابعاد تصاویر، شناسه‌های یکتا،
      لینک‌ها و لنگرهای موجود، اعتبار JSON-LD
  - Done when: اسکریپت بازبینی با ۱۳ صفحه و صفر خطا اجرا شد.
- [x] T8.3 رفع ایرادهای بازبینی استاندارد: تایپ‌اسکیل، بودجه‌ی تصاویر، اسلایدر، فرم و متای ۴۰۴
  - Done when: `node .cache/validate.mjs` با ۱۳ صفحه و صفر خطا اجرا شد و همه‌ی تصاویر
    زیر بودجه‌ی بخش ۱۱ هستند (هیرو ۱۴۴KB، بقیه ۹۶KB).
- [ ] T8.2 چک‌لیست دستی WCAG و مرورگرهای مختلف
  - Deferred: کنتراست در کد طراحی شده اما با ابزار اندازه‌گیری نشده است.

## Phase 9: Docs and packaging
- [x] T9.1 مستندات `docs/`، `LICENSES.txt` و `CHANGELOG.md`
- [x] T9.2 بسته‌ی `release/` شامل `source/` برای بیلد مجدد
  - Done when: ساختار پوشه با بخش ۴ استاندارد مطابقت دارد.

## Phase 10: Final report
- [x] T10.1 گزارش نهایی با اندازه‌های واقعی و موارد اندازه‌گیری‌نشده

## Decision log
- تایپ‌اسکیل در `@theme` به هشت پله (`micro` تا `title`) و پنج ارتفاع خط فارسی
  تبدیل شد؛ مقادیر دلخواه مارک‌آپ حذف شدند و اختلاف اندازه‌ها حداکثر ۰٫۰۴rem است.
- فالبک WebP اسلاید سوم هیرو به ۱۲۸۰ پیکسل محدود شد تا زیر بودجه‌ی ۱۵۰KB بماند؛
  منبع AVIF همان اسلاید تا ۱۹۲۰ پیکسل می‌ماند.
- فونت در دو فایل با بازه‌ی وزن ارائه شد تا حجم فونت در بودجه بماند.
- چهار صفحه‌ی باقی‌مانده با یک اسکریپت یک‌بارمصرف از همان هدر/فوتر ساخته شدند تا
  مارک‌آپ مشترک عیناً یکسان بماند؛ اسکریپت در بسته نیست.
- کیفیت WebP هیرو به ۴۶ کاهش یافت تا حجم فایل زیر بودجه‌ی ۱۵۰KB بماند.
