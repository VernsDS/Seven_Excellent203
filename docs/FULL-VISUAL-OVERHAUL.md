# SEVEN EXCELLENT — FULL VISUAL OVERHAUL

## IMPORTANT

The previous implementation is NOT good enough.

Do not treat this as a small polish task.

The current website needs a serious visual and interaction redesign.

The goal is to transform the existing website into a premium, highly visual, memorable digital home for:

**7E — Seven Excellent**
**SMPN 203 Jakarta**

The result should feel like a carefully designed digital yearbook / class archive, not a school template, SaaS dashboard, or collection of copied UI components.

You have permission to substantially redesign the homepage and its visual system while preserving the existing working architecture and factual data.

---

# 1. INSPECT THE EXISTING REPOSITORY FIRST

Repository:

`VernsDS/Seven_Excellent203`

The repository is already a Next.js project.

Current structure includes:

* `app/`
* `components/`
* `components/ui/`
* `lib/students.ts`
* `public/`
* `docs/`
* `.opencode/`
* TypeScript
* Tailwind
* Next.js

Do NOT create a new project.

Do NOT replace the existing repository architecture unnecessarily.

Before changing anything:

1. Read `README.md`.
2. Read `docs/PRD.md`.
3. Read `docs/DESIGN.md`.
4. Read `docs/OPENCODE-PROMPT.md` if present.
5. Read `.opencode/AGENTS.md`.
6. Read `STUDENT-SHOWCASE-INTEGRATION.md`.
7. Inspect `app/page.tsx`.
8. Inspect `app/layout.tsx`.
9. Inspect `app/globals.css`.
10. Inspect `lib/students.ts`.
11. Inspect every component currently used by the homepage.
12. Inspect existing assets under `public/`.
13. Inspect `package.json`.
14. Inspect current dependencies.

Understand what already exists before editing.

---

# 2. DO NOT PRESERVE THE CURRENT VISUAL DESIGN JUST BECAUSE IT EXISTS

The current visual result is not the target.

If the current homepage looks generic, rebuild its composition.

Do not simply:

* change colors
* increase border radius
* add gradients
* add more shadows
* add another animation
* paste another component

That is not a redesign.

We need a new visual direction.

---

# 3. DESIGN DIRECTION

Create a visual identity around:

### DIGITAL YEARBOOK × EDITORIAL ARCHIVE × MODERN CLASS WEBSITE

The site should communicate:

* people
* memories
* class identity
* school
* youth
* personality
* 7E identity
* 36 students
* SMPN 203 Jakarta

It should feel personal rather than corporate.

It should feel premium without looking expensive for the sake of being expensive.

It should feel modern without becoming a generic AI-generated landing page.

---

# 4. VISUAL PRINCIPLES

Use:

* strong typography
* large editorial type
* asymmetrical layouts where appropriate
* carefully controlled negative space
* image-led sections
* subtle borders
* depth
* layered composition
* intentional scroll choreography
* responsive layouts
* restrained color palette
* meaningful motion

Avoid:

* generic 3-card sections
* excessive rounded rectangles
* excessive glassmorphism
* random glowing blobs
* random particles
* random 3D spheres
* excessive neon
* giant gradients
* generic SaaS hero sections
* fake testimonials
* fake statistics
* fake achievements
* stock photos of random people
* meaningless animations

---

# 5. THE HOMEPAGE SHOULD FEEL LIKE A JOURNEY

Do not make every section look like a separate card.

The homepage should have a visual narrative.

Suggested flow:

1. HERO
2. CLASS IDENTITY / LOGO REVEAL
3. STUDENT ARCHIVE / COVERFLOW
4. CLASS INFORMATION
5. GALLERY / MEMORIES
6. SCHEDULE
7. ABOUT 7E
8. FINAL CTA
9. FOOTER

But you may change the order if the composition becomes stronger.

---

# 6. HERO — REBUILD IT

The hero needs to immediately communicate:

**SEVEN EXCELLENT**

**7E**

**SMPN 203 JAKARTA**

The hero should not look like:

"Welcome to our class website"

with a generic button underneath.

Use strong editorial typography.

Possible visual treatment:

* huge "7E"
* layered typography
* class identity
* subtle image texture
* class logo
* dimensional depth
* controlled motion

The hero must have a clear CTA above the fold.

Possible CTA:

`MEET THE CLASS`

Secondary:

`EXPLORE 7E`

But choose final wording based on the visual composition.

---

# 7. REAL SCROLL ANIMATION — MANDATORY

The previous implementation failed here.

This time, scroll animation must be a CORE part of the design.

Do NOT simply use:

```css
animation: fadeIn;
```

for every section.

Do NOT animate everything when the page loads.

Animations must react to the user's scroll position.

---

