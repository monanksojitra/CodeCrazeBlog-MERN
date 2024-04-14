import { useNavigate } from "react-router-dom";

const navigate = (to: string) => {
  const navigator = useNavigate();
  navigator(to);
};
export default navigate;
