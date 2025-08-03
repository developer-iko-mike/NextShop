import { ClockLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loader-container flex justify-center items-center h-screen">
      <ClockLoader color="#36d7b7" loading={true} size={30} />
    </div>
  );
};

export default Loading;