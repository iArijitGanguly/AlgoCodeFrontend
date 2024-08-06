import Problem from '../../components/Problem';
import useProblems from '../../hooks/useProblem';
import HomeLayout from '../../layouts/HomeLayout';

const ProblemList: React.FC = () => {
    const [problemState] = useProblems();
    
    return (
        <HomeLayout>
            <div className='grid grid-cols-3 place-items-center mt-24 text-4xl font-semibold w-[80vw] mx-auto border-b-2 uppercase'>
                <p className='mb-3 text-primary'>Index</p>
                <p className='mb-3 text-secondary'>Title</p>
                <p className='mb-3 text-accent'>Difficulty</p>
            </div>

            {problemState.problemSet.length != 0 && problemState.problemSet.map((problem, index) => {
                return (
                    <Problem key={problem._id} problemId={problem._id} problemNumber={index + 1} problemTitle={problem.title} problemDifficulty={problem.difficulty} />
                );
            })}
        </HomeLayout>
    );
};

export default ProblemList;