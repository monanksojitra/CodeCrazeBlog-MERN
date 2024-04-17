import { IconEdit, IconTrash } from "@tabler/icons-react";

type Props = {
  coverImg: string;
  title: string;
  description: string;
  avtar: string;
  date: string;
  author: string;
  postid: string;
  setDefaultValues: ({}) => void;
  setModelOpen: (boolean) => void;
  handleDelete: (postid) => void;
};
const Card = ({
  setModelOpen,
  setDefaultValues,
  handleDelete,
  coverImg,
  title,
  description,
  avtar,
  author,
  date,
  postid,
}: Props) => {
  const handleEditPost = () => {
    setModelOpen(true);
    setDefaultValues({
      title: title,
      description: description,
      _id: postid,
    });
  };
  return (
    <>
      <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
          <img src={coverImg} alt="cover Image" className="object-contain" />
        </div>
        <div className="p-6">
          <h4 className="block font-sans text-base font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h4>
          <p className="mt-3 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-x-2">
            <img
              src={avtar}
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              data-tooltip-target="author-1"
            />
            <div>
              <p className="text-sm font-semibold">{author}</p>
              <p className="block font-sans text-[10px] font-normal leading-relaxed text-inherit antialiased">
                {date.substring(0, 10).split("-").reverse().join("-")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <IconEdit
              className="cursor-pointer "
              onClick={handleEditPost}
              color="blue"
              size={22}
            />
            <IconTrash
              className="cursor-pointer "
              onClick={() => handleDelete(postid)}
              color="red"
              size={22}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
