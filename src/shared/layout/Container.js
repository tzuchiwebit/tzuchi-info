'use client'
import styled from 'styled-components';
import screens from '../styles/screens';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function Container({
  children,
  noPadding = false,
  noPaddingTablet = false,
  noPaddingContainer = false,
  ...props
}) {
  // Tailwind CSS
  // const extendStyles = className || '';
  return (
    <Outer className='flex' {...props}>
      <Inner 
        $noPadding={noPadding}
        $noPaddingTablet={noPaddingTablet}
        $noPaddingContainer={noPaddingContainer}>
        {children}
      </Inner>
    </Outer>
  );
}

const Outer = styled.div`
  width: 100%;
  justify-content: center;
`

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding-left: ${(props) => props.$noPadding ? '0' : '10px'};
  padding-right: ${(props) => props.$noPadding ? '0' : '10px'};
  @media(min-width: ${screens.tablet}) {
    padding-left: ${(props) => props.$noPaddingTablet ? '0' : '13px'};
    padding-right: ${(props) => props.$noPaddingTablet ? '0' : '13px'};
  }
  @media(min-width: ${screens.container}) {
    padding-left: ${(props) => props.$noPaddingContainer ? '0' : '10px'};
    padding-right: ${(props) => props.$noPaddingContainer ? '0' : '10px'};
  }
`
