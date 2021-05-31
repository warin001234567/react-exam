import { PuffLoader } from "react-spinners";

const Loading = (props) => {
  return (
    <div>
      <PuffLoader size={props.size} />
    </div>
  );
};

export default Loading;
