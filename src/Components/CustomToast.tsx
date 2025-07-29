import Link from "next/link";
import React from "react";

interface ICustomToast {
title: string;
href: string;
TiTleLink: string;
}

const CustomToast = ({title , href , TiTleLink}: ICustomToast) => {
  return (
    <div>
      <Link className="ml-1 flex flex-wrap" href={href}>
        <span className="mr-2 inline-block">{title}</span>
        <span className="text-sky-400 inline-block duration-150 hover:underline hover:text-sky-700">
          {TiTleLink}
        </span>
      </Link>
    </div>
  );
};

export default CustomToast;
