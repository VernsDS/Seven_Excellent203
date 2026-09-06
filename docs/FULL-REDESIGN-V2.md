# SEVEN EXCELLENT

## FULL VISUAL REDESIGN V2

This is a FULL redesign and interaction pass for the existing Seven Excellent website.

The previous implementation is not acceptable.

The biggest failure was motion.

The website currently does not have meaningful, visible, scroll-driven animation. Previous implementations added components that technically contained animation code, but the rendered experience still felt static.

THIS MUST BE FIXED.

Do not perform another superficial polish.

Do not simply add fade-in classes.

Do not add animation code without verifying that the animation is actually visible in the browser.

The final website must feel like a premium digital yearbook and class archive for:

**7E**
**SEVEN EXCELLENT**
**SMPN 203 JAKARTA**

---

# 1. EXISTING REPOSITORY

Repository:

`VernsDS/Seven_Excellent203`

Inspect the existing repository before changing anything.

The repository is already a Next.js project with:

* `app/`
* `components/`
* `components/ui/`
* `lib/`
* `public/`
* `docs/`
* `.opencode/`
* TypeScript
* Tailwind

Do NOT create a new project.

Do NOT replace the existing architecture unnecessarily.

Read all relevant existing files before coding:

* `README.md`
* `docs/PRD.md`
* `docs/DESIGN.md`
* `docs/OPENCODE-PROMPT.md`
* `docs/STUDENT-SHOWCASE-INTEGRATION.md` if present
* `.opencode/AGENTS.md`
* `app/page.tsx`
* `app/layout.tsx`
* `app/globals.css`
* `lib/students.ts`
* existing homepage components
* `package.json`
* `next.config.ts`

Inspect the existing implementation visually before deciding what to replace.

---

# 2. THE CORE GOAL

The final site should NOT feel like:

* a generic school template
* a SaaS landing page
* a dashboard
* a collection of random UI components
* an AI-generated website
* a copied 21st.dev demo

It should feel like:

**A DIGITAL YEARBOOK FOR 7E.**

The visual identity should be based on:

* students
* class identity
* memories
* school life
* editorial composition
* photography
* typography
* movement
* depth
* 7E
* SMPN 203 Jakarta

---

# 3. ABSOLUTE MOTION REQUIREMENT

THIS IS THE MOST IMPORTANT PART OF THIS TASK.

The website MUST contain REAL, VISIBLE, MEANINGFUL ANIMATION.

Not decorative code.

Not unused components.

Not animations that are technically present but impossible to notice.

Not only `opacity: 0 → 1`.

Not only `transition-all`.

The user must visibly experience the page changing as they scroll.

---

# 4. SCROLL-DRIVEN MOTION MUST BE REAL

At least THREE major sections must respond to actual scroll position.

The strongest scroll choreography should happen in:

1. Hero
2. Class Identity
3. Student Photo Stream / Archive

Use the animation stack already present in the project where possible.

If Motion / Framer Motion is already installed, use it appropriately.

If it is not installed, use a lightweight implementation.

Do not add a huge animation library unnecessarily.

---

# 5. HOW THE SCROLL ANIMATION SHOULD WORK

The user should be able to scroll slowly and visibly observe motion.

For example:

### CLASS IDENTITY SECTION

At the beginning:

* logo is positioned significantly to the LEFT
* logo is slightly scaled down
* logo has a subtle 3D rotation
* text is offset to the opposite side
* text is partially hidden/clipped

During scrolling:

* logo travels from LEFT toward its final position
* logo rotates toward neutral
* logo increases in scale
* text slides/reveals into position
* supporting text follows with a delay
* background layers move at a different rate

At the end:

* logo reaches final position
* text is fully visible
* composition is stable

This must be linked to scroll progress.

Conceptually:

```text
0% scroll progress
LOGO       → far left
TEXT       → hidden / offset

50%
LOGO       → approaching center
TEXT       → appearing

100%
LOGO       → final position
TEXT       → fully composed
```

Do not make the movement only 20px.

It should be visually obvious while remaining tasteful.

