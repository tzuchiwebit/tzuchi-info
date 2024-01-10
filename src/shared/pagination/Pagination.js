import { useState, useMemo } from "react";
import { styled } from "styled-components";
import color from "../styles/color";
import Icon from "../Icon";
import screens from "../styles/screens";

// const totalPage = 8;
const supportPage = 5;

export default function Pagination({ totalPage, currentPage, onPageChange = (page) => { } }) {
  const onPageModified = (page) => {
    onPageChange(page);
  };

  const startPageNumber = useMemo(() => {
    return Math.floor((currentPage - 1) / supportPage) * supportPage + 1;
  }, [currentPage]);

  const hadnlePageClick = (page) => {
    onPageModified(page);
  };

  const handleBackPageClick = () => {
    if (currentPage === 1) return;
    onPageModified(currentPage - 1);
  };
  const handleBackSupportPageClick = () => {
    // TODO : check button behavior
    if (currentPage <= supportPage) {
      onPageModified(1);
      return;
    }
    // setPage(startPageNumber - supportPage);
    onPageModified(startPageNumber - supportPage);
  };

  const handleNextPageClick = () => {
    if (currentPage === totalPage) return;
    onPageModified(currentPage + 1);
  };

  const handleNextSupportPageClick = () => {
    // TODO : check button behavior
    if (startPageNumber + supportPage >= totalPage) {
      // setPage(totalPage);
      onPageModified(totalPage);
      return;
    }
    // setPage(startPageNumber + supportPage);
    onPageModified(startPageNumber + supportPage);
  };

  return (
    <StyledPaginationContainer>
      <StyledPaginationItemContainer>
        <StyledPaginationIconButtonContainer>
          <StyledPaginationIconButton onClick={handleBackSupportPageClick}>
            <Icon.PageArrowLeftDouble />
          </StyledPaginationIconButton>
          <StyledPaginationIconButton onClick={handleBackPageClick}>
            <Icon.PageArrowLeft />
          </StyledPaginationIconButton>
        </StyledPaginationIconButtonContainer>
        {Array(supportPage)
          .fill(0)
          .map((_, index) => {
            const pageIndex = startPageNumber + index;
            return pageIndex;
          })
          .filter((pageIndex) => pageIndex <= totalPage) // Filter out elements greater than totalPage
          .map((pageIndex, index) => (
            <StyledPaginationText
              key={index}
              $active={pageIndex === currentPage}
              onClick={() => hadnlePageClick(pageIndex)}
            >
              {pageIndex}
            </StyledPaginationText>
          ))}
        <StyledPaginationIconButtonContainer>
          <StyledPaginationIconButton onClick={handleNextPageClick}>
            <Icon.PageArrowRight />
          </StyledPaginationIconButton>
          <StyledPaginationIconButton onClick={handleNextSupportPageClick}>
            <Icon.PageArrowRightDouble />
          </StyledPaginationIconButton>
        </StyledPaginationIconButtonContainer>
      </StyledPaginationItemContainer>
      <StyledPaginationDesc>{`第 ${currentPage} 頁，共 ${totalPage} 頁 `}</StyledPaginationDesc>
    </StyledPaginationContainer>
  );
}

const StyledPaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-top: 30px;
`;

const StyledPaginationItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  max-width: 420px;
`;

const StyledPaginationIconButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const StyledPaginationIconButton = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: ${color.secondary.light.blueGreen3};
`;

const StyledPaginationText = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$active ? color.primary.blue2 : color.gray.gray4)};
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  font-size: 20px;
`;

const StyledPaginationDesc = styled.div`
  color: ${color.gray.gray2};
  font-size: 18px;
  font-weight: 500;
`;
