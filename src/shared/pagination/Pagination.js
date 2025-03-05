import { useMemo } from "react";
import { styled } from "styled-components";
import color from "../styles/color";
import Icon from "../Icon";

/**
 * page button為：<-2, -1, <當前頁數>, +1, +2>
 * <<：為 -5
 * <：為 -1
 * >：為 +1
 * >>：為 +5
 */
const supportPage = 5;

export default function Pagination({ totalPage, currentPage, onPageChange = (page) => { } }) {
  const onPageModified = (page) => {
    onPageChange(page);
  };

  const hadnlePageClick = (page) => {
    onPageModified(page);
  };

  const handleBackPageClick = () => {
    if (currentPage === 1) return;
    onPageModified(currentPage - 1);
  };

  const handleBackSupportPageClick = () => {
    if (currentPage === 1) return;
    if (currentPage <= supportPage) {
      onPageModified(1);
      return;
    }
    onPageModified(currentPage - supportPage);
  };
  
  const displayPages = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
  
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
  
    if (currentPage >= totalPage - 2) {
      return [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }
  
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }, [currentPage, totalPage]);
  

  const handleNextPageClick = () => {
    if (currentPage === totalPage) return;
    onPageModified(currentPage + 1);
  };

  const handleNextSupportPageClick = () => {
    if (currentPage === totalPage) return;
    if (currentPage + supportPage >= totalPage) {
      onPageModified(totalPage);
      return;
    }
    onPageModified(currentPage + supportPage);
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
        {displayPages.map((pageIndex) => (
          <StyledPaginationText
            key={pageIndex}
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
  margin-bottom: 16px;
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
  &:hover {
    color: ${color.secondary.light.blueGreen2};
  }
  &:active {
    color: ${color.secondary.dark.blueGreen};
  }
`;

const StyledPaginationText = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$active ? color.primary.blue2 : color.gray.gray4)};
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  font-size: 20px;
  user-select: none;
`;

const StyledPaginationDesc = styled.div`
  color: ${color.gray.gray2};
  font-size: 18px;
  font-weight: 500;
  user-select: none;
`;
