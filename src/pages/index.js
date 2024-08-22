import Container from "@/shared/layout/Container"
import Home from "@/components/home"
import { Metadata } from 'next'

export const metadata = {
  title: 'Builder.io - Visual Headless CMS',
  description: 'Build digital experiences for any tech stack, visually.',
}

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
