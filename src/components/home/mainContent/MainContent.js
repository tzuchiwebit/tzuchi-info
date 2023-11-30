import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle } from "../components"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function MainContent() {

    return <Container>
        <div>
            <BannerTitle title={`近期焦點`} />
        </div>
    </Container>
}

const Container = styled.div`
    width: 100%;
    flex: 1;
    padding: 15px;
`