# Replacing the website content

Business details live in `src/content/site.js`. Project concepts live in
`src/content/projects.js`. These files are the first places to edit when the
original content is ready. Empty company fields and unpublished entries are not
displayed. Keep unapproved content outside files imported by the app: hiding an
entry does not prevent its data from being included in the public browser bundle.

## Contact and business identity

In `company`, confirm `email` first. It currently uses the address that was already
on the website: `info@phsolutions.in`. Its delivery and ownership have not been
verified. Both forms use this address; `careersEmail` can override it for careers.

Add a real `phone`, full `address`, and optionally `mapUrl` (a normal maps link).
Use `legalName`, `registration`, and `identityNote` to explain the company’s legal
identity and any relationship with PH Solutions or Paarth Institute of Education.
Do not infer the address from the old map: it conflicted with the old footer.

Add active social profiles in this format:

```js
socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/YOUR-COMPANY" }
]
```

Replace the example URL before adding the entry. Leave the array empty when
profiles are not ready.

## Founders, team and mentors

The About page uses `team`. It displays a useful introduction while the list is
empty. To publish a real profile, add:

```js
{
    name: "Full name",
    role: "Actual role",
    bio: "Relevant experience and the work this person handles.",
    image: "/team/name.jpg",
    profileUrl: "https://www.linkedin.com/in/REAL-PROFILE",
    published: true
}
```

Place the photograph in `public/team/`. Get permission before publishing a
person’s photo, bio or contact profile. The photo and profile link are optional.

## Testimonials

The three original testimonial objects are preserved in
`content-drafts/testimonials.json` with `published: false`. This reference file is
not imported by the app and is not copied into the production build. Keep it out
of `public/` and do not import it. The `testimonials` array in `src/content/site.js`
is empty until quotes are approved.

Confirm the wording, name, role and company, obtain consent, and add a source
or professional profile link where available. Add the date and disclose an
internal relationship using `affiliation`. Copy only the approved object into
the `testimonials` array in `src/content/site.js`, set `published: true`, and
rebuild to publish it. Leave unapproved drafts in the reference file: setting
`published: false` inside imported app content only hides the quote visually.
To remove a quote from a future public bundle, remove its object from the app
array as well. The site does not invent a star rating or aggregate review score.

## Careers

- `/careers`: the careers overview, values and opportunities.
- `/careers/apply`: a general introduction form.
- `/careers/apply?role=ROLE-ID`: an application for a published role.

There are no advertised vacancies by default. `careerInterests` lists areas of
interest, not job openings. To add a real opening, populate `vacancies`:

```js
{
    id: "unique-role-id",
    title: "Actual job title",
    location: "Actual location and work arrangement",
    type: "Full-time / part-time / internship, as applicable",
    summary: "What the successful applicant will work on.",
    requirements: ["An actual requirement", "Another actual requirement"],
    published: true
}
```

Use unique IDs. The listing and form heading update automatically. An unavailable
or unrecognized ID falls back to the general introduction with an explanation.
Set `published: false` to stop advertising a role.

## Projects

`src/content/projects.js` contains the illustrative project data and imagery.
The portfolio consistently labels the existing examples as **concepts**. The
old performance numbers were removed because there was no supporting evidence.

For a real case study, supply the problem, your contribution, actual screenshots,
technology used, delivery context, and a demo or reference if available. Obtain
client permission. If you have measured results, explain the period and method.

When replacing concepts with delivered work, also update the explanatory copy
in `src/pages/PortfolioPage.jsx`, the portfolio answer in `src/components/FAQ.jsx`,
the project note in `src/pages/InformationPage.jsx`, and the footer link text.
Do not remove the concept labels until the content has actually changed.

## Programs and enrollment information

Shared program durations and formats are in `programDetails` in `site.js`; these
feed both homepage cards and the Programs page. They preserve the previous
program outlines. Confirm them against your actual batches.

Curricula, skills and project briefs are in `src/pages/ProgramsPage.jsx` and
`src/components/Programs.jsx`. Update both when changing the program structure.
Homepage cards show the project brief and skills directly; each curriculum link
opens the matching track on the Programs page. Keep the program IDs consistent
between both files so those links continue to work.
Publish confirmed fees, prerequisites, dates, instructor details and cancellation
terms when available. There are no placement-rate or salary guarantees.

## How the forms work

The forms are deliberately honest about delivery:

1. Required fields and email/URL formats are validated.
2. **Prepare email** creates a local preview. It sends no network request.
3. **Open email app** opens a `mailto:` draft for the visitor to review and send.
4. **Copy draft** provides an alternative for visitors who use webmail. If
   clipboard access fails, the preview can be selected and copied manually.

