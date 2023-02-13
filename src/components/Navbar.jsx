import {Link} from 'react-router-dom';
function NavBar() {
  return (
      <nav className={"navbar"}>
        <ul>
          <li>
            <Link to={'/'} className={"nav_button"}>Products</Link>
          </li>
          <li>
            <Link to={'/auth'} className={"nav_button"}>Login</Link>
          </li>
          <li>
            <Link to={'/register'} className={"nav_button"}>Register</Link>
          </li>
          <li>
            <Link to={'/cart'} className={"nav_button"}>Cart</Link>
          </li>
        </ul>
      </nav>
  )
}

export default NavBar;