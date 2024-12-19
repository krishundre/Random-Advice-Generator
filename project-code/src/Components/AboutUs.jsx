import React from 'react';
import './AboutUs.css';
import aboutImg1 from "../Assets/aboutUs1.png"
import aboutImg2 from "../Assets/aboutUs2.png"

const AboutUs = () => {
    return (
        <div className="about-us-section">
            <div className="container">
                {/* First Row: Text on Left, Image on Right */}
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 about-text">
                        <p>
                            The story of <strong>Random Advice Generator</strong> started with a spark of fun and creativity. As a freelance frontend web developer, I, Krish Undre, used to work on various random projects like hotel management systems or online directories. Every time I completed a project, I’d send the URL to my best friend, Samiksha Baradia, for her feedback. She has an incredible eye for creativity and detail, always suggesting little tweaks that made my projects even better. One day, during a casual call, Samiksha asked, “Krish, give me a random piece of advice,” and without thinking, I said, “Don’t miss outings with your cousins!” We both laughed, and then I asked her for advice. She replied, “Don’t cross lines with your College HOD!” It became a fun back-and-forth, and right there, the seed for the Random Advice Generator was planted. 🌱
                        </p>
                        <p>
                            The idea got us thinking, "What if we create a website that gives random advice to users?" We spent the next half hour brainstorming ideas, adding features, and discussing what could make it interesting. I jotted everything down in my diary, but life got busy, and the project was left on the back burner.
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-12 about-image">
                        <img src={aboutImg1} alt="Friends on Call" className="about-img" />
                    </div>
                </div>

                {/* Second Row: Image on Left, Text on Right */}
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 about-image">
                        <img src={aboutImg2} alt="Friends Working on Project" className="about-img" />
                    </div>
                    <div className="col-lg-6 col-md-12 about-text">
                        <p>
                            Fast forward a year, during my first year of MCA at MES’s IMCC, we got assigned our first group project. I teamed up with Vaibhavi Kulkarni, and during our project discussion, I mentioned the idea of the Random Advice Generator. Her immediate reaction was, "That’s something out of the box!" 💡
                        </p>
                        <p>
                            With her enthusiasm and Samiksha’s original spark of creativity, we decided to bring the project to life. The idea grew from a casual conversation into something we were genuinely excited to build. Now, here we are, a team of three – <strong>Samiksha Baradia</strong>, <strong>Krish Undre</strong>, and <strong>Vaibhavi Kulkarni</strong> – working together to share random, fun, and sometimes thought-provoking advice with the world. 😄
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
