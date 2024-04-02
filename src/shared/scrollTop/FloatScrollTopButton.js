'use client'
import { useState, useEffect } from "react"
import styled from "styled-components"
import screens from "../styles/screens"
import dayjs from "dayjs"
import Icon from "../Icon"
import color from "../styles/color"

const FloatScrollTopButton = ({ }) => {

    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to toggle visibility of the scroll-to-top button based on scroll position
    const toggleVisibility = () => {
        if (window.pageYOffset > 270) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Add event listener when the component mounts to track scroll position
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return <div className="fixed z-50 right-3 top-[60vh]">
        {
            isVisible ? <button
                onClick={() => scrollToTop()}
                className="w-[48px] h-[48px] bg-white flex text-gray-gray3 rounded-full shadow-elevation-3 p-0 items-center justify-center">
                <Icon.UpArrowMain style={{ width: 32 }} />
            </button> : <></>
        }
    </div>
}

export default FloatScrollTopButton
