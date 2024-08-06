import { ProgressBar } from 'react-loader-spinner';

interface Props {
  status: string;
}

const LoaderState: React.FC<Props> = ({ status }) => {
  return (
    <div className='flex gap-x-6 items-center'>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <div className='text-3xl font-bold text-orange-500'>{status}...</div>
    </div>
  );
};

export default LoaderState;
