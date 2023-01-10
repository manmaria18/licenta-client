import React, { Component } from 'react';
import { getAllHomes,} from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import './TestTheme.css';


import {MapView} from '../components/map/MapView'
import HouseView from "../components/house/HouseView";


class TestTheme extends Component {



    render() {

        return (<div>

            <header id="top-header" className="header-home">
                <div className="grid">
                    <div className="col-1-1">
                        <div className="content">
                            <div className="logo-wrap">
                                <a href="#0" className="logo">The7</a>
                            </div>
                            <nav className="navigation">
                                <input type="checkbox" id="nav-button"/>
                                    <label htmlFor="nav-button" onclick></label>
                                    <ul className="nav-container">
                                        <li><a href="#home" className="current">Home</a></li>
                                        <li><a href="#services">Services</a></li>
                                        <li><a href="#work">Work</a></li>
                                        <li><a href="#blog">Blog</a></li>
                                        <li><a href="#pricing">Pricing</a></li>
                                        <li><a href="#team">Team</a></li>
                                        <li><a href="#contact">Contact</a></li>
                                    </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div className="parallax-section parallax1">
                <div className="grid grid-pad">
                    <div className="col-1-1">
                        <MapView height={600}
                                 defaultCenter={[46.7833643, 23.5464727]}
                                 defaultZoom={12}
                        />
                    </div>
                </div>
            </div>

            <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
            </svg>


            <div className="wrap services-wrap" id="services">
                <section className="grid grid-pad services">
                    <h2>Our Services</h2>
                    <div className="col-1-4 service-box service-1" >
                        <div className="content">
                            <div className="service-icon">
                                <i className="circle-icon icon-heart4"></i>
                            </div>
                            <div className="service-entry">
                                <h3>Lovely Design</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat tellus eget libero pretium, sollicitudin feugiat libero.</p>
                                <a className="btn read-more" href="#0">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-4 service-box service-2" >
                        <div className="content">
                            <div className="service-icon">
                                <i className="circle-icon icon-star4"></i>
                            </div>
                            <div className="service-entry">
                                <h3>Great Concept</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat tellus eget libero pretium, sollicitudin feugiat libero.</p>
                                <a className="btn read-more" href="#0">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-4 service-box service-3">
                        <div className="content">
                            <div className="service-icon">
                                <i className="circle-icon icon-display"></i>
                            </div>
                            <div className="service-entry">
                                <h3>Development</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat tellus eget libero pretium, sollicitudin feugiat libero.</p>
                                <a className="btn read-more" href="#0">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-4 service-box service-4" >
                        <div className="content">
                            <div className="service-icon">
                                <i className="circle-icon icon-user6"></i>
                            </div>
                            <div className="service-entry">
                                <h3>User Friendly</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat tellus eget libero pretium, sollicitudin feugiat libero.</p>
                                <a className="btn read-more" href="#0">Read More</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
            </svg>

            <div className="wrap grey recent-wrap" id="work">
                <section className="grid grid-pad">
                    <h2>Recent Work</h2>
                   
                    <div className="col-1-1 mix">
                        <ul className="filters">
                            <li className="filter active" data-filter="all">All</li>
                            <li className="filter" data-filter=".illustration">Illustration</li>
                            <li className="filter" data-filter=".web-design">Web Design</li>
                            <li className="filter" data-filter=".photography">Photography</li>
                        </ul>
                    </div>
                   
                    <div className="portfolio-items">
                        <div className="col-1-3 mix illustration">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/1-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Illustration</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:illustration"
                                                   title="Asian tourist - Illustration" href="images/work/1-big.jpg">Asian
                                                tourist</a></h2>
                                        </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix photography">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/5-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Photography</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:photography"
                                                   title="Blue flowers - Photography" href="images/work/5-big.jpg">Blue
                                                flowers</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix illustration">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/2-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Illustration</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:illustration"
                                                   title="Batman Wannabe - Illustration" href="images/work/2-big.jpg">Batman
                                                Wannabe</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix photography">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/8-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Photography</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:photography"
                                                   title="Big city and dreams - Photography"
                                                   href="images/work/8-big.jpg">Big city and dreams</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix web-design">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/6-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Web Design</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:webdesign"
                                                   title="Minimal nature - Web Design" href="images/work/6-big.jpg">Minimal
                                                nature</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix web-design">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/3-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Illustration</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:illustration"
                                                   title="Jack the sailor - Illustration" href="images/work/3-big.jpg">Jack
                                                the sailor</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix photography">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/7-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Photography</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:photography"
                                                   title="Enjoy live - Photography" href="images/work/7-big.jpg">Enjoy
                                                live</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix illustration">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/4-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Illustration</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:illustration"
                                                   title="Run kitty run - Photography" href="images/work/4-big.jpg">Run
                                                kitty run</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3 mix illustration">
                            <div className="content">
                                <div className="recent-work">
                                    <img src="images/work/9-small.jpg" alt=""/>
                                        <div className="overlay">
                                            <span>Web Design</span>
                                            <h2><a className="img-wrap" data-rel="lightcase:webdesign"
                                                   title="Would you? - Web Design" href="images/work/9-big.jpg">Would
                                                you?</a></h2>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-1-1"><a className="btn" href="#0">View More</a></div>

                </section>
            </div>


            <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                 viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
            </svg>


            <div className="wrap services-wrap">
                <section className="grid grid-pad">
                    <div className="col-1-1 service-box cl-client-carousel-container">
                        <div className="content">
                            <div className="cl-client-carousel">

                                <div className="item client-carousel-item">
                                    <div className="quotes-icon">
                                        <i className="icon-quotes-left"></i>
                                    </div>
                                    <p>The7 is an extraordinary, awesome Theme, I would recommend this Theme to anyone
                                        for their next project. Go ahead and download it now!</p>
                                    <h4>-David Bell</h4>
                                </div>
                                

                                <div className="item client-carousel-item">
                                    <div className="quotes-icon">
                                        <i className="icon-quotes-left"></i>
                                    </div>
                                    <p>The good times are for those who take action. The7 is a simple and easy to use
                                        template for creative people. Download this theme and give it a try!</p>
                                    <h4>-Eve Stinger</h4>
                                </div>
                                
                                <div className="item client-carousel-item">
                                    <div className="quotes-icon">
                                        <i className="icon-quotes-left"></i>
                                    </div>
                                    <p>Awesome theme! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Accusamus incidunt possimus eveniet aperiam, minus deleniti iure ipsa
                                        praesentium amet, labore voluptatum fugit earum, porro non sequi sint soluta
                                        reprehenderit ad?</p>
                                    <h4>-Will Peters</h4>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                 viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
            </svg>


            <div className="wrap" id="pricing">
                <div className="grid grid-pad">
                    <div className="content">
                        <div className="col-1-1">
                            <section id="price-tables">
                                <h2>Pricing Tables</h2>
                                <ul id="plans">
                                    <li className="plan">
                                        <ul className="plan-wrap">
                                            <li className="title"><h2>Economy</h2></li>
                                            <li className="price"><p>$10/m</p></li>
                                            <li>
                                                <ul className="options">
                                                    <li>1GB <span>Storage</span></li>
                                                    <li>2 <span>Clients</span></li>
                                                    <li>5 <span>Active Projects</span></li>
                                                    <li><span>Free Goodies</span></li>
                                                    <li>24/7 <span>Email support</span></li>
                                                </ul>
                                            </li>
                                            <li><a className="btn btn-price" href="#0">Purchase</a></li>
                                        </ul>
                                    </li>
                                    <li className="plan best-plan">
                                        <ul className="plan-wrap">
                                            <li className="title"><h2 className="best-plan-title">Personal</h2></li>
                                            <li className="price"><p className="best-plan-price">$20/m</p></li>
                                            <li>
                                                <ul className="options">
                                                    <li>5GB <span>Storage</span></li>
                                                    <li>10 <span>Clients</span></li>
                                                    <li>10 <span>Active Projects</span></li>
                                                    <li><span>Free Goodies</span></li>
                                                    <li>24/7 <span>Email support</span></li>
                                                </ul>
                                            </li>
                                            <li><a className="btn btn-price btn-best-plan" href="#0">Purchase</a></li>
                                        </ul>
                                    </li>
                                    <li className="plan">
                                        <ul className="plan-wrap">
                                            <li className="title"><h2>Business</h2></li>
                                            <li className="price"><p>$30/m</p></li>
                                            <li>
                                                <ul className="options">
                                                    <li>15GB <span>Storage</span></li>
                                                    <li>15 <span>Clients</span></li>
                                                    <li>15 <span>Active Projects</span></li>
                                                    <li><span>Free Goodies</span></li>
                                                    <li>24/7 <span>Email support</span></li>
                                                </ul>
                                            </li>
                                            <li><a className="btn btn-price" href="#0">Purchase</a></li>
                                        </ul>
                                    </li>
                                    <li className="plan">
                                        <ul className="plan-wrap">
                                            <li className="title"><h2>Profesional</h2></li>
                                            <li className="price"><p>$40/m</p></li>
                                            <li>
                                                <ul className="options">
                                                    <li>Unlimited <span>Storage</span></li>
                                                    <li>Unlimited <span>Clients</span></li>
                                                    <li>Unlimited <span>Active Projects</span></li>
                                                    <li><span>Free Goodies</span></li>
                                                    <li>24/7 <span>Email support</span></li>
                                                </ul>
                                            </li>
                                            <li><a className="btn btn-price" href="#0">Purchase</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>




        </div>);
    }
}

export default withRouter(TestTheme);