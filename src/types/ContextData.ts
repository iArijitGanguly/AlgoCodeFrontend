import { Socket } from 'socket.io-client';

import { EvaluationDetails } from './EvaluationDetails';

export interface ContextData {
    socket: Socket
    evaluationResult: EvaluationDetails | null
}