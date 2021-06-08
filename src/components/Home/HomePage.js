import React from 'react';
import intro from '../../intro.svg';
import '../../App.css';
import oxygen from '../../images/oxygen.jpg';
import covid from '../../images/covid19.jpeg';
import food from '../../images/food.webp';
import plasma from '../../images/plasma.jpg';
import globe from '../../images/globe.jpg';
import injection from '../../images/injection (2).jpg';
import smiley from '../../images/smiley.jpg';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return(
        <>
        <div className="container-1">
             <div className="item-1_container-1">
                 <p className="header">Covidon</p> 
                 <p className="desc">
                     We help you to connect with people who provide resources.
                 </p>
                 <Link to='/signin'>
                 <button className="btn" >
                     Discover resources
                 </button>
                 </Link>
             </div>
             <img src={intro} alt='Homescreen' className="item-2_container-1"/>
        </div>
        <div className="container-2">
            <img src={covid} className="item1-container-2"/>
            <img src={injection} className="item2-container-2"/>
            <img src={oxygen} className="item3-container-2"/>
            <img src={food} className="item4-container-2"/>
            <img src={plasma} className="item5-container-2"/>
            <img src={globe} className='item7-container-2' />
            <img src={smiley} className="item8-container-2"/>
            <div className="item6-container-2">
                <h1>Are you in need of any help?</h1>
                <p className="subtitle-1">We provide you a platform to get help quicker and faster from your location</p>
                <Link  to='/signin'>
                <button className="btn-2" >
                     Post Need
                 </button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default HomePage;
