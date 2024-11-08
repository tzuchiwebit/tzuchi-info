import Image from "next/image";
import DefaultImage from "@/asset/404.gif";

export default function Custom404() {
  return (
    <div className="w-full flex justify-center">
      <div className="relative aspect-4/3 tablet:w-2/3 w-full">
        <Image
          src={DefaultImage}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
