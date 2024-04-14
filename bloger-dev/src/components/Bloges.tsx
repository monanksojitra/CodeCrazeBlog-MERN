import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Card from "./UI/Card";

const Bloges = () => {
  const { getAllPosts, posts } = useAuth();
  useEffect(() => {
    getAllPosts();
  }, [posts.length]);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {posts &&
          posts.map((post) => (
            <Card
              key={post._id}
              author={post.username}
              description={post.description}
              postImg={post.image}
              title={post.title}
              publishDate={post.publishDate}
            />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Bloges;
