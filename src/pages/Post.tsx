import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import matter from 'gray-matter'
import PostDetail from '../components/PostDetail'

function Post() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<{ title: string; date: string; content: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const text = await response.text()
        const { data, content } = matter(text)
        setPost({
          title: data.title || slug || '',
          date: data.date || '',
          content,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadPost()
    }
  }, [slug])

  if (loading) {
    return <p className="loading">Loading post...</p>
  }

  if (error) {
    return <p className="error">Error: {error}</p>
  }

  if (!post) {
    return <p className="error">Post not found</p>
  }

  return <PostDetail title={post.title} date={post.date} content={post.content} />
}

export default Post
