import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { getAllProblems, getProblemById } from '../redux/slices/problemSlice';
import { AppDispatch,RootState } from '../redux/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function useProblems(problemId?: string | undefined) {
    const dispatch = useDispatch<AppDispatch>();
    const problemState = useTypedSelector((state) => state.problem);

    const loadProblems = async () => {
        if(problemState.problemSet.length == 0) {
            await dispatch(getAllProblems());
        }
        if(problemId) {
            await dispatch(getProblemById(problemId));
        }
    };

    useEffect(() => {
       loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [problemState];
}

export default useProblems;