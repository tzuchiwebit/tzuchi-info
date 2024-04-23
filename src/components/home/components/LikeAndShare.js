'use client'
import Icon from "@/shared/Icon"
import color from "@/shared/styles/color";
import classNames from "@/utils/classNames";
import { useEffect, useState } from "react";
import { useLikeAndShare } from "@/shared/hook";
import useSocialShareProvider from "../useSocialShareProvider";

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function LikeAndShare({ articleId = 0, likes = 0, shares = 0 }) {

    const { toggleSocialShareModal } = useSocialShareProvider();

    const { like, share, set, hasLike, hasShare, handleLike, handleShare, setLike = () => { }, setShare = () => { } } = useLikeAndShare({
        id: articleId
    });

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setLike(likes);
    }, [likes])

    useEffect(() => {
        setShare(shares);
    }, [shares])

    // console.log(`like, share, isLikeUpdating, isShareUpdating, hasLike, hasShare`)
    // console.log(like, share, isLikeUpdating, isShareUpdating, hasLike, hasShare)

    return (
        <div className="flex gap-3 font-medium relative">
            <div
                className={classNames(hasLike ? `text-gray-gray2` : `text-gray-gray4`, "flex gap-1 cursor-pointer")}
                onClick={() => {
                    handleLike();
                }}>
                {
                    hasLike ?
                        <Icon.LikeFull style={{ width: 20, color: color.complementary.pink }} /> :
                        <Icon.Like style={{ width: 20 }} />
                }

                <span>{like ? parseInt(like) : '讚'}</span>
            </div>
            <div
                className={classNames(hasShare ? `text-gray-gray2` : `text-gray-gray4`, "flex gap-1 cursor-pointer")}
                onClick={(e) => {
                    toggleOpen();
                    handleShare();
                    toggleSocialShareModal(e);
                }}>
                {
                    hasShare ?
                        <Icon.ShareFull style={{ width: 22, color: color.primary.blue3 }} /> :
                        <Icon.Share style={{ width: 22 }} />
                }

                <span>{share ? parseInt(share) : '分享'}</span>
            </div>
        </div>
    )
}
