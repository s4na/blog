import { Link } from 'react-router-dom'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
}

interface PostListProps {
  posts: PostMeta[]
}

function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p>No posts yet.</p>
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <h2 className="post-title">
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="post-date">{post.date}</p>
          <p className="post-description">{post.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default PostList
