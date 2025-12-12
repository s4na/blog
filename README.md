# Blog

React + TypeScript + Vite で構築されたブログサイトです。GitHub Pages でホスティングされます。

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## 記事の追加方法

1. `posts/` ディレクトリに Markdown ファイルを作成します
2. ファイルの先頭に YAML フロントマターを追加します
3. `posts/index.json` にファイル名を追加します

### 記事フォーマット

```markdown
---
title: "記事タイトル"
date: "2025-01-01"
description: "記事の説明"
---

記事本文をここに書きます。

## Markdown記法が使えます

- リスト
- コードブロック
- 引用
- など
```

### index.json の更新

新しい記事を追加したら、`posts/index.json` にファイル名を追加してください：

```json
["hello-world.md", "new-post.md"]
```

## GitHub Pages の設定

1. リポジトリの Settings > Pages を開きます
2. Source で **GitHub Actions** を選択します
3. main ブランチにプッシュすると自動的にデプロイされます

デプロイ後、`https://<username>.github.io/blog/` でアクセスできます。

## 技術スタック

- React 18
- TypeScript
- Vite
- react-router-dom
- react-markdown
- gray-matter
- GitHub Actions
