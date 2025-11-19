import React from 'react';
import './Mainblog.css';

import Navbarblog from './Navbarblog';
import SubscribeSection from './SubscribeSection';
import Footer from './Footer';
import mainblogpic from '../blogpic/mainblogpic.jpg';

const Mainblog = () => {
    return (
        <div >
            <Navbarblog />
            <div className="w-full flex justify-center mt-8">
                
                <img
                    src={mainblogpic}
                    alt="Main Blog"
                    className=" w-[1098px] h-[540px] rounded-[32px] object-cover mt-10"
                />
                <div className=" w-[680px] h-[340px] z-20 rounded-[32px] absolute mt-[100px] ml-[200px] flex items-center justify-center">
                    <div className="blogtext-content">
                        <h1 class="blogtext-title">
                            UNLEASH THE FLAVOUR OF INDIA
                        </h1>
                        <p>From the fiery kick of Chili Powder to the aromatic blend of Garam Masala — discover spices that turn everyday cooking into a celebration.</p>
                        {/* <button>Explore More</button> */}
                    </div>
                </div>
                
                {/* <div className="explore-section">
                    <div className="explore-right">
                            <h2 className="explore-title">OUR DIVERSE PALATTE</h2>
                            <p>If you are a breakfast enthusiast, a connoisseur of savory delights, or on the lookout for irresistible desserts, our curated selection has something to satisfy every palate.</p>
                            <button className="explore-button">Explore More</button>
                    </div>
                    <div className="explore-left">

                    </div>
                </div> */}
            </div>
            <SubscribeSection />
            <Footer />
        </div>
    );
};

export default Mainblog;
