import React from 'react'
import './Footer.css'

import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer-body">
            <div className="top">
                <h5>Vibi Cooks</h5>
                <div className="footer-links">
                <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="footer-link" variant="button">Home</Typography>
                </Link>

                <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="footer-link" variant="button">Recipe</Typography>
                </Link>

                <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="footer-link" variant="button">Cooking Tips</Typography>
                </Link>

                <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="footer-link" variant="button">About Us</Typography>
                </Link>
                </div>

                <div className="footer-icons">
                    <div className="footer-icon-img">
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="footer-icon-img">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </div>
                    <div className="footer-icon-img">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </div>
            </div>
            <div className="fotter-line"></div>
            <div className="bottom">
                <p>© 2024 Vibisri. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