---

# 6. HERO MOTION

The hero must not be static.

Use layered movement.

Possible effects:

* large 7E typography moves at a different scroll rate
* logo subtly scales
* background image moves with restrained parallax
* foreground typography shifts slightly
* hero content gradually exits as the next section enters
* a visual mask/reveal can expose the next section

The animation must remain smooth on mobile.

Do not create an annoying forced scroll experience.

Do not hijack native scrolling.

---

# 7. CLASS LOGO REVEAL

The class logo must have a meaningful role.

Reference:

`https://imgur.com/a/m2MgtlK`

Use the actual class logo/photo asset when available.

Prefer storing it locally under:

`public/images/branding/`

Do not depend on the Imgur page as a runtime dependency if the actual image can be stored locally.

The logo should appear as part of a major visual composition.

It should not simply sit inside a rounded card.

---

# 8. CLASS IDENTITY COPY

The section must clearly contain:

**7E**
**SEVEN EXCELLENT**
**SMPN 203 JAKARTA**

Create natural copy that sounds like a real class website.

Do not use:

"One classroom. One journey."

Do not use generic AI slogans.

The copy should feel personal, simple, and authentic.

---

# 9. STUDENT PHOTO STREAM

The new visual centerpiece should be a continuously moving stream of student photographs.

Use the supplied `ImageStreamHero` concept from 21st.dev as technical inspiration.

The original demo uses:

* stock images
* gradients
* random people
* generic marketing copy

ALL OF THAT MUST BE REMOVED.

The replacement must use the actual 7E student dataset.

---

# 10. IMAGE STREAM COMPONENT

Create:

`components/ui/image-stream-hero.tsx`

Use the supplied `ImageStreamHero` implementation as the technical foundation.

Keep the strong corridor/perspective concept:

* two mirrored rails
* depth
* perspective
* cards traveling continuously
* cards moving from depth toward the viewer
* cards exiting beyond the viewport
* negative animation delays so the stream is already populated
* CSS 3D transforms
* continuous motion

However, completely redesign the content for Seven Excellent.

The stream should feel like:

**a moving wall of 7E student portraits.**

Not a marketing hero.

---

# 11. STUDENT IMAGE STREAM CONTENT

Every image must correspond to a real student.

Use:

`lib/students.ts`

as the single source of truth.

Do not create another student dataset.

Do not hardcode fake names inside the component.

The component should accept student data through props.

---

# 12. ABSOLUTE NO FAKE PHOTOS RULE

NEVER use:

* Unsplash people
* random stock portraits
* AI-generated faces
* random external human photographs
* fake student photographs

A missing student photo MUST NOT be replaced with another human.

If there is no photo:

use a designed placeholder.

---

# 13. MISSING PHOTO PLACEHOLDER

If a student has no photo, the card must remain in the stream.

Do NOT remove the card.

Do NOT hide the student.

Do NOT substitute another person.

Use a premium placeholder containing text such as:

**FOTO SISWA/I 7E**

and:

**Foto belum ditambahkan**

Then provide a small instruction:

**Jika kamu murid 7E dan ingin menambahkan foto, hubungi Rafa.**

Keep it visually attractive.

The placeholder should feel like an intentional part of the yearbook system.

---

# 14. PHOTO CARD DESIGN

Each stream card should contain:

* student photograph or placeholder
* student name
* absent number
* role when applicable
* subtle `7E`
* subtle `SMPN 203`

Example:

```text
MAULANA ALIFFIAN
ABSEN 17
CLASS PRESIDENT
7E · SMPN 203
```

For normal students:

```text
STUDENT NAME
ABSEN 01
7E · SMPN 203
```

Do not add fake biographies.

---

# 15. STUDENT PHOTO DIRECTORY

Use:

`public/images/students/`

for future real photos.

Use predictable filenames.

Example:

```text
01-abdur-rahman-rohmi.webp
02-adni-ziva-kusuma.webp
03-airin-mariska-mursalim.webp
...
17-maulana-aliffian.webp
...
36-zidane-mustofa-ramadhan.webp
```

