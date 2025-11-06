import React, { useEffect, useRef,useState  } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './HeaderHome'; // Separate Header component
import './Home.css'; // Import the main CSS file
import ProductCarousel from './ProductCarousel';
import SubscribeSection from './SubscribeSection';


// Register GSAP plugins globally onceS
gsap.registerPlugin(ScrollTrigger);

// Utility function exposed globally in original JS
function scrollProducts(direction) {
  const productWrapper = document.getElementById("productWrapper");
  if (productWrapper) {
    const scrollAmount = direction === 'left' ? -350 : 350; // Scroll by a fixed amount
    productWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// Expose the scroll function globally for use in inline HTML (React best practice is to move it, but keeping it close to the original intent)
window.scrollProducts = scrollProducts;




const Home = () => {
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const socialSidebarRef = useRef(null);
  const heroBottleWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productWrapperLeft, setProductWrapperLeft] = useState(0);
  const products = [
  {
    id: 1,
    imgSrc:'/assets/Chicken65.png',
    productName: "Spice Blends",
    releaseDate: "Release Date: 2023-04-01",
    description: "Handcrafted spice blends that bring traditional flavors to your kitchen."
  },
  {
    id: 2,
    imgSrc: '/assets/CurryMasala.png',
    productName: "Bulk Discounts",
    releaseDate: "Release Date: 2023-04-15",
    description: "Get bulk discounts on our premium spice blends and enjoy."
  },
  {
    id: 3,
    imgSrc: "/assets/CurryMasala.png",
    productName: "Spice Gifts",
    releaseDate: "Release Date: 2023-04-30",
    description: "Perfect for gifting, our spice blends come in attractive packaging."
  }
];
  const productsMain = [
    <img src={"https://iili.io/KZDbHXa.png"}  className="product-img-left" />,
    <img src=""  className="product-img" />,
    <img src={"https://iili.io/KZDbJLJ.png"}  className="product-img-right" />
  ];
  const scrollProducts = (direction) => {
    if (direction === 'left') {
      setProductWrapperLeft((prev) => Math.max(prev - 1, 0));
    } else if (direction === 'right') {
      setProductWrapperLeft((prev) => Math.min(prev + 1, products.length - 3));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted with:', event.target);
  };

  // ==========================
  // Initial Page Load Animations
  // ==========================
  const runInitialAnimations = () => {
    // Create a timeline with default easing
    const onLoadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    onLoadTl
      // Animate header border width expansion
      .to(
        headerRef.current,
        {
          '--border-width': "100%",
          duration: 3,
        },
        0
      )
      // Slide in desktop nav links only
      .from(
        ".desktop-nav a",
        {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      )
      // Removed sidebar animation
      // Fade in hero heading
      .to(
        ".hero-content h1",
        {
          opacity: 1,
          duration: 1,
        },
        0
      )
      // Animate text stroke to solid color
      .to(
        ".hero-content h1",
        {
          delay: 0.5,
          duration: 1.2,
          color: "var(--sienna)",
          "-webkit-text-stroke": "0px var(--sienna)",
        },
        0
      )
      // Slide in each line of the heading from the right
      .from(
        ".hero-content .line",
        {
          x: 100,
          delay: 1,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      )
      // Reveal the bottle wrapper
      .to(
        ".hero-bottle-wrapper",
        {
          opacity: 1,
          scale: 1,
          delay: 1.5,
          duration: 1.3,
          ease: "power3.out",
        },
        0
      )
      // Pop-in stamp image with scaling
      .to(
        ".hero-stamp",
        {
          opacity: 1,
          scale: 1,
          delay: 2,
          duration: 0.2,
          ease: "back.out(3)",
        },
        0
      )
      // Subtle vibration/bounce effect on the stamp
      .to(
        ".hero-stamp",
        {
          y: "+=5",
          x: "-=3",
          repeat: 2,
          yoyo: true,
          duration: 0.05,
          ease: "power1.inOut",
        },
        0
      );
  };

  // ==========================
  // Reusable Scroll-Based Animation Setup
  // ==========================
  const pinAndAnimate = ({
    trigger,
    endTrigger,
    pin,
    animations,
    markers = false,
    headerOffset = 0,
  }) => {
    // Define scroll end position with header offset
    const end = `top top+=${headerOffset}`;

    // Create a GSAP timeline connected to ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: `top top+=${headerOffset}`,
        endTrigger,
        end,
        scrub: true,
        pin,
        pinSpacing: false,
        markers: markers, // for debugging
        invalidateOnRefresh: true, // ensures recalculation on resize
      },
    });

    // Loop through each animation object
    animations.forEach(({ target, vars, position = 0 }) => {
      tl.to(target, vars, position);
    });
  };

  // ==========================
  // ScrollTrigger Configurations for Desktop & Mobile
  // ==========================
  const setupScrollAnimations = () => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    // Get the header's height and subtract 1px for the offset
    const headerOffset = headerElement.offsetHeight - 1;

    // Clear existing ScrollTriggers to prevent duplicates on refresh/hot reload
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Use matchMedia to handle responsive behaviors
    ScrollTrigger.matchMedia({
      // Desktop scroll animations
      "(min-width: 769px)": function () {
        // 1. Bottle animates on scroll from hero to intro
        pinAndAnimate({
          trigger: ".hero",
          endTrigger: ".section-intro",
          pin: heroBottleWrapperRef.current,
          animations: [
            { target: ".hero-bottle", vars: { rotate: 0, scale: 0.8 } },
            { target: heroBottleWrapperRef.current, vars: { x: "30%" } },
          ],
          headerOffset,
        });

        // 2. Bottle shifts right during the intro section
        pinAndAnimate({
          trigger: ".section-intro",
          endTrigger: ".third-section",
          pin: heroBottleWrapperRef.current,
          animations: [
            { target: ".hero-bottle", vars: { rotate: 0, scale: 0.7 } },
            { target: heroBottleWrapperRef.current, vars: { x: "35%"} },
          ],
          markers: false,
          headerOffset,
        });

       

         // Cleanup for desktop matchMedia
         return () => {
             // Reverts the ScrollTriggers created in this matchMedia to their original state
             ScrollTrigger.getAll().forEach(t => t.revert());
         };
      },

      // Mobile fallback animation (no scroll-based logic)
      "(max-width: 768px)": function () {
        gsap.to(heroBottleWrapperRef.current, {
          opacity: 1,
          duration: 1,
          delay: 0.5,
        });

        // Cleanup for mobile matchMedia
         return () => {
             // Reverts the ScrollTriggers created in this matchMedia to their original state
             ScrollTrigger.getAll().forEach(t => t.revert());
         };
      },
    });
  };

   const handlePrevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };


  // Main Effect for component lifecycle
  useEffect(() => {
    // Wait for the DOM to be fully painted/measured before starting animations
    // This is crucial for GSAP's .offsetHeight in setupScrollAnimations
    const timer = setTimeout(() => {
        runInitialAnimations();
        setupScrollAnimations();
        ScrollTrigger.refresh();
    }, 100); // Small delay to ensure all DOM elements are mounted and measured

    // Cleanup function for when the component unmounts
    return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach(t => t.kill());
        ScrollTrigger.refresh(); // Recommended to refresh after killing triggers
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div id="smooth-wrapper">
      <div className="announcement-bar">
        <div className="announcement-content">
          <p className="marquee-text">
            <span className="offer">🌶️ Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas,</span>
            <span className="offer">🚚 Free Delivery on Orders Above ₹499 – Shop Now!,</span>
            <span className="offer">🔥 Festive Offer: Get Flat 20% OFF on All Masalas – Limited Time Only!</span>
          </p>
        </div>
      </div>

      <Header ref={headerRef} />

      <main id="smooth-content" ref={mainRef} className="aligned-main">
        {/* Pass ref to the bottle wrapper for ScrollTrigger pinning */}
        <div className="hero-bottle-wrapper" ref={heroBottleWrapperRef}>
          {/* Note: In a real React project, you'd import images or use the public folder */}
          <img src={"https://iili.io/KZDbFgp.png"} alt="Vibishri Chilli Powder Pouch" className="hero-bottle" />
        </div>

        <section className="hero vintage-hero">
          <div className="hero-content">
            <img src={"https://iili.io/KZpO1kl.png"} alt="Crimson Fermentation Stamp" className="hero-stamp" />
            <h1>
              <span className="line">Vibishri</span>
              <span className="line highlight">Homemade</span>
            </h1>
          </div>
        </section>

        <section className="section-intro">
          <div className="intro-grid">
            <div className="intro-left" style={{ marginTop: '25%' }}>
              <h2 className="main-heading">The Heritage Line</h2>
              <p className="description">
                Experience the authentic taste of tradition. Our masalas are
                hand-ground in small batches, ensuring every spice is potent,
                fragrant, and full of the flavour passed down through generations.
                Pure, potent, and proudly homemade.
              </p>
              <a href="#" className="cta-box">Explore All</a>
            </div>

            <div className="intro-right">
              <div className="ingredients-log">
                <h3 className="ingredients-title">Hand-Ground With</h3>

                {/* Ingredient Items */}
                <div className="ingredient-item">
                  <div className="ingredient-qty">50g</div>
                  <div className="ingredient-text">
                    <strong>Sun-Dried Chillies</strong>
                    <p>Selected for their deep colour and fiery potency.</p>
                  </div>
                </div>
                {/* ... other ingredient items ... */}
                <div className="ingredient-item">
                  <div className="ingredient-qty">25g</div>
                  <div className="ingredient-text">
                    <strong>A-Grade Coriander</strong>
                    <p>Roasted lightly to unlock nutty, citrus notes.</p>
                  </div>
                </div>
                <div className="ingredient-item">
                  <div className="ingredient-qty">10g</div>
                  <div className="ingredient-text">
                    <strong>Cumin Seeds</strong>
                    <p>The essential earthy and warm base of the blend.</p>
                  </div>
                </div>
                <div className="ingredient-item">
                  <div className="ingredient-qty">5g</div>
                  <div className="ingredient-text">
                    <strong>Turmeric Root</strong>
                    <p>Freshly milled for vibrant colour and health benefits.</p>
                  </div>
                </div>
                <div className="ingredient-item">
                  <div className="ingredient-qty">2g</div>
                  <div className="ingredient-text">
                    <strong>Fenugreek (Methi)</strong>
                    <p>A touch of bitterness for depth and balance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="third-section">
          <h2 className="carousel-title">Our Masala Range</h2>
          <div className="carousel-container">
            <button className="scroll-button left" onClick={() => scrollProducts('left')}>
              &lt;
            </button>

            <div className="product-wrapper" style={{ transform: `translateX(-${productWrapperLeft * 100}%)` }}>
              {productsMain.map((product, index) => (
                <div key={index} className="product-card-image">
                  {product}
                </div>
              ))}
            </div>

            <button className="scroll-button right" onClick={() => scrollProducts('right')}>
              &gt;
            </button>
          </div>
        </section>
        <div className="w-[90%] lg:w-[70%] mx-auto my-24">
            <ProductCarousel
                products={[
                {
                    id: '1',
                    name: 'Premium Health Mix',
                    description: 'A carefully crafted blend of superfoods...',
                    price: '₹299',
                    releaseDate: 'January 20, 2026',
                    image: 'https://iili.io/Kt9WrEG.png',
                    detailImage:'https://iili.io/KtH0Hjs.png',
                    category: 'Health & Wellness'
                },
                {
                    id: '2',
                    name: 'Premium Millet',
                    description: 'A carefully crafted blend of superfoods...',
                    price: '₹349',
                    releaseDate: 'January 20, 2026',
                    image: 'https://iili.io/Kt9W44f.png',
                    detailImage:'https://iili.io/KtH0JZG.png',
                    category: 'Health & Wellness'
                }
                ]}
            />
        </div>

        <div className="w-[92%] lg:w-[70%] mx-auto my-20 pb-12">
            <SubscribeSection />
        </div> 
        

        {/* Sidebar */}
        <aside className="social-sidebar">
          <nav className="category-nav">
            <a href="#masala-range" className="active">🌶️ Shop All Masalas</a>
            <a href="#rice-mixes">🍚 Rice Mixes</a>
            <a href="#health-powders">🌿 Health Powders</a>
            <a href="#best-sellers">🎁 Best Sellers</a>
          </nav>
        </aside>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Vibishri</div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-contact">
            <a href="#">hello@craftedge.com</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/9566934011?text=Hello!%20I%20need%20assistance."
        target="_blank"
        id="whatsappFloat"
        aria-label="Chat on WhatsApp"
        rel="noopener noreferrer"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" />
      </a>
    </div>
  );
};

export default Home;