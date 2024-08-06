import { Link } from 'react-router-dom';

interface Props {
    problemId: string,
    problemNumber: number,
    problemTitle: string,
    problemDifficulty: string
}

const Problem: React.FC<Props> = ({problemId, problemNumber, problemTitle, problemDifficulty }) => {

    function handleDifficulty(difficulty: string) {
        if(difficulty == 'easy') {
            return 'text-green-500';
        }
        else if(difficulty == 'medium') {
            return 'text-orange-500';
        }
        else {
            return 'text-red-500';
        }
    }

    return (
        <div className='grid grid-cols-3 place-items-center w-[80vw] mx-auto border-b-2 text-2xl py-3 transition-colors duration-300 font-semibold'>
            <p className="text-yellow-500">{problemNumber}.</p>
            <Link to={`/problems/${problemId}`}>
                <p className="cursor-pointer hover:text-accent">{problemTitle}</p>
            </Link>
            <p className={handleDifficulty(problemDifficulty)}>{problemDifficulty}</p>
        </div>
    );
};

export default Problem;