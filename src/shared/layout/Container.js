'use client'
import styled from 'styled-components';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function Container({ className, children }) {
  // Tailwind CSS
  // const extendStyles = className || '';
  return (
    // <div className={`w-[90%] mx-auto my-0 md:max-w-[1168px] ${extendStyles}`}>
    //   {children}
    // </div>
    <Outer>
      <Inner>
        {children}
      </Inner>
    </Outer>
  );
}

const Outer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding-left: 10px;
  padding-right: 10px;
`