Only reference files that actually exist.

If the file does not exist, use the placeholder.

---

# 16. STUDENT DATA

There are exactly 36 students.

Do not remove anyone because they do not have a photo.

Student #17:

**Maulana Aliffian**

Role:

**Class President**

Homeroom teacher:

**Yohanes Christian**

Do not change factual data.

Do not invent additional information.

---

# 17. STUDENT COVERFLOW

Keep the 3D Coverflow student showcase as a separate interactive section.

It should not be replaced entirely by the image stream.

The page should have BOTH:

### Moving Photo Stream

Continuous cinematic motion.

AND

### Interactive Student Archive

User-controlled coverflow.

The two sections should have different visual purposes.

---

# 18. COVERFLOW BEHAVIOR

Desktop:

* active portrait large
* neighboring portraits visible
* perspective
* scale difference
* rotation
* depth
* layered cards

Mobile:

* active portrait dominant
* controlled neighboring cards
* swipe support
* arrows
* pagination
* no horizontal overflow

The active student should be visually obvious.

---

# 19. COVERFLOW CONTENT

Do not use restaurant content.

Do not use:

* menu
* chef
* food
* dishes
* fake CTA text

Replace with:

**FOTO SISWA/I 7E**

or another polished editorial heading.

Possible section title:

**THE PEOPLE OF 7E**

Supporting text:

**SMPN 203 JAKARTA**

Use better wording if it fits the design.

---

# 20. REAL INTERACTION

The student coverflow must support:

* swipe
* click neighboring card
* previous
* next
* pagination
* keyboard arrows on desktop

Autoplay may be used carefully.

If autoplay makes reading difficult, disable it.

---

# 21. SCROLL INTERACTION AROUND STUDENTS

The student section itself should react to scrolling.

For example:

As the user approaches the student archive:

* section title reveals
* background changes subtly
* photo stream enters from depth
* coverflow composition scales into view
* typography moves slightly
* student archive settles into place

When scrolling away:

* use subtle exit motion if appropriate

Do not make every element fly around.

---

# 22. PHOTO STREAM MUST ACTUALLY MOVE

This is non-negotiable.

The ImageStreamHero must have continuous visible movement.

Do not accidentally pause it globally.

Do not put it under an invisible overlay.

Do not make animation duration so slow that it appears static.

The cards should visibly travel across the screen.

Test the actual browser rendering.

If you cannot visually see the cards moving, the implementation is not complete.

---

# 23. MOTION PERFORMANCE

Use GPU-friendly properties:

* transform
* opacity

Avoid continuously animating:

* width
* height
* top
* left

unless absolutely necessary.

Use:

```css
transform: translate3d(...)
```

and CSS 3D where appropriate.

The image stream can use CSS keyframes.

Scroll-driven sections can use Motion or requestAnimationFrame.

---

# 24. MOBILE MOTION

Mobile must have real animation too.

Do NOT simply disable animation on mobile.

Adapt it.

For mobile:

* reduce perspective
* reduce card count
* reduce movement distance
* reduce image size
* reduce blur
* preserve visible motion
* preserve scroll choreography

Test at:

* 320px
* 375px
* 390px
* 430px

---

# 25. REDUCED MOTION

Respect:

`prefers-reduced-motion`

When enabled:

* disable continuous photo-stream movement
* remove large parallax
* remove aggressive rotations
* show all important content immediately
* preserve usability

This is the ONLY situation where major motion should be disabled.

---

# 26. CONTACT RAFA

Add a clear CTA:

**CONTACT RAFA**

This should open WhatsApp.

Use the supplied WhatsApp contact:

`082121979710`

Use a WhatsApp deep link correctly.

Do not display the raw URL as visible text.

Create a centralized constant so the number exists in one place.

Suggested configuration:

```ts
export const CONTACT_RAFA = {
  phone: "6282121979710",
  label: "Contact Rafa",
};
```

The visible button should say:

**CONTACT RAFA**

or:

**HUBUNGI RAFA**

Use whichever fits the design better.

