# Seven Excellent — OpenCode Master Implementation Prompt

You are building the official website for Class 7E / Seven Excellent, SMPN 203 Jakarta.

This is a real class website, not a generic school template.

## 1. Inspect first

Before coding, inspect:
- repository structure
- package.json
- framework
- dependencies
- routing
- components
- styling
- fonts
- images
- metadata
- existing pages
- configuration

Read:
- `docs/PRD.md`
- `docs/DESIGN.md`
- `docs/OPENCODE-PROMPT.md`
- `.opencode/AGENTS.md` if present

Do not start coding blindly.

## 2. Skills

Use the installed:
- UI/UX Pro Max
- Taste Skill
- Ponytail

Combine them with engineering judgment.

## 3. References

Explore MotionSites:
https://motionsites.ai/

Explore React Bits:
https://reactbits.dev/get-started/index

Use them as references, not templates. Do not copy layouts, copywriting, branding, or proprietary designs.

## 4. Real class data

Exactly 36 students exist.

01 Abdur Rahman Rohmi
02 Adni Ziva Kusuma
03 Airin Mariska Mursalim
04 Alfira Aulia Jasmine
05 Anindhyta Syareefa Kirani
06 Atika Zahra Ratifa
07 Chyntiara Kenisha Azkia
08 Desta Ar Rofhi
09 Fajriel Al Fathul Khair
10 Hana Zhafira
11 Irfa Bima Aristian
12 Jibran Rizqi Putranda
13 Kanaya Salsabila Zahrani
14 Khalisya Khairani
15 Lingga Fathan Adzuhri
16 Lubna Nafiah Askanah
17 Maulana Aliffian — Class President
18 Mawar Raniah Melano
19 Mezha Banyu Prakoso
20 Muhammad Abrisyam Ahlam
21 Muhammad Faizal Putra
22 Muhammad Kanz Pribadi
23 Muhammad Nazril Alkahfi
24 Muhammad Sahl Kairuzzabadi Sanusi
25 Muhammad Salim Al-Haddad
26 Neng Cahya
27 Raditya Alvino Kurniawan
28 Rafardhan Athala
29 Sakti Anugrah Puttra Fadillah
30 Shafiyah Adeeva Farzana
31 Syadinda Raisa Hakim
32 Syifa Yasmine Shidqia
33 Talita Zahra
34 Widya Wijayanti
35 Zabba Intan Nuraini
36 Zidane Mustofa Ramadhan

Homeroom Teacher: Yohanes Christian.

Never invent student details, achievements, events, photographs, social accounts, or statistics.

## 5. Visual standard

Build a premium, editorial, youthful, authentic experience.

Avoid AI-slop aesthetics:
- excessive gradients
- excessive glass
- excessive glow
- giant rounded cards
- random blobs
- meaningless 3D
- particle spam
- fake testimonials
- fake logos
- generic SaaS copy

## 6. Hero

CTA must be above the fold.

Include:
- 7E identity
- SMPN 203 Jakarta
- strong headline
- concise copy
- primary CTA
- secondary CTA
- meaningful dimensional visual

## 7. 3D

Include at least one meaningful dimensional visual related to Seven Excellent.

Use the lightest viable technology. CSS 3D is preferable when sufficient; use React Three Fiber/Three.js only when justified.

## 8. Pages

Implement:
- `/`
- `/students`
- `/students/[id]`
- `/about`
- `/gallery`
- `/schedule`
- `/privacy`
- `/terms`
- custom 404

## 9. Images

Prepare asset structure:
- `public/images/students/`
- `public/images/gallery/`
- `public/images/branding/`
- `public/og/`

Student records should support:
```ts
photo?: string
```

Do not use random stock people as real students.

## 10. SEO

Implement:
- title
- description
- canonical
- Open Graph
- Twitter/X metadata
- favicon
- sitemap
- robots.txt

Production domain:
`https://sevenexcellent203.zone.id`

## 11. Accessibility

Verify:
- semantic HTML
- keyboard navigation
- focus states
- contrast
- alt text
- heading hierarchy
- reduced motion

## 12. Performance

Optimize images, minimize unnecessary client-side JavaScript, avoid dependency spam, and ensure 3D does not damage performance.

## 13. Responsive

Design and test:
375, 390, 430, 768, 1024, 1280, 1440px.

Mobile must be intentionally designed.

## 14. QA

Before completion:
- lint
- typecheck
- build
- inspect browser console
- test routes
- test links
- test 404
- test metadata
- test sitemap
- test robots
- test mobile
- test keyboard
- test reduced motion

Do not declare complete while the build is broken or obvious visual/functional issues remain.

## Final standard

The result should feel like:
Senior frontend engineering + senior visual design + authentic Seven Excellent identity.

Do not optimize for adding effects.

Optimize for deliberate design.
