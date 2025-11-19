import React from 'react'
import './Navbarblog.css'

import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Navbarblog = () => {
  return (
    <header className="blogpage-header">
    <img className="logo-btn" src={"https://iili.io/KZb4n1t.png"} alt="vibiSri-logo" />

    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography className="blog-link" variant="button">Home</Typography>
    </Link>

    <Link to="/recipe" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography className="blog-link" variant="button">Recipe</Typography>
    </Link>

    <Link to="/blog-page" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography className="blog-link" variant="button">Blog</Typography>
    </Link>

    <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography className="blog-link" variant="button">About Us</Typography>
    </Link>

    <button className="search-btn">
        <FontAwesomeIcon icon={faSearch} />
    </button>

    <button className="subcribe-btn">Subscribe</button>
</header>
  )
}

export default Navbarblog
