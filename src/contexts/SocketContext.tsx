import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SocketIoClient from 'socket.io-client';

import { useTypedSelector } from '../constants/ReduxStates';
import { handleSubmissionButton } from '../redux/slices/problemSlice';
import { getSubmission, handleEvaluationResult } from '../redux/slices/submissionSlice';
import { AppDispatch } from '../redux/store';
import { ContextData } from '../types/ContextData';
import { EvaluationDetails } from '../types/EvaluationDetails';

const Socket_Server_Url = 'http://localhost:3005';

const socket = SocketIoClient(Socket_Server_Url);

export const SocketContext = createContext<ContextData>(null!);

interface Props {
    children: React.ReactNode
}

const SocketProvider: React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useTypedSelector((state) => state.auth.userId);
    const submissionId = useTypedSelector((state) => state.submission.submissionId);
    const evaluationResult = useTypedSelector((state) => state.submission.evaluationResult);
    const [hasEmitedUserId, setHasEmitedUserId] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        if(userId && !hasEmitedUserId) {
            console.log('emiting set user id');
            socket.emit('setUserId', userId);
            setHasEmitedUserId(true);
        }

        socket.on('submissionPayloadResponse', async (payload: EvaluationDetails) => {
            console.log('subId: ', submissionId);
            if(submissionId) {
                await dispatch(getSubmission(submissionId));
            }
            dispatch(handleEvaluationResult(payload));
            dispatch(handleSubmissionButton(false));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, submissionId]);
    return(
        <SocketContext.Provider value={{socket, evaluationResult}}>
            { children }
        </SocketContext.Provider>
    );
};

export default SocketProvider;