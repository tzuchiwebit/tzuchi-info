'use client'
import { useState, useEffect } from "react"
import styled from "styled-components"
import Icon from "../Icon"
import screens from "@/shared/styles/screens";

const StyledContainer = styled.div`
  position: fixed;
  z-index: 50;
  bottom: calc(80px + 72px + 16px);
  right: 32px;
  @media(min-width: ${screens.tablet}) {
    bottom: calc(90px + 72px + 16px);
  }
  @media(min-width: ${screens.laptop}) {
    bottom: calc(28px + 72px + 16px);
  }
`

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

    return <StyledContainer>
        {
            isVisible ? <button
                onClick={() => scrollToTop()}
                className="w-[48px] h-[48px] bg-white flex text-gray-gray3 rounded-full shadow-elevation-3 p-0 items-center justify-center">
                <Icon.UpArrowMain style={{ width: 32 }} />
            </button> : <></>
        }
    </StyledContainer>
}

export default FloatScrollTopButton
