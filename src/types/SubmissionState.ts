import { EvaluationDetails } from './EvaluationDetails';

export interface SubmissionState {
    submissionId: string,
    submissionStatus: string,
    evaluationResult: EvaluationDetails | null
}