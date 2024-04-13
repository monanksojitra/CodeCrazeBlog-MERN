import React from "react";
import { Link } from "react-router-dom";

const LinkItem = ({ children, NavLink }) => {
  return (
    <li>
      <Link
        to={NavLink}
        className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-white dark:hover:text-blue-600 lg:ml-12 lg:inline-flex"
      >
        {children}
      </Link>
    </li>
  );
};

export default LinkItem;
