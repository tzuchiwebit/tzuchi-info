'use client'
import Container from "@/shared/layout/Container"
import Home from "@/components/home"

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function Page() {

  return <Container noPaddingTablet noPadding>
    <Home />
  </Container>
}
