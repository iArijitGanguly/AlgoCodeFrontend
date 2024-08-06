import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { getProblemById } from '../redux/slices/problemSlice';
import { AppDispatch, RootState } from '../redux/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function useGetProblem(problemId: string | undefined) {
    const dispatch = useDispatch<AppDispatch>();
    const problemState = useTypedSelector((state) => state.problem);

    const loadProblem = async () => {
        if(!problemState.problemDescription) {
            await dispatch(getProblemById(problemId as string));
        }
    };

    useEffect(() => {
        loadProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [problemState];
}

export default useGetProblem;