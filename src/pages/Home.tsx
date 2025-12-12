import { useState, useEffect } from 'react'
import PostList, { PostMeta } from '../components/PostList'
import matter from 'gray-matter'

function Home() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}posts/index.json`)
        if (!response.ok) {
          throw new Error('Failed to load posts index')
        }
        const postFiles: string[] = await response.json()

        const loadedPosts: PostMeta[] = []

        for (const filename of postFiles) {
          const slug = filename.replace('.md', '')
          const postResponse = await fetch(`${import.meta.env.BASE_URL}posts/${filename}`)
          if (postResponse.ok) {
            const text = await postResponse.text()
            const { data } = matter(text)
            loadedPosts.push({
              slug,
              title: data.title || slug,
              date: data.date || '',
              description: data.description || '',
            })
          }
        }

        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(loadedPosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return <p className="loading">Loading posts...</p>
  }

  if (error) {
    return <p className="error">Error: {error}</p>
  }

  return <PostList posts={posts} />
}

export default Home
