import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loader-container flex justify-center items-center h-screen">
      <FadeLoader color="#36d7b7" loading={true} />
    </div>
  );
};

export default Loading;