The CTA can appear:

* in the navigation
* in the missing-photo placeholder
* near the student archive
* in the final CTA

Do not spam the button.

One or two meaningful placements are enough.

---

# 27. WHATSAPP MESSAGE

Use a useful prefilled message when appropriate.

For example:

`Halo Rafa, saya murid 7E dan ingin menambahkan foto saya ke website Seven Excellent.`

Keep it editable by the user.

Do not send anything automatically.

The user must explicitly click the WhatsApp link.

---

# 28. NAVIGATION

Redesign the navbar.

Desktop:

* Seven Excellent / 7E identity
* Students
* Gallery
* Schedule
* About
* Contact Rafa

Mobile:

* compact
* accessible
* animated menu
* no huge overlay unless visually justified

The navbar should respond to scrolling.

For example:

At top:

* transparent / integrated into hero

After scrolling:

* more solid
* stronger contrast
* subtle backdrop
* compact height

This transition should itself be animated.

---

# 29. HERO

Create a strong hero.

Must immediately communicate:

**7E**
**SEVEN EXCELLENT**
**SMPN 203 JAKARTA**

Use:

* typography
* logo
* imagery
* depth
* motion

The hero should have a CTA above the fold.

Possible:

**MEET THE CLASS**

and:

**CONTACT RAFA**

Choose final layout based on the design.

---

# 30. HERO SCROLL EXIT

When the user scrolls:

* hero typography should subtly move
* logo should scale/change position
* background imagery should move at another rate
* hero should transition naturally into the class identity section

This must be visible.

Do not make the entire hero disappear instantly.

---

# 31. GALLERY

Gallery should use real class photographs when available.

No fake student photos.

No random stock people.

If no real image exists:

show a designed placeholder.

Use editorial composition rather than a generic 3-column card grid.

Possible:

* asymmetric image sizes
* masonry-like layout
* varying aspect ratios
* large feature image
* smaller supporting images
* subtle scroll reveal

---

# 32. SCHEDULE

Keep schedule factual.

Use:

* clear typography
* day hierarchy
* subject hierarchy
* responsive design
* subtle motion only

Do not fabricate teacher names, room numbers, or times.

---

# 33. ABOUT

About must be authentic.

Include factual information:

* 7E
* Seven Excellent
* SMPN 203 Jakarta
* 36 students
* Yohanes Christian

Avoid generic AI phrases.

Do not use:

"One classroom. One journey."

---

# 34. UNIQUE PAGE TITLE

The browser title MUST NOT be generic.

Do not use:

`Create Next App`

Do not use:

`Seven Excellent`

alone if a more distinctive title can be created.

Create a unique title such as:

**Seven Excellent 7E | SMPN 203 Jakarta**

or a more editorial equivalent.

The title should clearly identify the class and school.

Also configure proper:

* description
* Open Graph title
* Open Graph description
* Twitter metadata
* canonical URL

---

# 35. FAVICON

Replace the default Next.js favicon.

Use the actual Seven Excellent class image/logo.

The favicon must NOT be the default Next.js icon.

Inspect:

`app/favicon.ico`

and related metadata.

If the supplied class image is available locally:

create an appropriate square favicon from it.

If a dedicated icon format is needed, generate the appropriate static assets.

Do not invent a new logo.

---

# 36. SEO

Implement:

* unique title
* meta description
* canonical
* Open Graph
* Twitter card
* favicon
* robots
* sitemap

Production domain:

`https://sevenexcellent203.zone.id`

---

# 37. SITEMAP.XML

There MUST be a working:

`/sitemap.xml`

Include all public important pages.

At minimum:

* `/`
* `/students`
* `/gallery`
* `/schedule`
* `/about`
* `/privacy`
* `/terms`

If student detail pages are public and generated from real student data, include them too.

Do not include private/admin routes.

Use the production domain.

---

# 38. ROBOTS.TXT

There MUST be a working:

`/robots.txt`

Allow public pages.

Disallow private/admin/API paths if they exist.

Reference the sitemap:

`https://sevenexcellent203.zone.id/sitemap.xml`

