import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type LinkItemProps = {
  children: React.ReactNode;
  NavLink: string;
  style?: string;
  onClick?: () => void;
};
const LinkItem = ({ children, NavLink, style, onClick }: LinkItemProps) => {
  return (
    <li onClick={onClick}>
      <Link
        to={NavLink}
        className={cn(
          "flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-white dark:hover:text-blue-600 lg:inline-flex",
          style
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default LinkItem;
