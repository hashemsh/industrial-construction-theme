# راهنمای قالب سازه‌پاد صنعت

قالب استاتیک فارسی (RTL) برای شرکت‌های ساخت‌وساز و صناعی. فایل‌ها بدون بیلد و مستقیماً از
دیسک باز می‌شوند.

## شروع سریع

1. پوشه را باز کنید و `index.html` را در مرورگر باز کنید.
2. برای انتشار، کل پوشه را روی هر هاست استاتیک (Nginx، Apache، Netlify، Cloudflare Pages)
   آپلود کنید.
3. برای تغییر محتوا فایل‌های HTML را ویرایش کنید؛ جزئیات در `docs/editing.md`.

## ساختار

```text
index.html
404.html
pages/
  about-us.html
  services.html
  service-factory.html
  service-warehouse.html
  service-civil.html
  service-detail.html
  projects.html
  projects-page-2.html
  project-detail.html
  faq.html
  certifications.html
  privacy-policy.html
  terms.html
  thanks.html
  contact-us.html
  blog/
    index.html
    page-2.html
    post-1.html
    post-2.html
    post-3.html
    author.html
    category-industrial.html
    category-safety.html
assets/
  css/style.min.css
  js/main.js
  images/
  fonts/
source/          # ابزار بیلد (فقط اگر بخواهید ظاهر را تغییر دهید)
docs/
robots.txt
sitemap.xml
feed.xml
LICENSES.txt
CHANGELOG.md
```

همه‌ی مسیرها نسبی هستند؛ قالب از هر پوشه‌ای و حتی با `file://` کار می‌کند.

صفحه‌های فرعی: سه صفحه‌ی خدمت مستقل (`service-factory`، `service-warehouse`، `service-civil`)،
فهرست پرسش‌های متداول، مدارک و استانداردها، حریم خصوصی، قوانین و مقررات، صفحه‌ی تشکر
(`noindex`)، آرشیو پروژه‌ها در صفحه‌ی دوم، صفحه‌ی دوم وبلاگ و صفحه‌ی نویسنده. `feed.xml`
فید Atom وبلاگ است و در متای صفحات وبلاگ پیوند دارد.

## مستندات

- `docs/editing.md` — ویرایش متن، هدر، فوتر و صفحات
- `docs/customize.md` — تغییر رنگ‌ها، فونت و بیلد مجدد
- `docs/placeholders.md` — فهرست داده‌های نمونه و دامنه‌ی جای‌گزین
- `docs/forms-and-server.md` — فرم‌های نمایشی، تنظیمات سرور و پرفورمنس

## مرورگرها

Chrome، Edge، Firefox و Safari نسخه‌های اخیر. ویژگی‌های جدید فقط به‌عنوان بهبود تدریجی
استفاده شده‌اند؛ بدون جاوااسکریپت هم همه‌ی محتوا خوانده می‌شود.
