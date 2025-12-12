import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/">Blog</Link>
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
