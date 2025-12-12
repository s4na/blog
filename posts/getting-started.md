---
title: "Getting Started with This Blog"
date: "2025-12-12"
description: "A quick guide on how this blog works and how to add new posts."
---

Welcome to my blog! This is a simple static blog built with React and TypeScript.

## How It Works

This blog is built with:

- **React** - For the UI components
- **TypeScript** - For type safety
- **Vite** - For fast builds
- **GitHub Pages** - For hosting

## Adding New Posts

To add a new post:

1. Create a new `.md` file in the `posts/` directory
2. Add YAML frontmatter at the top with `title`, `date`, and `description`
3. Write your content in Markdown
4. Update `posts/index.json` to include your new file

## Markdown Support

This blog supports GitHub Flavored Markdown:

### Code Blocks

```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

### Lists

- Unordered lists work
- Like this one

1. Ordered lists too
2. Just like this

### Links and Emphasis

You can use **bold**, *italic*, and [links](https://github.com).

> And blockquotes look like this!

Happy blogging!