Verify that the endpoint actually works after building.

---

# 39. NO FAKE CONTENT

This rule applies everywhere.

Never invent:

* student photographs
* student biographies
* awards
* achievements
* events
* quotes
* grades
* birthdays
* hobbies
* social accounts
* teacher information
* schedule information

If information is missing:

use a clear placeholder.

---

# 40. NO EM DASHES

Do NOT use the em dash character:

`—`

anywhere in visible website copy, metadata, documentation generated for the site, or UI text.

Use:

* commas
* periods
* colons
* parentheses
* standard hyphens

instead.

This requirement is intentional.

---

# 41. TYPOGRAPHY

Do not keep the default starter typography without evaluating it.

Create a deliberate type system.

Use:

* one strong display font
* one readable body font
* optional monospace for metadata

Typography should create visual hierarchy.

Avoid using too many fonts.

---

# 42. COLOR

Build a coherent visual palette around:

* near-black
* graphite
* warm white
* class identity accent

Use the class logo/photo as a reference for accent decisions.

Avoid generic neon purple AI styling.

Avoid excessive gradients.

---

# 43. DEPTH

Use real visual depth through:

* 3D transforms
* perspective
* layered images
* overlapping typography
* scale
* shadows
* subtle blur

Do not add random:

* cubes
* spheres
* particles
* blobs

---

# 44. NO EMPTY ANIMATIONS

Every animation must have a visual purpose.

Examples:

GOOD:

Logo travels into composition while text reveals.

GOOD:

Student portraits continuously move through a perspective corridor.

GOOD:

Hero typography responds to scroll.

GOOD:

Navbar transforms after scrolling.

BAD:

Random blob moves in background.

BAD:

Text fades in because every website has fade-in.

BAD:

Button spins.

BAD:

Everything bounces.

---

# 45. ANIMATION VERIFICATION

This is mandatory.

After implementing the animations:

RUN THE SITE.

Actually open the browser.

Actually scroll.

Actually observe.

Do not only inspect source code.

Verify:

### Hero

Scroll down slowly.

Can you clearly see the hero composition changing?

### Class identity

Can you clearly see the logo moving from the left?

Can you clearly see text following it?

### Photo stream

Can you clearly see student cards continuously moving?

### Student archive

Can you see the 3D perspective change?

### Navbar

Does it visually transform while scrolling?

If any answer is NO:

FIX IT.

Do not mark the task complete.

---

# 46. TEST ANIMATION AT DIFFERENT SPEEDS

Test:

* slow scrolling
* normal scrolling
* fast scrolling
* scrolling upward
* scrolling downward

Animations must not:

* disappear permanently
* get stuck
* flash
* create blank sections
* cause horizontal overflow
* block scrolling

---

# 47. PERFORMANCE TEST

Do not sacrifice performance for visual effects.

Avoid:

* unnecessary WebGL
* huge videos
* enormous images
* hundreds of DOM nodes moving individually if avoidable
* expensive continuous JavaScript scroll listeners

The ImageStreamHero may use CSS keyframes because that is appropriate for continuous motion.

Scroll-driven sections should use efficient scroll progress techniques.

---

# 48. RESPONSIVE TESTING

Test:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Verify:

* no horizontal overflow
* text remains readable
* cards fit
* animations remain visible
* logo remains visible
* navbar works
* buttons are tappable
* WhatsApp CTA works

---

# 49. ACCESSIBILITY

Maintain:

* semantic HTML
* keyboard navigation
* visible focus
* aria-labels
* proper button semantics
* meaningful image alt text
* reduced motion support
* touch support

Do not make animation mandatory for understanding content.

---

# 50. COMPONENT ARCHITECTURE

Keep the implementation maintainable.

Possible structure:

```text
components/
├── ui/
│   ├── image-stream-hero.tsx
│   ├── student-coverflow.tsx
│   ├── scroll-reveal.tsx
│   └── ...
├── home/
│   ├── hero.tsx
│   ├── class-identity.tsx
│   ├── student-stream.tsx
│   ├── student-showcase.tsx
│   ├── gallery-preview.tsx
│   ├── schedule-preview.tsx
│   └── final-cta.tsx
```

