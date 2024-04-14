import React from "react";

type CardProps = {
  postImg?: string;
  title: string;
  description: string;
  avtar?: string;
  publishDate: string;
  author: string;
};
const Card = ({
  postImg,
  title,
  description,
  avtar,
  publishDate,
  author,
}: CardProps) => {
  return (
    <>
      <div className="relative flex max-w-[16rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 p-3 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
          <img
            className="object-cover rounded-lg h-60 aspect-square"
            src={
              postImg ||
              "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
            }
            alt="ui/ux review check"
          />
        </div>
        <div className="px-6 py-2">
          <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h4>
          <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-x-2">
            <img
              alt="natali craig"
              src={avtar || "https://xsgames.co/randomusers/avatar.php?g=male"}
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              data-tooltip-target="author-1"
            />
            <p className="text-sm font-semibold text-gray-900">{author}</p>
          </div>
          <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
            {publishDate}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
