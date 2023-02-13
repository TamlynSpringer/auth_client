import React from 'react';
import { Link } from 'react-router-dom';

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/products">Products</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/cart">Cart</Link>
      <Link to="/admin">Store admin page</Link>
      <Link to="/admin/super">Super admin page</Link>
    </section>
  )
}

export default LinkPage