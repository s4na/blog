import { access, readFile } from "node:fs/promises";

// 注意: 記事スラグはハードコードされている。新しい記事を追加した場合は
// requiredFiles と下の content checks も合わせて更新すること。
const requiredFiles = [
  "_site/index.html",
  "_site/styles.css",
  "_site/.nojekyll",
  "_site/posts/ghq-agents-and-pr-workflow.html",
];

for (const file of requiredFiles) {
  await access(file);
}

const index = await readFile("_site/index.html", "utf8");
const article = await readFile(
  "_site/posts/ghq-agents-and-pr-workflow.html",
  "utf8",
);

const checks = [
  [index.includes("./styles.css"), "index.html links the shared stylesheet"],
  [
    index.includes("./posts/ghq-agents-and-pr-workflow.html"),
    "index.html links the article",
  ],
  [
    article.includes("../styles.css"),
    "article links the shared stylesheet from posts/",
  ],
  [
    article.includes("明示された場合だけ取得する"),
    "article explains the ghq fetch confirmation rule",
  ],
];

const failed = checks.filter(([passed]) => !passed).map(([, label]) => label);

if (failed.length > 0) {
  throw new Error(`Site checks failed: ${failed.join(", ")}`);
}
