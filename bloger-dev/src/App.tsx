import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import "reactjs-popup/dist/index.css";

export default function App() {
  return (
    <div className="container mx-auto">
      {/* <Header /> */}
      <Navbar />
      <Outlet />
      {/* <Hero />
      <FeedBack />
      <Explore />
      <QuickStart />
      <SocialLink />
      <Archives />
      <Contact />
      <Information /> */}
      <Footer />
    </div>
  );
}
