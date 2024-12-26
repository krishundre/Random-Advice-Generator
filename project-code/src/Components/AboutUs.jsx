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
                        <p><b>Krish's POV</b><br/>
                        The story of the Random Advice Generator began as a spark of fun and creativity. As a freelance frontend web developer, I, Krish Undre, often worked on random projects like hotel management systems or online directories. Each time I completed a project, I’d eagerly send the URL to my best friend, Samiksha Baradia, for her feedback. With her incredible eye for creativity and detail, she always had a way of suggesting just the right tweaks to make things shine.
                        </p>
                        <p>
                        One day, during a casual call, Samiksha asked, “Krish, give me a random piece of advice,” and without much thought, I said, “Don’t miss outings with your cousins!” We both laughed, and I threw the question back at her. She quipped, “Don’t cross lines with your College HOD!” It turned into this fun exchange, sparking laughter and a little wisdom. That’s when the seed for the Random Advice Generator was planted. 🌱
                        </p>
                        <p>
                        The idea fascinated us: “What if we created a website to share random advice?” That single moment led to a brainstorming session full of ideas for features and creative touches, all jotted down in my diary. However, life got busy, and the idea was shelved for later.
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
                        <p><b>Vaibhavi's POV</b><br/>
                        Fast forward a year, during my first year of MCA at MES’s IMCC, I had the chance to team up with Krish for a group project. During our brainstorming session, he mentioned this old idea about a “Random Advice Generator” that he and Samiksha had come up with. The moment I heard it, I was hooked. “That’s something out of the box!” I told him. The concept felt simple yet unique, and I could already see the potential for a fun and engaging project.
                        </p>
                        <p>
                        We decided to make it a reality, and from the start, it felt like a true collaboration.While I and Krish handled the technical aspects and focused on refining ideas and helping polish the overall execution, Samiksha brought her creative flair. Together, we built on each other’s strengths, transforming a casual idea into something meaningful and exciting.
                        </p>
                        <p>
                        For me, the best part was how seamlessly we worked as a team. What started as a spontaneous suggestion between Krish and Samiksha became a shared dream, and each of us added something special. Today, I’m proud to say the Random Advice Generator isn’t just a fun project; it’s a blend of our shared creativity and teamwork, ready to spread random, thought-provoking advice to the world. 😄
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
