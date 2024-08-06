// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import SampleProblem1 from './constants/SampleProblem1';
// import ProblemDescription from './pages/Description/ProblemDescription';
import MainRouts from './routes/MainRoutes';

function App() {
  // const markdownText = SampleProblem1.problemStatement;
  return (
    <>
      <div className='h-[100vh] overflow-hidden'>
        {/* <Navbar />
        <Sidebar />
        <ProblemDescription descriptionText={markdownText} /> */}
        <MainRouts />
      </div>
    </>
  );
}

export default App;
