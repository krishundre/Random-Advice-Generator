import React, { useState, useEffect } from "react";
import "./AdviceOfDay.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const AdviceOfDay = () => {
    const [advice, setAdvice] = useState("");

    // Function to fetch a random advice
    const fetchRandomAdvice = async () => {
        try {
            const adviceCollection = collection(db, "advices");
            const adviceSnapshot = await getDocs(adviceCollection);
            const adviceList = adviceSnapshot.docs.map((doc) => doc.data().advice);

            if (adviceList.length > 0) {
                const randomIndex = Math.floor(Math.random() * adviceList.length);
                setAdvice(adviceList[randomIndex]);
            } else {
                setAdvice("No advice available for today. Stay positive! 😊");
            }
        } catch (error) {
            console.error("Error fetching advice:", error);
            setAdvice("Unable to fetch advice. Please try again later.");
        }
    };

    // Fetch advice once and set a timer to reset at midnight
    useEffect(() => {
        fetchRandomAdvice();

        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // Set the time to midnight
        const timeUntilMidnight = midnight - now;

        const timer = setTimeout(() => {
            fetchRandomAdvice();
        }, timeUntilMidnight);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="advice-of-day">
            <h2 className="advice-heading">Advice of the Day 🌟</h2>
            <p className="advice-text">{advice}</p>
        </div>
    );
};

export default AdviceOfDay;
