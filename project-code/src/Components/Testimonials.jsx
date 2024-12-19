import React, { useState, useEffect } from 'react';
import './Homepage.css';

const testimonials = [
    "This platform changed my life! 💡",
    "The advice here is always spot on! 🕵️‍♂️",
    "Such a great community for guidance. 🤝",
    "Quick, simple, and anonymous advice. 🎉",
    "I love the reactions feature! ❤️"
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="testimonials-carousel">
            <div className="carousel-container">
                <div
                    className="carousel-content"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonial" key={index}>
                            {testimonial}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