# 8. SCROLL CHOREOGRAPHY

Build several meaningful scroll sequences.

### Sequence A — CLASS IDENTITY

As the user scrolls into the section:

Initial:

* class logo is positioned off-screen toward the LEFT
* logo slightly rotated / offset in depth
* text is offset
* section has visual tension

As the section enters viewport:

* logo travels smoothly from LEFT → CENTER/FINAL POSITION
* rotation settles naturally
* scale settles
* text follows shortly afterward
* typography reveals through opacity + transform
* supporting line appears last

The motion should feel like a physical editorial composition entering the page.

NOT:

`translateX(-50px)`

and done.

Make the distance, duration, easing and sequencing feel intentional.

---

# 9. SCROLL-DRIVEN LOGO MOVEMENT

For the class identity section, prefer true scroll-linked progress if the project's animation stack supports it.

The animation should respond to scroll progress rather than only triggering once.

Conceptually:

```text
scroll progress 0%
logo far left
text hidden

scroll progress 30%
logo entering
text beginning to appear

scroll progress 60%
logo approaching final position
text becoming readable

scroll progress 100%
logo and text fully composed
```

If using Motion / Framer Motion is already appropriate, use its scroll APIs.

If not, implement a lightweight IntersectionObserver + requestAnimationFrame / scroll-progress solution.

Do not introduce a massive animation framework unnecessarily.

---

# 10. SECONDARY SCROLL EFFECTS

Use scroll animation elsewhere, but selectively.

Examples:

### Typography

Large text can:

* move slightly
* reveal by line
* shift horizontally
* clip/reveal
* change opacity based on scroll

### Images

Images can:

* scale subtly
* move vertically at a very low parallax rate
* reveal through clipping masks

### Section transitions

Sections can:

* overlap slightly
* transition through background changes
* use pinned compositions where justified

Do not animate every component.

The goal is choreography, not motion overload.

---

# 11. MOBILE SCROLL BEHAVIOR

This is mandatory.

Do NOT design desktop animation and then simply disable it on mobile.

Mobile must have its own animation values.

Mobile:

* smaller movement distances
* shorter sequences
* no horizontal overflow
* no giant pinned sections that make scrolling frustrating
* no expensive blur effects
* no animation that blocks touch scrolling

Test:

* 320px
* 375px
* 390px
* 430px
* tablet
* desktop
* large desktop

---

# 12. REDUCED MOTION

Respect:

`prefers-reduced-motion`

When enabled:

* remove large translations
* remove parallax
* remove unnecessary rotation
* content remains immediately visible
* interaction remains functional

---

# 13. CLASS LOGO

Use the actual Seven Excellent class logo.

Reference:

`https://imgur.com/a/m2MgtlK`

Do not create a fake replacement logo.

Prefer storing the actual image locally under:

`public/images/branding/`

Use an optimized format if possible.

The logo should become part of the visual language rather than being randomly placed in the navbar.

---

# 14. FAVICON — IMPORTANT

Use the actual class photo/logo asset as the favicon.

Do NOT keep the default Next.js favicon.

Inspect the existing:

`app/favicon.ico`

and replace it appropriately.

Prefer a proper square crop of the class logo/photo.

If the source image is not available locally, prepare the correct asset path and do not invent another logo.

Also ensure metadata contains the correct site identity.

---

# 15. STUDENT ARCHIVE — REBUILD IT

The student section is one of the main visual features of the website.

It should feel like:

### A DIGITAL YEARBOOK

not:

### A LIST OF CARDS

Use the 36 real students from:

`lib/students.ts`

Do not duplicate the dataset.

---

# 16. 3D STUDENT COVERFLOW

The coverflow concept is still wanted.

However, the previous implementation looked like an empty animation/demo.

Fix that.

The active student should feel like the focus of the page.

Desktop:

* large active portrait
* two neighboring students visible
* strong depth
* perspective
* controlled rotation
* layered cards
* clear active state

Mobile:

* active portrait dominates
* neighboring cards only slightly visible
* swipe gestures
* no horizontal overflow

The carousel should feel like a physical collection of class portraits.

---

# 17. STUDENT CARD CONTENT

Each active card should contain:

Student name

Example:

`MAULANA ALIFFIAN`

Then:

`ABSEN 17`

And:

`CLASS PRESIDENT`

For normal students:

`ABSEN 01`

`STUDENT`

Do not add fake biographies.

Do not invent hobbies.

Do not invent achievements.

---

# 18. MISSING STUDENT PHOTOS

This is extremely important.

If a student does not have a photo:

DO NOT:

* remove the card
* hide the student
* use a random person
* use a fake AI face
* use a random Unsplash portrait

Instead create a designed placeholder.

Example concept:

`PHOTO COMING SOON`

and:

