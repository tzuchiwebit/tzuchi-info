'use client'
import Container from "@/shared/layout/Container"
import Home from "@/components/home"

export default async function Page() {

  return <Container noPaddingTablet noPadding>
    <Home />
  </Container>
}
