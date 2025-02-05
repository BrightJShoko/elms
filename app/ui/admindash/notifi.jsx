import React from "react";
import Image from "next/image";

function Notifi({ src }) {
  return (
    <Image
      alt="Nav Icon"
      objectFit="contain"
      width={30}
      height={30}
      src={src}
    />
  );
}

export default Notifi;
