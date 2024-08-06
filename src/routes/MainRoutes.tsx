import { Route,Routes } from 'react-router-dom';

import Description from '../pages/Description/ProblemDescription';
import Home from '../pages/Home/Home';
import ProblemList from '../pages/Problems/ProblemList';
import Signin from '../pages/SignIn/Signin';
import Signup from '../pages/SignUp/Signup';

const MainRouts: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>

      <Route path="/signup" element={<Signup/>}  ></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path='/problems' element={<ProblemList />} />
      <Route path='/problems/:problemId' element={<Description />} />
    </Routes>
  );
};

export default MainRouts;