import { useEffect, useState } from "react";
import "./blog.css";
import { useAuth } from "../../contexts/AuthContext";
import Popup from "reactjs-popup";
import CreateAndEditBlog from "./CreateAndEditBlog";
import AlertBox from "../UI/AlertBox";
import { IconInfoCircle } from "@tabler/icons-react";
import Card from "./Card";

const Blogs = () => {
  const { getAllPost, posts, isLoggedIn, deletePost, account } = useAuth();

  const [modelOpen, setModelOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const handelDelete = (id: string) => {
    setAlertOpen(true);
    setDefaultValues({ _id: id });
  };
  const confirmDelete = () => {
    deletePost(defaultValues._id as string);
    setAlertOpen(false);
    setDefaultValues({});
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <>
      <Popup modal open={modelOpen} onClose={() => setModelOpen(false)}>
        <CreateAndEditBlog
          modelOpen={setModelOpen}
          defaultValues={defaultValues}
        />
      </Popup>

      <AlertBox
        alertOpen={alertOpen}
        accept={confirmDelete}
        reject={() => setAlertOpen(false)}
        setAlertOpen={setAlertOpen}
        AlertIcon={IconInfoCircle}
        message={{
          header: "Are you sure?",
          message: "Are you sure you want to delete this blog?",
        }}
        confirmButtonText="Delete"
      />

      {/* component */}
      {isLoggedIn && (
        <div className="bg-white mt-3 mx-2 border-t border-gray-200 shadow">
          <div className="container mx-auto px-4 py-2 flex justify-between flex-wrap gap-3 items-center">
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              add new blog and enjoy the benefits.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setModelOpen(true)}
                className="text-xs px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn ? (
        <div className="mt-5 grid grid-cols-1 m-5 xl:grid-cols-4 gap-5">
          {posts.map((blog) => (
            <Card
              account={account}
              setModelOpen={setModelOpen}
              handleDelete={handelDelete}
              setDefaultValues={setDefaultValues}
              key={blog._id}
              avtar={blog.avtar}
              coverImg={blog.filepath}
              description={blog.description}
              title={blog.title}
              date={blog.createdAt}
              author={blog.username}
              postid={blog._id}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-gray-900">
          <p className="text-red-500">Login to see blogs</p>
        </div>
      )}
    </>
  );
};

export default Blogs;
