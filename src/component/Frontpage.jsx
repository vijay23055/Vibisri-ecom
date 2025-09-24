
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

import "./Frontpage.css"
const Frontpage = () => {

    const products = [
        { id: 1, title: "South Spice Story", desc: "Flavors without compromise: South Indian Masala is the authentic taste of spices without additives.", price: 300, img: Chilli, bg: "#f5625d" },
        { id: 2, title: "Vallari Rice powder", desc: "Authentic Vallari rice taste...", price: 300, img: Vallar, bg: "#60c657" },
        { id: 3, title: "Chicken 65", desc: "Healthy multigrain mix...", price: 300, img: Chicken65, bg: "#d0b36f" },
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

    const main = products[index];

    
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
                        <IconButton className='icon-color'>
                            <SearchIcon />
                        </IconButton>
                        <IconButton className='icon-color'>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton className='icon-color'>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton className='icon-color'>
                            <PersonOutlineIcon />
                        </IconButton>
                    </div>
                </div>
            </div>

            {/* Hero-Item */}

            {/* SINGLE CARD */}
            <div className="hero-card">

                {/* LEFT SIDE */}
                <div className={`left-side ${animating ? "side-zoom-out" : "side-zoom-in"}`} >
                    <h1>{main.title}</h1>
                    <p>{main.desc}</p>
                    <h2>₹{main.price}</h2>
                    <button>Shop Now</button>
                </div>

                {/* CENTER */}
                <div className="center-side">

                    <img src={main.img} alt={main.title}  className={`main-img ${animating ? "zoom-out" : "zoom-in"}`} />
                    <button onClick={handleUp}>Up</button>
                    <button onClick={handleDown}>Down</button>
                </div>

                {/* RIGHT SIDE*/}
                <div className="right-side">
                    {rightImages.map((p) => (
                        <div key={p.id} className={`side-card ${animating ? "side-zoom-out" : "side-zoom-in"}`} style={{ backgroundColor: p.bg }}>
                            <img src={p.img} alt={p.title} className="side-card-img" />
                            <div className="side-card-info">
                                <h5>{p.title}</h5>
                                <p>₹{p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>

    </>
}

export default Frontpage
