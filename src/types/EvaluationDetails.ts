export type EvaluationResponse = {
    output: string,
    status: string,
    expectedOutput: string
}

export interface EvaluationDetails {
    response: EvaluationResponse[],
    submissionId: string,
    userId: string
}