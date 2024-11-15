import dayjs from "dayjs";

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      // block: "start",
      behavior: "smooth",
    });
    window.location.hash = `#${id}`;
  }
};

export const validateArticle = ({ state, publishUp, publishDown }) => {
  if (state === 1) {
    // if (!!publishUp && dayjs().isBefore(dayjs(publishUp))) return false
    // if (!!publishDown && dayjs().isAfter(dayjs(publishDown))) return false
    return true
  }
  return false
}
