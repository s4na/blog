# Repository Rules

## Privacy

- Do not include personal information in blog posts, examples, metadata, commit messages, PR titles, PR descriptions, or comments.
- Use generic repository names, account names, paths, issue numbers, and examples unless the user explicitly provides publishable text.
- Before publishing or opening a PR, review the diff for names, email addresses, tokens, private URLs, internal hostnames, and other sensitive details.

## Content

- Write public-facing blog content in Japanese unless the user asks for another language.
- Keep examples reproducible without requiring private configuration.
- Prefer concrete workflow descriptions over claims about private projects or private repositories.

## Diagrams

- Use Mermaid notation for workflow diagrams and flowcharts in blog posts.
- Wrap diagrams in a fenced code block with the `mermaid` language tag.
- The build system renders Mermaid diagrams client-side via Mermaid.js (loaded from CDN only on pages that contain a diagram).
