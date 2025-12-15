import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import matter from 'gray-matter'
import PostDetail from '../components/PostDetail'

const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', import: 'default' })

function Post() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<{ title: string; date: string; content: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      const path = `/posts/${slug}.md`
      const loader = postFiles[path]

      if (!loader) {
        setError('Post not found')
        setLoading(false)
        return
      }

      const content = await loader() as string
      const { data, content: body } = matter(content)
      setPost({
        title: data.title || slug || '',
        date: data.date || '',
        content: body,
      })
      setLoading(false)
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
