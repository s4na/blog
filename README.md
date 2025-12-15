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

`posts/` ディレクトリに Markdown ファイルを追加するだけで、自動的に記事として認識されます。

1. `posts/` ディレクトリに `.md` ファイルを作成
2. ファイルの先頭に YAML フロントマターを追加
3. 完了！（ビルド時に自動検出されます）

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

## GitHub Pages の設定

1. リポジトリの Settings > Pages を開きます
2. Source で **GitHub Actions** を選択します
3. main ブランチにプッシュすると自動的にデプロイされます

デプロイ後、`https://<username>.github.io/blog/` でアクセスできます。

## GitHub Actions の設定

フロントマター自動追加機能を使うには、以下の設定が必要です：

1. リポジトリの **Settings** > **Actions** > **General** を開きます
2. **Workflow permissions** セクションで以下を設定：
   - **Read and write permissions** を選択
   - **Allow GitHub Actions to create and approve pull requests** にチェック
3. **Save** をクリック

## 技術スタック

- React 18
- TypeScript
- Vite
- react-router-dom
- react-markdown
- gray-matter
- GitHub Actions
