import styled from "styled-components"
import screens from "@/shared/styles/screens"
// import color from "@/shared/styles/color"

const OuterContainer = styled.div`
    flex-basis: 49%;
    width: 49%;
    @media(min-width: ${screens.tablet}) {
        flex-basis: 23%;
        width: 23%;
    }
    @media(min-width: ${screens.laptop}) {
        flex-basis: 48.5%;
        width: 48.5%;
    }
    @media(min-width: ${screens.desktop}) {
        flex-basis: 100%;
        width: 100%;
    }
`

export { OuterContainer }
