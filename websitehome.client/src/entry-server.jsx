import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

// Run only at build time. The same React tree is hydrated in the browser.
export async function render(pathname) {
    const errors = [];
    const stream = await renderToReadableStream(
        <StaticRouter location={pathname}><App /></StaticRouter>,
        { onError: (error) => errors.push(error) }
    );
    await stream.allReady;
    if (errors.length) throw new AggregateError(errors, `Cannot prerender ${pathname}`);
    return new Response(stream).text();
}
