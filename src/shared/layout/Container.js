'use client'
import styled from 'styled-components';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function Container({children, ...props }) {
  // Tailwind CSS
  // const extendStyles = className || '';
  return (
    <Outer className='flex' {...props}>
      <Inner>
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
  @media(min-width: 1180px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`
