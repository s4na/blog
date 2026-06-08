import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const root = join(import.meta.dirname, "..");

await rm(join(root, "_site"), { force: true, recursive: true });
await mkdir(join(root, "_site/posts"), { recursive: true });

for (const file of ["styles.css", ".nojekyll"]) {
  await cp(join(root, file), join(root, "_site", file));
}

const postFiles = (await readdir(join(root, "posts"))).filter(
  (f) => extname(f) === ".md",
);

const posts = await Promise.all(
  postFiles.map(async (file) => {
    const raw = await readFile(join(root, "posts", file), "utf8");
    const { data, content } = matter(raw);
    const slug = basename(file, ".md");
    // marked が raw HTML をそのまま通すため、.md ファイルはリポジトリ管理下の
    // 信頼済みコンテンツであることが前提。外部コントリビュータに .md を開放する
    // 場合はサニタイザーの追加を検討すること。
    const bodyHtml = await marked(content);
    return { slug, data, bodyHtml };
  }),
);

posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

for (const { slug, data, bodyHtml } of posts) {
  await writeFile(
    join(root, "_site/posts", `${slug}.html`),
    articlePage(data, bodyHtml),
    "utf8",
  );
}

await writeFile(join(root, "_site/index.html"), indexPage(posts), "utf8");

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(date) {
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  return String(date);
}

function articlePage(
  { title, date, description = "", eyebrow = "", lead = "" },
  bodyHtml,
) {
  const dateStr = formatDate(date);
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="site-name" href="../">blog</a>
    </header>

    <main class="article-shell">
      <article class="article">
        <header class="article-header">
          ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>\n          ` : ""}<h1>${esc(title)}</h1>
          ${lead ? `<p class="lead">${esc(lead)}</p>\n          ` : ""}<p class="post-date">${esc(dateStr)}</p>
        </header>

        ${bodyHtml}
      </article>
    </main>
  </body>
</html>
`;
}

function indexPage(posts) {
  const cards = posts
    .map(
      ({
        slug,
        data: { title, date, description = "" },
      }) => `        <article class="post-card">
          <p class="post-date">${esc(formatDate(date))}</p>
          <h3>
            <a href="./posts/${esc(slug)}.html">${esc(title)}</a>
          </h3>
          <p>${esc(description)}</p>
        </article>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>blog</title>
    <meta
      name="description"
      content="エンジニアリングと開発環境についてのブログ"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="site-name" href="./">blog</a>
    </header>

    <main class="home">
      <section class="home-intro" aria-labelledby="home-title">
        <p class="eyebrow">Engineering Notes</p>
        <h1 id="home-title">開発環境とワークフローの記録</h1>
        <p>
          コーディングエージェント、リポジトリ運用、レビュー可能な成果物についての短い記事を置いていきます。
        </p>
      </section>

      <section class="post-list" aria-labelledby="posts-title">
        <h2 id="posts-title">Posts</h2>
${cards}
      </section>
    </main>
  </body>
</html>
`;
}
