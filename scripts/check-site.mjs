import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

// 注意: 記事スラグはハードコードされている。新しい記事を追加した場合は
// requiredFiles 配列と checks 配列の両方に対応するエントリを追加すること。
// (フロントマター検証は validate-posts.mjs が自動で行うため、そちらは変更不要。)
const requiredFiles = [
  join(root, "_site/index.html"),
  join(root, "_site/styles.css"),
  join(root, "_site/.nojekyll"),
  join(root, "_site/vendor/mermaid.esm.min.mjs"),
  join(root, "_site/posts/ghq-agents-and-pr-workflow.html"),
];

for (const file of requiredFiles) {
  await access(file);
}

const index = await readFile(join(root, "_site/index.html"), "utf8");
const article = await readFile(
  join(root, "_site/posts/ghq-agents-and-pr-workflow.html"),
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
