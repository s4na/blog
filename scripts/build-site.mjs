import { cp, mkdir, rm } from "node:fs/promises";

await rm("_site", { force: true, recursive: true });
await mkdir("_site/posts", { recursive: true });

for (const file of [".nojekyll", "index.html", "styles.css"]) {
  await cp(file, `_site/${file}`);
}

await cp("posts", "_site/posts", { recursive: true });
