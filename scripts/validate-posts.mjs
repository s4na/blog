import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import matter from "gray-matter";

const root = join(import.meta.dirname, "..");

const files = (await readdir(join(root, "posts"))).filter(
  (f) => extname(f) === ".md",
);

if (files.length === 0) {
  throw new Error("posts/ に .md ファイルが見つかりません");
}

const errors = [];

for (const file of files) {
  const raw = await readFile(join(root, "posts", file), "utf8");

  let data, content;
  try {
    ({ data, content } = matter(raw));
  } catch (e) {
    errors.push(`${file}: YAMLフロントマターの解析に失敗 — ${e.message}`);
    continue;
  }

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.push(`${file}: "title" は空でない文字列が必須`);
  }

  if (!data.date) {
    errors.push(`${file}: "date" は必須`);
  } else if (
    !(data.date instanceof Date) &&
    !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))
  ) {
    errors.push(`${file}: "date" は YYYY-MM-DD 形式か Date 値が必要`);
  }

  if (content.trim() === "") {
    errors.push(`${file}: 本文が空`);
  }
}

if (errors.length > 0) {
  for (const e of errors) {
    process.stderr.write(`  ✗ ${e}\n`);
  }
  process.exit(1);
}

console.log(`posts: ${files.length} 件すべて有効`);
