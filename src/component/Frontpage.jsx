
import React, { useState } from 'react'
import logo from '../PNG/Logo.webp'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import Chilli from "../PNG/Chillipowder.png"
import Vallar from "../PNG/Vallarai.png"
import Chicken65 from "../PNG/Chicken65.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
    faSearch,
    faHeart,
    faShoppingCart,
    faUser
  } from '@fortawesome/free-solid-svg-icons';
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import MailIcon from '@mui/icons-material/Mail';

import "./Frontpage.css"
const Frontpage = () => {

    const products = [
        { id: 1, title: "Chilli Powder", sideTitle: "South Spice Story", desc: "Flavors without compromise: South Indian Masala is the authentic taste of spices without additives.", price: 300, img: Chilli, bg: "#f5625d" },
        { id: 2, title: "Vallari Rice powder", sideTitle: "Insta Rice Powder", desc: "Quick Without Compromise: Instant Rice Powder brings authentic in mintues", price: 300, img: Vallar, bg: "#60c657" },
        { id: 3, title: "Chicken 65", sideTitle: "Ready to Mix", desc: "Flavors without compromise: South Indian Masala is the authentic taste of spices without additives.", price: 300, img: Chicken65, bg: "#d0b36f" },
    ];

    const [index, setIndex] = useState(0);

    const [animating, setAnimating] = useState(false);

    const handleChange = (newIndex) => {
        setAnimating(true);

        setTimeout(() => {
            setIndex(newIndex);
            setAnimating(false);
        }, 600); // match animation duration
    };


    const handleUp = () => handleChange((index - 1 + products.length) % products.length);
    const handleDown = () => handleChange((index + 1) % products.length);

    const handleSelect = (selectedIndex) => {
        // If the selected index is already the main, do nothing
        if (selectedIndex === index) return;
        handleChange(selectedIndex);
    };

    const main = products[index];

    const renderTitle = (title) => {
        const parts = title.split(' ');
        if (parts.length <= 2) return title;
        // join first two words with non-breaking space so they stay on one line
        const first = parts.slice(0, 2).join('\u00A0');
        const rest = parts.slice(2).join(' ');
        return (
            <>
                <span className="title-line1">{first}</span>

                <span className="title-line2">{rest}</span>
            </>
        );
    };


    const rightImages = [];
    for (let i = 1; i <= 3; i++) {
        rightImages.push(products[(index + i) % products.length]);
    }


    return <>
        <div className="front-conatiner" >

            {/* Navbar */}
            <div className="header">
                <div className="front-logo">
                    <img className="logo-btn" src={logo} alt='vibiSri-logo' />
                </div>
                <div className="navigate-path">
                    <div className="navigate-listitem">
                        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography className="navigate-Links" variant="button">Home</Typography>
                        </Link>
                        <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography className="navigate-Links" variant="button">Product</Typography>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography className="navigate-Links" variant="button">Contact</Typography>
                        </Link>
                        <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography className="navigate-Links" variant="button">Blog</Typography>
                        </Link>
                    </div>
                </div>
                <div className="navigate-icon">
                    <div className="list-icon">

                        <button className="icon-button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <Link to="/wishlist" style={{ textDecoration: "none", color: "inherit" }}>
                        <button className="icon-button">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        </Link>
                        <Link to="/add-to-cart" style={{ textDecoration: "none", color: "inherit" }}>
                        <button className="icon-button">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        </Link>
                        <Link to="/account" style={{ textDecoration: "none", color: "inherit" }}>
                        <button className="icon-button">
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero-Item */}

            {/* SINGLE CARD */}
            <div className="hero-card">

                {/* LEFT SIDE */}
                <div className={`left-side ${animating ? "side-zoom-out" : "side-zoom-in"}`} >
                    <h1>{renderTitle(main.title)}</h1>
                    <p>{main.desc}</p>
                    <h2>₹{main.price}</h2>
                    <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
                    <button>Shop Now →</button>
                    </Link>
                    <div className="social-icons">
                        <p>Follow Us ---</p>
                        <div className="icon-circle">
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                        <div className="icon-circle">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </div>
                        <div className="icon-circle">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>

                </div>

                {/* CENTER */}
                <div className="center-side">

                    <img src={main.img} alt={main.title} className={`main-img ${animating ? "zoom-out" : "zoom-in"}`} />
                    <div className="product-btn">
                        <button className="product-bt" onClick={handleUp}>← </button>
                        <button className="product-bt" onClick={handleDown}>→ </button>
                    </div>

                </div>

                {/* RIGHT SIDE*/}
                <div className="right-side">
                    {rightImages.map((p, i) => {
                        // compute the actual index in the products array for this right-side card
                        const productIndex = (index + 1 + i) % products.length;
                        return (
                            <div
                                key={p.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleSelect(productIndex)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(productIndex); }}
                                className={`side-card ${animating ? "side-zoom-out" : "side-zoom-in"}`}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="side-card-left" style={{ backgroundColor: p.bg }}>
                                    <img src={p.img} alt={p.title} className="side-card-left-img" />
                                </div>

                                <div className="side-card-right">
                                    <h5 className="side-title">{p.title}</h5>
                                    <div className="rating">{
                                        // simple star rating visual — replace with dynamic value if available
                                        <>
                                            <span className="stars">★★★★☆</span>
                                            <span className="rating-count">&nbsp;4.5</span>
                                        </>
                                    }</div>
                                    <p className="price">₹{p.price}</p>
                                </div>
                                <Link to="/add-to-cart" style={{ textDecoration: "none", color: "inherit" }}>
                                <button className="add-btn" aria-label={`Add ${p.title}`} onClick={(e) => { e.stopPropagation(); /* placeholder add action */ }}>
                                    +
                                </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>

    </>
}

export default Frontpage
