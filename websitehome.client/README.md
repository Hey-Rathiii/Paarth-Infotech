# Paarth Infotech website

React and Vite website for software services, training programs and careers.

Start with [CONTENT_GUIDE.md](CONTENT_GUIDE.md) to replace business details,
add real team profiles and testimonials, publish vacancies, and update projects.

## Local development

```sh
npm install
npm run dev
```

The existing development configuration uses the ASP.NET HTTPS certificate.
For a local HTTP session without changing that configuration:

```sh
npm run dev -- --mode production --host 127.0.0.1 --port 4173
```

## Verification

```sh
npm run lint
npm test
npm run build
```

Forms prepare email drafts for visitors to review and send in their own email
application. They do not automatically submit to a server. See the content guide
for delivery behavior and the details to confirm before publishing.
