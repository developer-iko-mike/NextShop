import Link from "next/link";
import React from "react";

interface ICMSQuiz {
  title: string;
  href: string;
  linkTiTle?: string;
  mb?: string
}

const CMSQuiz = ({ title, href, linkTiTle , mb }: ICMSQuiz) => {
  return (
    <div className={`flex justify-center capitalize text-2xl font-bold gap-1 ${mb ? mb : "mb-8"}`}>
      <p className="text-gray-800">{title}</p>
      <Link
        href={href}
        className="text-blue-400 duration-100 hover:text-blue-500 hover:underline"
      >
        {linkTiTle ?? "Click Here"}
      </Link>
    </div>
  );
};

export default CMSQuiz;
