import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/ext-language_tools';

import DOMPurify from 'dompurify';
import { useState } from 'react';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import Languages from '../../constants/Languages';
import Themes from '../../constants/Themes';

type languageSupport = {
  languageName: string;
  value: string;
};

type themeSupport = {
  themeName: string;
  value: string;
};

function Description({ descriptionText }: { descriptionText: string }) {
  const [activeTab, setActiveTab] = useState('statement');
  const [testCaseTab, setTestCaseTab] = useState('input');
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('monokai');
  const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);

  const startDragging = (e: { preventDefault: () => void }) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: { clientX: number }) => {
    if (!isDragging) return;

    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  const isActive = (tabName: string) => {
    if (activeTab == tabName) {
      return 'tab tab-active';
    } else {
      return 'tab';
    }
  };

  const isTestCaseActiveTab = (tabName: string) => {
    if(testCaseTab == tabName) {
      return 'tab tab-active';
    }
    else {
      return 'tab';
    }
  };

  return (
    <div
      className="flex w-full h-screen"
      onMouseMove={onDrag}
      onMouseUp={stopDragging}
    >
      <div
        className="leftPanel h-full overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        <div role="tablist" className="tabs tabs-boxed w-3/5">
          <a
            onClick={() => setActiveTab('statement')}
            role="tab"
            className={isActive('statement')}
          >
            Problem Statement
          </a>
          <a
            onClick={() => setActiveTab('editorial')}
            role="tab"
            className={isActive('editorial')}
          >
            Editorial
          </a>
          <a
            onClick={() => setActiveTab('submission')}
            role="tab"
            className={isActive('submission')}
          >
            Submissions
          </a>
        </div>

        <div className="markdownViewer p-5 basis-1/2">
          <Markdown rehypePlugins={[rehypeRaw]}>{sanitizedMarkdown}</Markdown>
        </div>
      </div>

      <div
        className="divider cursor-col-resize w-2 h-full bg-slate-200"
        onMouseDown={startDragging}
      ></div>

      <div
        className="rightPanel h-full overflow-auto"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <div className="flex justify-start items-center px-4 py-2 gap-x-2">
          <div>
            <button className="btn btn-success btn-sm">Submit</button>
          </div>
          <div>
            <button className="btn btn-warning btn-sm">Run</button>
          </div>
          <div>
            <select
              className="select select-info w-full max-w-xs select-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Languages.map((language: languageSupport) => {
                return (
                  <option key={language.value} value={language.value}>
                    {language.languageName}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select
              className="select select-info w-full max-w-xs select-sm"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {Themes.map((theme: themeSupport) => {
                return (
                  <option key={theme.value} value={theme.value}>
                    {theme.themeName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="editorContainer w-full h-[90%]">
          <AceEditor
            mode={language}
            theme={theme}
            name="codeEditor"
            className="editor"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              fontSize: 16,
            }}
            style={{ width: '100%', height: '68%' }}
          />

          <div className="collapse bg-base-200 rounded-none">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              Console
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
              <div role="tablist" className="tabs tabs-boxed w-3/5 mb-4">
                <a
                  role="tab"
                  className={isTestCaseActiveTab('input')}
                  onClick={() => setTestCaseTab('input')}
                >
                  Input
                </a>
                <a
                  role="tab"
                  className={isTestCaseActiveTab('output')}
                  onClick={() => setTestCaseTab('output')}
                >
                  Output
                </a>
              </div>
              {(testCaseTab == 'input') ? <textarea rows={3} cols={70} className='bg-neutral text-white rounded-md resize-none' /> : <div className='w-12 h-8'></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
