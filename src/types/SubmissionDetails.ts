export type Submission = {
    _id: string
    userId: string,
    problemId: string,
    code: string,
    language: string,
    status: string
}

export type SubmissionDetails = {
    data: Submission
}