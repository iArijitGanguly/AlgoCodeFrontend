type TestCase = {
    input: string,
    output: string
};

type codeStub = {
    language: string,
    startSnippet: string,
    endSnippet: string,
    userSnippet: string
};

export type ProblemSet = {
    _id: string,
    title: string,
    description: string,
    difficulty: string,
    testCases: TestCase[],
    codeStubs: codeStub[],
    editorial: string
};

export interface ProblemState {
    problemSet: ProblemSet[],
    problemDescription: ProblemSet | null,
    problemCode: string,
    problemLanguage: string,
    problemTheme: string,
    activeTab: string,
    testCaseTab: string,
    leftWidth: number,
    isDragging: boolean,
    isClicked: boolean
}