import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = './posts'

function getTodayDate() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

function slugToTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function addMissingFrontmatter() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  let modified = false

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const slug = file.replace('.md', '')

    const { data, content: body } = matter(content)

    const needsUpdate =
      !data.title || !data.date || !data.description

    if (needsUpdate) {
      const newData = {
        title: data.title || slugToTitle(slug),
        date: data.date || getTodayDate(),
        description: data.description || '',
        ...data,
      }

      // Ensure order: title, date, description first
      const orderedData = {
        title: newData.title,
        date: newData.date,
        description: newData.description,
      }

      const newContent = matter.stringify(body, orderedData)
      fs.writeFileSync(filePath, newContent)
      console.log(`Updated: ${file}`)
      modified = true
    }
  }

  if (!modified) {
    console.log('No files needed updating.')
  }

  return modified
}

const wasModified = addMissingFrontmatter()
process.exit(wasModified ? 0 : 0)
