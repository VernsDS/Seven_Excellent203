# Seven Excellent — Product Requirements Document

**Project:** Official Website Kelas 7E / Seven Excellent  
**School:** SMPN 203 Jakarta  
**Version:** 1.0

## Product

Seven Excellent is the official digital home of Class 7E. It provides class identity, a student directory, class leadership information, gallery, schedule, and about information.

## Core identity

- Class: 7E
- Name: Seven Excellent
- School: SMPN 203 Jakarta
- Students: 36
- Class President: Maulana Aliffian (#17)
- Homeroom Teacher: Yohanes Christian

## Goals

- Establish a recognizable 7E identity.
- Provide a useful directory of all 36 students.
- Present leadership and class information clearly.
- Preserve class memories through a gallery.
- Provide a useful weekly schedule.
- Deliver a premium, responsive, accessible web experience.

## Non-goals

Do not build a school management system, grading system, attendance system, chat platform, social network, or private student database unless explicitly requested.

## Routes

Public:
- `/`
- `/students`
- `/students/[id]`
- `/about`
- `/gallery`
- `/schedule`
- `/privacy`
- `/terms`
- custom 404

Future/admin routes should not be added unless requested.

## Homepage

Recommended narrative:
Hero → Class Snapshot → Leadership → Student Directory Preview → Gallery Preview → Schedule Preview → About → Final CTA → Footer.

The hero must contain a CTA above the fold.

## Student directory

Show all students with authoritative absent numbers 01–36.

Student record:
```ts
{
  id: number
  name: string
  absentNumber: number
  role: "Student" | "Class President"
  photo?: string
}
```

Never invent personal information.

## Gallery

Use real/authorized class photographs when supplied. Until then, use intentional placeholders rather than fake memories or random stock people.

## Schedule

Display the weekly timetable clearly on desktop and mobile. Only show teacher/room/time fields when real data exists.

## About

Explain the identity of Seven Excellent, the class, school, people, and purpose of the website. Avoid generic AI slogans.

## Quality

Must include:
- responsive design
- accessibility
- optimized images
- metadata
- Open Graph/Twitter preview
- sitemap
- robots.txt
- privacy
- terms
- custom 404
- keyboard support
- reduced motion
- production build without errors

## Acceptance criteria

The project is complete only when all 36 students are correct, #17 Maulana Aliffian is marked Class President, Yohanes Christian is shown as Homeroom Teacher, all core routes work, CTA is above the fold, visual quality is premium, mobile works, metadata exists, and the production build passes.
