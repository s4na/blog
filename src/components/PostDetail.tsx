import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'

interface PostDetailProps {
  title: string
  date: string
  content: string
}

function PostDetail({ title, date, content }: PostDetailProps) {
  return (
    <article>
      <Link to="/" className="back-link">&larr; Back to posts</Link>
      <h1>{title}</h1>
      {date && <p className="post-date">{date}</p>}
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default PostDetail
