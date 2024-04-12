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

function Description({ descriptionText }: {descriptionText: string}) {
  const [activeTab, setActiveTab] = useState('statement');
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);

  const startDragging = () => {
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: { clientX: number; }) => {
    if (!isDragging) return;

    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  const isActive = (tabName: string) => {
    if(activeTab == tabName) {
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
          <a onClick={() => setActiveTab('statement')} role="tab" className={isActive('statement')}>Problem Statement</a>
          <a onClick={() => setActiveTab('editorial')} role="tab" className={isActive('editorial')}>Editorial</a>
          <a onClick={() => setActiveTab('submission')} role="tab" className={isActive('submission')}>Submissions</a>
        </div>

        <div className="markdownViewer p-5 basis-1/2">
          <Markdown rehypePlugins={[rehypeRaw]}>
            {sanitizedMarkdown}
          </Markdown>
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

        <div className='flex justify-start items-center px-4 py-2 gap-x-2'>
          <div>
            <button className="btn btn-success btn-sm">Submit</button>
          </div>
          <div>
            <button className="btn btn-warning btn-sm">Run</button>
          </div>
          <div>
            <select className="select select-info w-full max-w-xs select-sm">
              <option disabled selected>Language</option>
              <option value=''>C++</option>
              <option value=''>Java</option>
              <option value=''>Javascript</option>
              <option value=''>Python</option>
            </select>
          </div>
          <div>
            <select className="select select-info w-full max-w-xs select-sm">
              <option disabled selected>Theme</option>
              <option value=''>Monokai</option>
              <option value=''>Github</option>
              <option value=''>Github-Dark</option>
            </select>
          </div>
        </div>
        <div className="editorContainer w-full h-full">
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="codeEditor"
            className="editor"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              fontSize: 16,
              
            }}
            style={{width: '100%', height: '100%'}}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
