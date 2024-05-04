import { IconEdit, IconTrash } from "@tabler/icons-react";

type Props = {
  coverImg: string;
  title: string;
  description: string;
  avtar: string;
  date: string;
  author: string;
  account: object | any;
  postid: string;
  setDefaultValues: ({}) => void;
  setModelOpen: (boolean: boolean) => void;
  handleDelete: (postid: string) => void;
};
const Card = ({
  setModelOpen,
  setDefaultValues,
  handleDelete,
  coverImg,
  title,
  account,
  description,
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
  if (!account) {
    // Handle the case where account is null, for example:
    return <div>Loading...</div>; // Or whatever is appropriate for your UI
  }

  const { username } = account;
  return (
    <>
      <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
          <img
            src={coverImg}
            alt="cover Image"
            className="object-cover aspect-square"
          />
        </div>
        <div className="px-6 py-3  lg:p-6">
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
              src="https://i.pravatar.cc/200"
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

          {username === author ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
