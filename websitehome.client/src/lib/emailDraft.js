export function buildEmailDraft(recipient, subject, fields) {
    const safeSubject = subject.replace(/[\r\n]+/g, " ").trim();
    const body = fields
        .filter(([, value]) => String(value ?? "").trim())
        .map(([label, value]) => `${label}: ${String(value).trim().replace(/\r?\n/g, "\r\n")}`)
        .join("\r\n\r\n");
    return {
        body,
        subject: safeSubject,
        href: `mailto:${recipient}?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(body)}`
    };
}
