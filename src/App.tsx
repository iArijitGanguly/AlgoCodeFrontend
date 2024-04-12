import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SampleProblem1 from './constants/SampleProblem1';
import ProblemDescription from './pages/Description/ProblemDescription';

function App() {
  const markdownText = SampleProblem1.problemStatement;
  return (
    <>
      <Navbar />
      <Sidebar />
      <ProblemDescription descriptionText={markdownText} />
    </>
  );
}

export default App;
