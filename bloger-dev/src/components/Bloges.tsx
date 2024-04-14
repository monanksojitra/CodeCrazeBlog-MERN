import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Card from "./UI/Card";

const Bloges = () => {
  const { getAllPosts, posts } = useAuth();
  useEffect(() => {
    getAllPosts();
  }, []);
  console.log(posts);
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        {posts &&
          posts.map((post) => (
            <Card
              key={post._id}
              author={post.author}
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
