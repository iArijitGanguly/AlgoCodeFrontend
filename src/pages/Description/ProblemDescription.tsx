import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

import DOMPurify from 'dompurify';
import { useState } from 'react';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';

function Description({ descriptionText }) {
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
        <div className="tabs">
          <button onClick={() => setActiveTab('statement')}>
            Problem Statement
          </button>
          <button onClick={() => setActiveTab('editorial')}>Editorial</button>
          <button onClick={() => setActiveTab('submission')}>
            Submissions
          </button>
        </div>

        <div className="markdownViewer p-5 basis-1/2">
          <Markdown>{sanitizedMarkdown}</Markdown>
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
