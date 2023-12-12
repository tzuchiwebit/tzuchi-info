import Container from "@/shared/layout/Container"
import Home from "@/components/home"
import { generateRSS } from '@/utils/feed'

export default async function Page() {

  await generateRSS();

  return <Container>
    <Home />
  </Container>
}
