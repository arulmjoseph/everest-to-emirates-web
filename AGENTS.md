<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history — force pushing, or rebasing/amending/squashing commits that are already pushed — as it rewrites history on Lovable's side and the user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public event inquiries are saved via a validated server function to a private Cloud table; this keeps visitors' contact data inaccessible from the browser.
- The home page and confirmation use TanStack file routes; this preserves direct URLs and route-specific metadata.
- Uploaded brand and book artwork use asset pointers while generated editorial images are bundled; this keeps supplied media reusable without checking binaries into source.