Do not create unnecessary abstractions.

Do not create a giant homepage component.

---

# 51. SHADCN / TAILWIND / TYPESCRIPT

The codebase should continue using:

* TypeScript
* Tailwind CSS
* shadcn-style component structure

If the project already supports them, do not reinstall everything.

Use:

`components/ui`

for reusable UI components.

Use existing:

`lib/utils.ts`

if available.

---

# 52. ICONS

Use `lucide-react` for interface icons if it is already installed or if an icon dependency is actually needed.

Do not create unnecessary SVG components for standard UI icons.

Do not use icon libraries for the class logo.

The actual class logo must remain an image asset.

---

# 53. IMAGE OPTIMIZATION

Use Next.js image handling where appropriate.

Optimize real student images.

Use:

* WebP
* AVIF where appropriate
* responsive sizing
* lazy loading

Do not load enormous images into small cards.

The moving image stream should not destroy mobile performance.

---

# 54. CONTACT RAFA PLACEMENT

The Contact Rafa CTA should appear naturally.

Recommended placements:

1. Navbar
2. Missing photo placeholder
3. Final CTA

Do not put it in every section.

The CTA should be visually consistent with the Seven Excellent design.

---

# 55. FOOTER

Create a proper footer.

Include:

**Seven Excellent**
**7E**
**SMPN 203 Jakarta**

Useful navigation.

Contact Rafa.

Privacy.

Terms.

Do not add fake social media links.

Do not add fake copyright organizations.

---

# 56. 404 PAGE

Create a custom 404.

It should match the Seven Excellent visual identity.

Do not leave the default Next.js 404.

Use a subtle motion treatment if appropriate.

---

# 57. PRIVACY AND TERMS

Keep the existing privacy and terms pages functional.

Make sure they do not look like untouched Next.js boilerplate.

Keep them factual.

Do not make legal claims that are not appropriate for the project.

---

# 58. FINAL QA

Before finishing:

Run:

```bash
npm run lint
```

Run type checking if available.

Run:

```bash
npm run build
```

Then inspect the production build.

Check browser console.

Check:

* `/`
* `/students`
* `/students/[id]`
* `/gallery`
* `/schedule`
* `/about`
* `/privacy`
* `/terms`
* `/robots.txt`
* `/sitemap.xml`
* custom 404

---

# 59. DATA VERIFICATION

Verify:

* exactly 36 students
* student #17 is Maulana Aliffian
* #17 is Class President
* Yohanes Christian is correct
* no student has been removed because of missing photo
* no fake photos exist
* no fake student information exists

---

# 60. FINAL VISUAL TEST

The website must pass this test:

Open it.

Do not read the source code.

Just use it as a normal visitor.

Then ask:

1. Does the first screen immediately feel like 7E?
2. Is there obvious motion?
3. Does scrolling visibly change the composition?
4. Does the class logo actually move into the page?
5. Does text follow the logo?
6. Do student photographs actually move through the image corridor?
7. Does the 3D student archive feel interactive?
8. Does mobile feel intentionally designed?
9. Does the website feel like a digital yearbook?
10. Does anything still look like a generic AI template?

If the answer to #2, #3, #4, #5, or #6 is NO, the task is NOT complete.

---

# 61. IMPORTANT IMPLEMENTATION RULE

Do not tell the user that animation was implemented simply because animation code exists.

The requirement is based on the RENDERED EXPERIENCE.

If the user cannot visibly see the animation, it does not count.

---

# 62. FINAL DESIGN STANDARD

The final website should communicate:

**7E**

**SEVEN EXCELLENT**

**SMPN 203 JAKARTA**

through:

* photography
* typography
* motion
* class identity
* student archive
* editorial composition
* responsive interaction

It should feel like something students would actually want to show their classmates.

It should be memorable.

It should feel alive.

It should not feel like a template.

Build it, run it, visually test it, fix it, and only then consider the task complete.
