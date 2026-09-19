import test from "node:test";
import assert from "node:assert/strict";
import { buildEmailDraft } from "../src/lib/emailDraft.js";

test("email handoff preserves Unicode, paragraphs and reserved characters", () => {
    const draft = buildEmailDraft("hello@example.com", "Career introduction — Engineering", [
        ["Name", "Zoë"], ["Message", "React & .NET?\nA link: https://example.com/?a=1&b=2#work"]
    ]);
    const url = new URL(draft.href);
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, "hello@example.com");
    assert.equal(url.searchParams.get("subject"), "Career introduction — Engineering");
    assert.equal(url.searchParams.get("body"), "Name: Zoë\r\n\r\nMessage: React & .NET?\r\nA link: https://example.com/?a=1&b=2#work");
    assert.equal(url.hash, "");
});

test("empty optional fields do not enter the message", () => {
    const draft = buildEmailDraft("hello@example.com", "Website inquiry", [["Name", " Asha "], ["Phone", "   "], ["Portfolio", null], ["Experience", undefined]]);
    assert.equal(draft.body, "Name: Asha");
});

test("user content cannot introduce extra mail headers or query parameters", () => {
    const draft = buildEmailDraft("hello@example.com", "Hello\r\nBcc: hidden@example.com", [["Message", "A&B=1\r\nCc: elsewhere@example.com"]]);
    const url = new URL(draft.href);
    assert.equal(draft.subject, "Hello Bcc: hidden@example.com");
    assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
    assert.equal(url.pathname, "hello@example.com");
});
