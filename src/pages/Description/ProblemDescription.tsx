import '../../imports/AceBuildImports';

// import axios from 'axios';
import DOMPurify from 'dompurify';
import { ChangeEvent, DragEvent, useContext, useEffect } from 'react';
import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import EvaluationResult from '../../components/EvaluationResult';
import LoaderState from '../../components/Loader';
import Languages from '../../constants/Languages';
import { useTypedSelector } from '../../constants/ReduxStates';
import Themes from '../../constants/Themes';
import { SocketContext } from '../../contexts/SocketContext';
import useProblems from '../../hooks/useProblem';
import HomeLayout from '../../layouts/HomeLayout';
import {
  handleActiveTab,
  handleCode,
  handleIsDragging,
  handleLanguage,
  handleLeftWidth,
  handleSubmissionButton,
  handleTestCaseActiveTab,
  handleTheme,
} from '../../redux/slices/problemSlice';
import { createSubmission, handleEvaluationResult, handleSubmissionId, handleSubmissionStatus } from '../../redux/slices/submissionSlice';
import { AppDispatch } from '../../redux/store';

type languageSupport = {
  languageName: string;
  value: string;
};

type themeStyle = {
  themeName: string;
  value: string;
};

function Description() {
  const userId = useTypedSelector((state) => state.auth.userId);
  const submissionStatus = useTypedSelector(
    (state) => state.submission.submissionStatus
  );
  const submissionId = useTypedSelector((state) => state.submission.submissionId);
  const isClicked = useTypedSelector((state) => state.problem.isClicked);
  const dispatch = useDispatch<AppDispatch>();

  const { evaluationResult } = useContext(SocketContext);

  const { problemId } = useParams();

  const [problemState] = useProblems(problemId);

  const { problemCode, problemLanguage, activeTab } = problemState;

  const descriptionText = problemState.problemDescription?.description;

  const sanitizedMarkdown = DOMPurify.sanitize(descriptionText as string);

  useEffect(() => {
    if (
      problemState.problemDescription?.codeStubs &&
      problemState.problemLanguage
    ) {
      problemState.problemDescription.codeStubs.forEach((stub) => {
        if (
          stub.language.toLowerCase() ==
          problemState.problemLanguage.toLowerCase()
        ) {
          dispatch(handleCode(stub.userSnippet));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemState.problemLanguage, problemState.problemDescription]);

  const handleSubmission = async () => {
    dispatch(handleSubmissionButton(true));
    if(submissionId && submissionStatus) {
      dispatch(handleSubmissionId(''));
      dispatch(handleSubmissionStatus(''));
    }
    if(activeTab != 'submissions') {
      dispatch(handleActiveTab('submissions'));
    }
    if(evaluationResult) {
      dispatch(handleEvaluationResult(null));
    }
    await dispatch(
      createSubmission({
        userId,
        problemId,
        code: problemCode,
        language: problemLanguage,
      })
    );
  };

  const handleSubmitButton = () => {
    if(isClicked) {
      return 'bg-gray-800 pointer-events-none text-gray-500 rounded-md font-semibold btn-success btn-sm';
    }
    else {
      return 'btn btn-success btn-sm';
    }
  };

  const startDragging = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(handleIsDragging(true));
  };

  const stopDragging = () => {
    if (problemState.isDragging) {
      dispatch(handleIsDragging(false));
    }
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    if (!problemState.isDragging) return;

    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      dispatch(handleLeftWidth(newLeftWidth));
    }
  };

  const isActiveTab = (tabName: string) => {
    if (problemState.activeTab == tabName) {
      return 'tab tab-active';
    } else {
      return 'tab';
    }
  };

  const isInputTabActive = (tabName: string) => {
    if (problemState.testCaseTab == tabName) {
      return 'tab tab-active';
    } else {
      return 'tab';
    }
  };

  return (
    <HomeLayout>
      <div
        className="flex w-screen h-[calc(100vh-57px)]"
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
      >
        <div
          className="leftPanel h-full overflow-auto"
          style={{ width: `${problemState.leftWidth}%` }}
        >
          <div role="tablist" className="tabs tabs-boxed w-3/5">
            <a
              onClick={() => dispatch(handleActiveTab('statement'))}
              role="tab"
              className={isActiveTab('statement')}
            >
              Problem Statement
            </a>
            <a
              onClick={() => dispatch(handleActiveTab('editorial'))}
              role="tab"
              className={isActiveTab('editorial')}
            >
              Editorial
            </a>
            <a
              onClick={() => dispatch(handleActiveTab('submissions'))}
              role="tab"
              className={isActiveTab('submissions')}
            >
              Submissions
            </a>
          </div>

          <div className="markdownViewer p-[20px] basis-1/2">
            {activeTab == 'statement' && (
              <ReactMarkdown
                children={sanitizedMarkdown}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                className="prose"
              />
            )}

            {activeTab == 'submissions' && submissionStatus.toLowerCase() == 'pending' && (
              <LoaderState status={submissionStatus} />
            )}

            {activeTab == 'submissions' && evaluationResult && (
              <EvaluationResult response={evaluationResult.response} status={submissionStatus} />
            )}
          </div>
        </div>

        <div
          className="divider cursor-col-resize w-[5px] bg-slate-200 h-full"
          onMouseDown={startDragging}
        ></div>

        <div
          className="rightPanel h-full overflow-auto flex flex-col"
          style={{ width: `${100 - problemState.leftWidth}%` }}
        >
          <div className="flex gap-x-1.5 justify-start items-center px-4 py-2 basis-[5%]">
            <div>
              <button
                className={handleSubmitButton()}
                onClick={handleSubmission}
              >
                Submit
              </button>
            </div>
            
            <div>
              <select
                className="select select-info w-full select-sm max-w-xs"
                value={problemState.problemLanguage}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  dispatch(handleLanguage(e.target.value))
                }
              >
                {Languages.map((language: languageSupport) => (
                  <option key={language.value} value={language.value}>
                    {' '}
                    {language.languageName}{' '}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="select select-info w-full select-sm max-w-xs"
                value={problemState.problemTheme}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  dispatch(handleTheme(e.target.value))
                }
              >
                {Themes.map((theme: themeStyle) => (
                  <option key={theme.value} value={theme.value}>
                    {' '}
                    {theme.themeName}{' '}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col editor-console grow-[1]">
            <div className="editorContainer grow-[1]">
              <AceEditor
                mode={problemState.problemLanguage}
                theme={problemState.problemTheme}
                value={problemState.problemCode}
                onChange={(e: string) => dispatch(handleCode(e))}
                name="codeEditor"
                className="editor"
                style={{ width: '100%' }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  fontSize: 16,
                }}
                height="100%"
              />
            </div>

            {/* Collapsable test case part */}

            <div className="collapse bg-base-200 rounded-none">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                Console
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <div role="tablist" className="tabs tabs-boxed w-3/5 mb-4">
                  <a
                    onClick={() => dispatch(handleTestCaseActiveTab('input'))}
                    role="tab"
                    className={isInputTabActive('input')}
                  >
                    Input
                  </a>
                  <a
                    onClick={() => dispatch(handleTestCaseActiveTab('output'))}
                    role="tab"
                    className={isInputTabActive('output')}
                  >
                    Output
                  </a>
                </div>

                {problemState.testCaseTab === 'input' ? (
                  <textarea
                    rows={4}
                    cols={70}
                    className="bg-neutral text-white rounded-md resize-none"
                  />
                ) : (
                  <div className="w-12 h-8"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Description;