`Hi, jika kamu merasa kamu adalah murid 7E, kamu bisa menghubungi Rafa untuk menambahkan foto kamu di sini.`

Make this visually integrated into the portrait.

It should look intentional and premium.

---

# 19. STUDENT CARD VISUAL SYSTEM

Use:

* portrait crop
* dark image treatment
* typography overlay
* subtle class number
* small 7E branding
* absent number
* role
* subtle border
* controlled shadow

Do not use enormous pills.

Do not use 5 different badges.

---

# 20. STUDENT NAVIGATION

If `/students/[id]` exists:

allow the active student to navigate to their profile.

If needed:

`VIEW PROFILE →`

Use the existing student detail route.

Do not break it.

---

# 21. STUDENT SECTION INTRO

Create a strong editorial intro before the carousel.

For example:

`THE PEOPLE OF 7E`

Then:

`36 students. One class archive.`

But do not blindly use this copy.

Write something natural that fits a real Indonesian SMP class.

The section should explicitly identify:

`7E`
`SMPN 203 JAKARTA`

---

# 22. CLASS IDENTITY SECTION

Create a major section around:

**7E**

**SEVEN EXCELLENT**

**SMPN 203 JAKARTA**

Use the class logo.

This section should be one of the most visually memorable parts of the homepage.

Suggested composition:

LEFT:
large logo

RIGHT:
large typography

or:

logo moving from left into a centered editorial composition

with text following it.

This section is where the scroll choreography should be most obvious.

---

# 23. GALLERY

Rework the gallery section so it does not look like a standard image grid.

Use an editorial masonry / asymmetric composition.

Real class photos should be used when available.

If photos are not available:

use intentional placeholders.

Do not use random people photographs.

Potential interaction:

* image hover scale
* slight reveal
* caption
* subtle parallax

Keep it restrained.

---

# 24. SCHEDULE

The schedule should feel integrated into the visual language.

Do not make it look like a boring HTML table.

Use:

* strong day labels
* clean timetable hierarchy
* typography
* subtle separators
* responsive horizontal/vertical layout

But prioritize readability over visual effects.

---

# 25. ABOUT

The About section must sound like a real class website.

Avoid:

"One classroom. One journey."

Avoid generic AI-generated school slogans.

Use factual information:

* 7E
* Seven Excellent
* SMPN 203 Jakarta
* 36 students
* class teacher: Yohanes Christian

Nothing fictional.

---

# 26. NAVIGATION

Create a clean premium navigation.

Desktop:

* logo / 7E
* Students
* Gallery
* Schedule
* About
* primary CTA

Mobile:

* compact
* accessible
* no oversized menu
* smooth open/close animation

Navbar should become more compact / visually distinct after scrolling if that improves the experience.

---

# 27. TYPOGRAPHY

The typography needs a serious upgrade.

Do not use default typography everywhere.

Use a strong display font + highly readable body font.

Do not use 5 fonts.

Prefer:

* one expressive display face
* one clean body face
* optional monospace for tiny metadata

Typography should create hierarchy even before images are considered.

---

# 28. COLOR SYSTEM

Create a coherent color system.

Start from:

* deep black / near-black
* warm/off-white
* graphite
* one distinctive accent inspired by the class identity/logo

Do not turn the website into a neon purple/blue AI site.

Color should feel intentional.

---

# 29. DEPTH

The site should feel dimensional.

Use depth through:

* layering
* perspective
* image overlap
* typography scale
* shadows
* subtle blur
* foreground/background relationships

Do not add random 3D objects.

Do not add random floating cubes.

Do not add random particles.

---

# 30. PAGE TRANSITIONS

If appropriate, add subtle transitions between major sections.

Do not create long cinematic transitions that make the site annoying.

Performance comes first.

---

# 31. PERFORMANCE

This website must remain fast.

Avoid:

* huge background videos
* enormous images
* unnecessary WebGL
* excessive blur
* expensive scroll handlers
* dozens of simultaneous animations

Use:

* CSS transforms
* opacity
* IntersectionObserver
* requestAnimationFrame when needed
* Motion only where it provides meaningful value

Never animate layout-heavy properties unnecessarily.

Prefer:

`transform`

`opacity`

over:

`top`

`left`

`width`

`height`

for continuous animation.

---

# 32. ACCESSIBILITY

Maintain:

* keyboard navigation
* visible focus states
* semantic HTML
* meaningful alt text
* accessible buttons
* accessible navigation
* reduced-motion support

Do not make visual effects interfere with accessibility.

---

# 33. SEO / METADATA

Review `app/layout.tsx`.

Ensure:

* correct title
* description
* canonical URL
* Open Graph metadata
* Twitter metadata
* favicon
* class identity

Production domain:

`https://sevenexcellent203.zone.id`

