import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout';
import { RootState } from '../../redux/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const authState = useTypedSelector((state) => state.auth);

  async function handleProblemClick() {
    if (authState.isLoggedIn) {
      navigate('/problems');
    } else {
      navigate('/signin');
    }
  }
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center h-[50rem]">
        <div className="text-center text-5xl font-bold mt-14 text-accent">
          Welcome to AlgoCode
        </div>

        <p className="text-center text-3xl mt-12 font-semibold text-primary">
          A New Platform to learn and practice code, let's enjoy the journey
        </p>

        {/* <Loader size='lg' /> */}

        <div className="flex justify-center items-center gap-x-7 mt-24">
          <Link to="/signup">
            <button className="bg-orange-600 py-3 px-5 rounded-md text-black font-semibold">
              Create Your Account
            </button>
          </Link>
          <button
            onClick={handleProblemClick}
            className="bg-secondary py-3 px-5 rounded-md text-violet-800 font-semibold"
          >
            Go To The Problems
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