Changing a field invalidates the old draft. No form fields are stored in local
storage. There is no server submission, upload endpoint, automatic inbox delivery,
or “message sent” success claim. Résumés can be attached in the visitor’s email app.

For automatic form delivery later, connect a real backend/email provider and show
success only after a successful server response. Update the privacy information
to match the actual service and retention practices at that time.

## Privacy and engagement information

`/privacy` explains the implemented website behavior. `/terms` is a plain-language
“Working with us” page, including what to confirm about fees and cancellation.
It does not invent a refund period, a payment contract or company-specific legal
terms. Replace or extend this copy with your actual business practices and
approved policies before accepting enrollments or project payments.

## Service card images

The six homepage service illustrations are in `src/images/services/`. They were
generated with the built-in image tool and reviewed before use. The complete
prompt set is in `src/images/services/PROMPTS.md`.

Replace the corresponding PNG or update its import in `src/components/Services.jsx`.
Use wide artwork with a quiet, dark left side for desktop copy and the subject
on the right for the mobile crop. The images are decorative illustrations;
they do not claim to show actual company infrastructure or client work.

## Realistic project and workplace imagery

The images in `src/images/editorial/` were created with the built-in image tool.
Original PNGs are saved alongside the optimized WebP files used by the website.
The exact prompt set is in `src/images/editorial/PROMPTS.md`; shared image imports
are in `src/content/imagery.js`.

Project images are concept mockups. Workplace and mentoring photos depict fictional
people and premises, with visible illustrative captions. Replace them with your
approved original photos when available; these are not staff profile photographs.

TaskFlow is a simple proposed task-board project, not a delivered client project
or a working demo. The concept copy lives in `src/content/projects.js`.

## Brand assets

- `public/brand/logo-reference.png`: the exact image you supplied.
- `public/brand/paarth-mark.png`: the extracted transparent Pi monogram.
- `src/components/Logo.jsx` and `Logo.css`: responsive header/footer lockup.

The dark presentation uses the pale treatment from your reference; the light
header uses the navy/teal mark. The browser icon uses the same transparent mark.

Prepared using the built-in image tool. Prompt:

> Extract only the central Pi monogram, preserving the navy P, upward-right
> negative-space arrow, navy i stem and teal split diamond. Remove the background,
> wordmark, presentation labels and bottom variants. Use transparent alpha,
> preserve the silhouette and proportions, and avoid redesigning the mark.

## Local verification

```sh
npm run lint
npm test
npm run build
```

If Windows locks a file in the existing `dist` directory, a separate ignored
output directory can be used without deleting or moving the locked files:

```sh
npm run build -- --outDir .deployment-dist/trust-review
npm run preview -- --outDir .deployment-dist/trust-review --host 127.0.0.1 --port 4173
```

The email tests cover Unicode, multiline content, optional fields and safe
encoding. Test the final configured inbox separately by sending a real message
yourself. Production updates are published separately after build and browser
verification.

## Search metadata and publishing

`src/content/seo.js` holds the page titles, descriptions, canonical domain and
indexing settings. It gives training and business services equal prominence.
Keep claims factual when editing it. Organization structured data is a description
of the company, not a registration or verification badge.

`npm run build` creates static HTML from the same React components for all ten
routes, plus `robots.txt`, `sitemap.xml` and `404.html`. The browser hydrates that
HTML to enable the animations and forms. Add any new route to App, the SEO config
and the page-module map in `scripts/build.mjs`. The build fails on a missing map.

Verify the generated site before deployment:

```sh
node scripts/verify-build.mjs dist
```

The Vercel source configuration uses clean URLs and the generated `404.html`.
For a prebuilt deployment, use a NEW staging directory with
`node scripts/stage-vercel.mjs dist .deployment-dist/vercel-NEW-NAME`.
This generates matching routes and a true HTTP 404 fallback. Do not restore the
old catch-all homepage rewrite, which returns a success response for missing pages.
Vite's local preview still has its own SPA fallback; confirm HTTP 404 on Vercel.

The production sitemap is `https://www.paarthinfotech.com/sitemap.xml`.
Submit it in the owner's Google Search Console property and inspect important
URLs there. Search Console verification and indexing requests need account access;
generating or publishing these files does not submit them to Google.

The Git-connected Vercel project must use Root Directory `websitehome.client`,
Framework `Vite`, Build Command `npm run build` and Output Directory `dist`.
The repository root has a different package manifest and cannot build this app.
Direct prebuilt publishing does not update GitHub: sync the current source before
using a Git-triggered release, or it can publish an older version of the site.