Do not leave default Next.js metadata.

Do not leave:

"Create Next App"

or similar defaults anywhere.

---

# 34. REMOVE DEFAULT NEXT.JS REMNANTS

Search the project for:

* Create Next App
* Geist default boilerplate
* Next.js starter text
* default favicon
* default metadata
* generic README content visible to users
* placeholder sections
* unnecessary demo components

Remove or replace them.

---

# 35. COMPONENT QUALITY

Keep components reusable.

Suggested structure:

```text
components/
├── ui/
│   ├── student-coverflow.tsx
│   ├── class-identity.tsx
│   ├── scroll-reveal.tsx
│   └── ...
├── home/
│   ├── hero.tsx
│   ├── student-showcase.tsx
│   ├── gallery-preview.tsx
│   ├── schedule-preview.tsx
│   └── ...
```

Do not create huge 1000-line components if the logic can be separated cleanly.

---

# 36. DATA

Continue using:

`lib/students.ts`

as the source of truth.

There must remain exactly 36 students.

Important:

Student #17:

`Maulana Aliffian`

Role:

`Class President`

Teacher:

`Yohanes Christian`

Never change these factual values.

---

# 37. DO NOT FABRICATE CONTENT

Never invent:

* student photos
* student achievements
* awards
* events
* quotes
* social accounts
* grades
* birthdays
* hobbies
* biographies

Use placeholders where information is missing.

---

# 38. MOBILE FIRST

Do not consider mobile an afterthought.

The website must look intentionally designed at:

* 320px
* 375px
* 390px
* 430px
* 768px
* 1024px
* 1440px+

Pay special attention to:

* carousel
* scroll animations
* typography
* navbar
* logo
* section spacing
* image cropping
* horizontal overflow

---

# 39. TEST THE ACTUAL SCROLL EXPERIENCE

This is mandatory.

Do not claim scroll animations work merely because code exists.

Actually test the rendered page.

Verify:

1. Load homepage.
2. Scroll slowly.
3. Observe class logo entering from left.
4. Observe text following.
5. Scroll through student section.
6. Observe student cards responding naturally.
7. Continue to gallery.
8. Continue to schedule.
9. Continue to about.
10. Scroll back upward.
11. Test on mobile viewport.

If the animation feels empty, abrupt, invisible, or too subtle, revise it.

---

# 40. THE SITE MUST NOT FEEL EMPTY

The previous result felt empty because animation existed without visual storytelling.

Fix this through:

* stronger typography
* meaningful imagery
* larger compositions
* layered sections
* visual rhythm
* clear transitions
* stronger section introductions
* purposeful motion

Every major viewport should have a clear visual focal point.

---

# 41. DO NOT OVERANIMATE

Premium does NOT mean everything moves.

Use motion to direct attention.

A good rule:

* Hero → subtle entrance
* Class identity → strong scroll choreography
* Student showcase → interactive 3D movement
* Gallery → subtle image motion
* Schedule → minimal
* About → subtle
* Footer → almost static

---

# 42. USE EXISTING DESIGN SKILLS

Follow the installed project skills.

UI/UX Pro Max:

* hierarchy
* responsive design
* UX
* visual system

Taste:

* visual taste
* anti-slop
* composition
* typography
* restraint

Ponytail:

* minimal dependencies
* YAGNI
* maintainability

React Bits / MotionSites / 21st.dev can be used as inspiration.

Do NOT copy their visual identity.

---

# 43. FINAL QUALITY BAR

Before finishing, ask:

Does this look like a real class website?

Does it feel like Seven Excellent?

Does it feel connected to SMPN 203 Jakarta?

Does the logo have a meaningful role?

Does scrolling feel intentional?

Does the student archive feel memorable?

Does the website still look good without animation?

Does mobile feel designed rather than compressed?

Does anything look like an AI-generated template?

If yes, fix it.

---

# 44. REQUIRED FINAL CHECKS

Run:

* lint
* typecheck
* production build

Then verify:

* `/`
* `/students`
* `/students/[id]`
* `/gallery`
* `/schedule`
* `/about`
* `/privacy`
* `/terms`
* 404

Verify:

* 36 students
* Maulana Aliffian #17
* Class President
* Yohanes Christian
* class logo
* favicon
* metadata
* no horizontal overflow
* scroll animation
* reduced motion
* mobile carousel
* keyboard navigation
* no console errors

---

# FINAL INSTRUCTION

Do not give me a superficial polish.

Treat this as a **full visual redesign of the existing Seven Excellent homepage**.

The final result should feel like:

**a premium digital yearbook for 7E**

with:

**strong typography + real class identity + student portraits + editorial composition + meaningful scroll choreography + responsive interaction.**

Build it, test it, inspect it visually, and iterate until it reaches that standard.
S