import color from "./color"
import styled, { css } from 'styled-components';

// Reusable CSS block
export const LinkFontStyles = css`
    color: ${color.primary.blue2};
    &:hover {
        color: ${color.primary.blue3};
    }
    &:active {
        color: ${color.primary.blue1};
    }
`;

// Apply the CSS block to a styled component
export const Linkfont = styled.a`
  ${LinkFontStyles}
`;
