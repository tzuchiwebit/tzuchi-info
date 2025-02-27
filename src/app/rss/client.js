"use client";
import { useState } from "react";
import Container from "@/shared/layout/Container";
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton";
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb";
import { Linkfont } from "@/shared/styles/linkFont.js";
import FloatSizeToolbar from "@/shared/sizeToolbar/FloatSizeToolbar";
import classNames from "classnames";

const dataList = [
  {
    name: "全球",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php`,
  },
  {
    name: "亞洲",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=亞洲`,
  },
  {
    name: "美洲",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=美洲`,
  },
  {
    name: "歐洲",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=歐洲`,
  },
  {
    name: "非洲",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=非洲`,
  },
  {
    name: "大洋洲",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=大洋洲`,
  },
  {
    name: "臺灣",
    rss: `${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/rss.php?place=臺灣全球`,
  },
];

export default function Pgae() {
  const [selectedFontSize, setSelectedFontSize] = useState(26);
  return (
    <Container>
      <FloatScrollTopButton />
      <div className="flex w-full flex-col">
        {/* breadcrumbs */}
        <div className="flex gap-1 tablet:mt-6 mt-4">
          <PrimaryBreadcrumb
            items={[
              {
                label: "首頁",
                link: "/",
              },
              {
                label: "慈濟資訊網RSS服務",
                link: "",
              },
            ]}
          />
        </div>
        <div className="mt-6">
          <div className="">
            <div className="text-[30px] font-bold text-primary-blue1">
              慈濟資訊網RSS服務
            </div>

            {dataList.map((data, index) => (
              <div
                key={index}
                className={classNames(
                  "pb-8 flex tablet:flex-row flex-col tablet:items-center tablet-only:-mx-2",
                  index === 0 ? "mt-6" : "mt-8",
                  index + 1 !== dataList.length
                    ? "border-b border-solid border-gray-gray7"
                    : ""
                )}
              >
                <div className="flex flex-row items-center shrink-0">
                  <div className="px-4">•</div>
                  <span
                    style={{ fontSize: selectedFontSize + "px" }}
                    className="text-black font-medium shrink-0"
                  >
                    {data.name}：
                  </span>
                </div>
                <span
                  style={{
                    fontSize: selectedFontSize + "px",
                    display: "block",
                    wordBreak: "break-all",
                    hyphens: "none",
                    whiteSpace: "normal",
                    maxWidth: "100%",
                    overflowWrap: "break-word",
                  }}
                  className="font-medium cursor-pointer desktop:w-[750px] laptop:w-[490px] tablet:w-[634px] w-[348px]"
                  onClick={() => window.open(data.rss, "_blank")}
                >
                  {/* {data.rss} */}
                  <Linkfont>{data.rss}</Linkfont>
                </span>
              </div>
            ))}
          </div>
        </div>
        <FloatSizeToolbar
          selectedFontSize={selectedFontSize}
          setSelectedFontSize={setSelectedFontSize}
        ></FloatSizeToolbar>
      </div>
    </Container>
  );
}
