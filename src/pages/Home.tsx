import { useState, useEffect } from 'react'
import PostList, { PostMeta } from '../components/PostList'
import matter from 'gray-matter'

const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', import: 'default' })

function Home() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts: PostMeta[] = []

      for (const path in postFiles) {
        const slug = path.replace('/posts/', '').replace('.md', '')
        const content = await postFiles[path]() as string
        const { data } = matter(content)
        loadedPosts.push({
          slug,
          title: data.title || slug,
          date: data.date || '',
          description: data.description || '',
        })
      }

      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setPosts(loadedPosts)
      setLoading(false)
    }

    loadPosts()
  }, [])

  if (loading) {
    return <p className="loading">Loading posts...</p>
  }

  return <PostList posts={posts} />
}

export default Home
