import React from 'react';
import "./Blogpage.css";
import Footer from './Footer';
import Navbarblog from './Navbarblog';

import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SubscribeSection from './SubscribeSection';

const Blogpage = () => {

    const similarRecipes = [
        {
            image: "https://iili.io/KtddCIs.md.jpg", // Replace with your image import or path
            title: "Fiery Chilli Prawns",
            desc: "Cooked with our signature Red Chilli Masala for the ultimate coastal taste.",
            info: "40 MIN · EASY PREP · 3 SERVES",
            isNew: false,

        },
        {
            image: "https://iili.io/KtddT42.md.jpg", // Replace with your image import or path
            title: "Golden Turmeric Curry",
            desc: "Dive into the velvety indulgence of our Decadent Chocolate Mousse. A dessert that transcends sweetness!",
            info: "30 MIN · MEDIUM PREP · 4 SERVES",
            isNew: true,

        },
    ];

    const blogdata = [
        {
            title: "PREHEAT AND PREPARE",
            items: [
                "Preheat your oven to 375°F (190°C).",
                "Rinse the chicken inside and out, then pat it dry with paper towels.",
            ],
        },
        {
            title: "CITRUS INFUSION",
            items: [
                "Carefully lift the skin of the chicken and rub minced garlic directly onto the meat.",
                "Place lemon slices under the skin, ensuring they cover as much surface as possible.",
            ],
        },
    ];

    const blogsection = [
        {
            title: "DO'S",
            items: [
                {
                    subtitle: "Thoroughly Clean Hands and Surfaces",
                    desc: "Before and after handling raw chicken, ensure your hands, utensils, and surfaces are clean to prevent cross-contamination."
                },
                {
                    subtitle: "Use Separate Cutting Boards",
                    desc: "Dedicate specific cutting boards for raw chicken to avoid the spread of bacteria to other foods."
                },
                {
                    subtitle: "Check Internal Temperature",
                    desc: "Invest in a reliable meat thermometer to ensure the chicken reaches the safe internal temperature of 165°F (74°C)."
                }
            ]
        },
        {
            title: "DONT'S",
            items: [
                {
                    subtitle: "Thaw Chicken at Room Temperature",
                    desc: "Avoid thawing chicken on the counter. Instead, thaw it in the refrigerator to prevent bacterial growth."
                },
                {
                    subtitle: "Overcrowd the Pan",
                    desc: "When roasting, ensure the chicken pieces have space between them for even cooking. Overcrowding can lead to unevenly cooked chicken."
                }
            ]
        }
    ];

    const sections = [
        {
            title: "INGREDIENTS",
            items: [
                "500g boneless chicken (cut into small cubes)",
                "2 tbsp ginger-garlic paste",
                "1 tsp red chili powder",
                "1 tsp Kashmiri chili powder (for color)",
                "1 tbsp corn flour",
                "2 tbsp rice flour",
                "1 egg",
                "2 tbsp curd (yogurt)",
                "1 tbsp lemon juice",
                "Salt to taste",
                "Oil for deep frying",
            ],
        },
        {
            title: "EQUIPMENT NEEDED FOR PREPARATION",
            items: [
                "2 tsp oil",
                "1 tsp mustard seeds",
                "8–10 curry leaves",
                "2 green chilies (slit)",
                "1 tsp red chili powder",
                "A pinch of salt",
            ],
        },
        {
            title: "NUTRITIONAL VALUE",
            items: [
                "Calories: ~250",
                "Protein: ~30g",
                "Total Fat: ~13g",
                "Carbohydrates: ~5g",
            ],
            note: "Per serving (based on a 4-pound chicken)",
        },
    ];


    return (
        <div
            className="blogpage-container" >
            {/* Header */}
            {/* <header className="blogpage-header">
                <img className="logo-btn" src={"https://iili.io/KZb4n1t.png"} alt="vibiSri-logo" />

                <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="blog-link" variant="button">Home</Typography>
                </Link>

                <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="blog-link" variant="button">Recipe</Typography>
                </Link>

                <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="blog-link" variant="button">Cooking Tips</Typography>
                </Link>

                <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className="blog-link" variant="button">About Us</Typography>
                </Link>

                <button className="search-btn">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <button className="subcribe-btn">Subscribe</button>
            </header> */}
            <Navbarblog/>

            {/* Main Content */}
            <div className="blog-content">
                <div className="blog-hero">
                    <h5 className="recipe-title">Recipe</h5>
                    <h2 className="blog-title">SPICY CHICKEN 65</h2>
                    <p className="item-description">
                        Welcome to Masala Magic, where every spice tells a story! Today, we dive into the fiery depths
                        of flavor with one of South India’s most iconic dishes — Spicy Chicken 65. Crispy, juicy, and
                        bursting with masala goodness, this dish is the perfect celebration of heat, aroma, and texture
                        that will awaken your taste buds like never before.
                    </p>

                    <div className="blog-timer">
                        <p className="rec">1 Hour</p>
                        <p className="rec">Hard Deep</p>
                        <p className="rec">4 Serves</p>
                    </div>
                </div>

                <img className="rec-logo" src={"https://iili.io/Ktddd1p.md.png"} alt="recipe" />

                <div className="blog-section">
                    <div className="blog-text" >
                        <p className="blog-text1">
                            Welcome to Masala Magic, where every spice tells a story! Today, we dive into the fiery
                            depths of flavor with one of South India’s most iconic dishes — Spicy Chicken 65. Crispy,
                            juicy, and bursting with masala goodness, this dish is the perfect celebration of heat,
                            aroma, and texture that will awaken your taste buds like never before.
                        </p>
                        <h3 className="blog-subtitle">Let’s go over the basics– the do’s, and the don’ts– for How to Cook a chicken</h3>
                        {blogsection.map((section, index) => (
                            <div key={index} className="blog-section-box">
                                <h2>{section.title}:</h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="blog-item">
                                        <h4 className='blog-item1'>{item.subtitle}</h4>
                                        <p className='blog-item12'>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <h3 className='blog-item2'>Instructions</h3>
                        <p className='blog-item3'>This recipe goes beyond the basics, inviting you to savor the richness of a creamy tomato basil sauce that clings to each strand of perfectly cooked pasta. It's a celebration of simplicity, where every ingredient plays a crucial role in creating a dish that is as comforting as it is delightful.</p>

                        <p className='blog-item3'>Allow the chicken to rest for 10 minutes before carving. This brief resting period is essential; it allows the juices to redistribute, ensuring each slice is succulent and bursting with flavor. As you carve into the golden exterior, be prepared for the enticing aroma that fills the air, signaling that your Citrus Infusion Delight is ready to be savored.</p>
                        {/* <h5 className='blog-item2'>Preheat and Prepare</h5> */}
                        {blogdata.map((data, index) => (
                            <div key={index} className="blog-instruction-box" style={{ width: '540px' }}>
                                <h4 className="blog-item4" style={{ color: ' rgba(238, 99, 82, 1)' }}>{data.title}</h4>
                                <ul>
                                    {data.items.map((point, i) => (
                                        <li key={i} className="blog-item5">{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <img className="rec-logo2" src={"https://iili.io/KtddK7t.md.png"} alt="recipe" />
                        <h4 className='blog-item4' style={{ color: ' rgba(238, 99, 82, 1)', }}>STEP 1: MARINATE THE CHICKEN</h4>
                        <ul>
                            <li className="blog-item5">Mix all the marinade ingredients in a bowl. Coat the chicken evenly and let it rest for at least 30 minutes to absorb all the masala flavors</li>
                        </ul>

                        <img className="rec-logo2" src={"https://iili.io/KtddJBR.md.png"} alt="recipe" />
                        <h4 className='blog-item4' style={{ color: ' rgba(238, 99, 82, 1)', }}>STEP 2: DEEP FRY THE CHICKEN</h4>
                        <ul>
                            <li className="blog-item5">Heat oil in a deep pan. Fry the marinated chicken pieces in batches until golden and crisp. Drain excess oil on a paper towel.</li>
                        </ul>

                        <img className="rec-logo2" src={"https://iili.io/Ktdd9Lv.md.jpg"} alt="recipe" />
                        <h4 className='blog-item4' style={{ color: ' rgba(238, 99, 82, 1)', }}>STEP 3: TEMPER THE FLAVOUR</h4>
                        <ul>
                            <li className="blog-item5">Heat oil in a deep pan. Fry the marinated chicken pieces in batches until golden and crisp. Drain excess oil on a paper towel.</li>
                        </ul>

                        <div className="icons">
                            <p>Share</p>
                            <div className="icon-img">
                                <FontAwesomeIcon icon={faInstagram} />
                            </div>
                            <div className="icon-img">
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </div>
                            <div className="icon-img">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                        </div>
                        <div className="icon-line"></div>

                        <div className="blog-author">
                            <img className="blog-author-pic" src={"https://iili.io/KtdJrzb.jpg"} alt="author" />
                            <div className='blog-author-info'>
                                <p className="blog-author-name">Written by <span style={{ fontWeight: '600' }}>VibiSri Team</span></p>
                                <p className="blog-author-desc">The VibiSri Team is passionate about bringing you the best in culinary delights, sharing recipes, tips, and stories that inspire your kitchen adventures.</p>
                                <p className='blog-reaadmore'>Learn More</p>
                            </div>

                        </div>
                    </div>


                    <div className="blog-feature-container">
                        {sections.map((section, index) => (
                            <div key={index} className="blog-feature">
                                <h3 className="blog-feature-title">{section.title}</h3>

                                {section.note && <p className="blog-feature-note">{section.note}</p>}

                                <ul className="blog-feature-list">
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>


                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="featured-section">
                <div className="header-wrapper">
                    <h4>Similar Recipes</h4>
                    <div className="header-btn">
                        <button className="arrow-btn left-arrow">&lt;</button>  {/* Left arrow */}
                        <button className="arrow-btn right-arrow">&gt;</button> {/* Right arrow */}
                    </div>

                </div>

                <div className="card-wrapper">
                    {similarRecipes.map((card, idx) => (
                        <div className="recipe-card" key={idx}>
                            <img src={card.image} alt={card.title} className="recipe-card-img" />
                            <div className="recipe-card-content">
                                <h3 className="recipe-card-title">{card.title}</h3>
                                <p className="recipe-card-desc">{card.desc}</p>
                                <div className="recipe-card-info">{card.info}</div>
                                <button className="view-recipe-btn">VIEW RECIPE</button>
                                {card.isNew && <span className="new-badge">NEW & HOT</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <SubscribeSection/>
            <Footer />
        </div>


    );
};

// Ensure this is the only default export in the file
export default Blogpage;
