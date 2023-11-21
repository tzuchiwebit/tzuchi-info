import Icon from "@/shared/Icon"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function Widget() {

    return <h1 className="text-3xl font-bold underline text-complementary-blue1 hover:text-primary-blue1">
        {/* <Image
            priority
            src={AuthorIcon}
            alt="Follow us on Twitter"
        /> */}
        <Icon.LOGO width='60%' />
        {/* <AuthorIcon /> */}
        Hello, Next.js!
    </h1>
}