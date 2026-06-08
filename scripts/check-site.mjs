import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  ".nojekyll",
  "posts/ghq-agents-and-pr-workflow.html",
];

for (const file of requiredFiles) {
  await access(file);
}

const index = await readFile("index.html", "utf8");
const article = await readFile("posts/ghq-agents-and-pr-workflow.html", "utf8");

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
