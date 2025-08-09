'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  initialCode, 
  onChange, 
  height = '300px',
  readOnly = false 
}: CodeEditorProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setIsLoaded(true);

    // Configure Monaco editor theme
    monaco.editor.defineTheme('punk-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'a855f7', fontStyle: 'bold' },
        { token: 'string', foreground: '00ff88' },
        { token: 'number', foreground: '00d4ff' },
        { token: 'operator', foreground: 'ff0080' },
        { token: 'identifier', foreground: 'ffffff' },
        { token: 'function', foreground: 'ffff00' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#666666',
        'editorLineNumber.activeForeground': '#a855f7',
        'editor.selectionBackground': '#a855f730',
        'editor.inactiveSelectionBackground': '#a855f720',
        'editorCursor.foreground': '#00ff88',
        'editor.lineHighlightBackground': '#1a1a1a',
        'editorGutter.background': '#050505',
        'editorIndentGuide.background': '#2a2a2a',
        'editorIndentGuide.activeBackground': '#a855f7',
      }
    });

    monaco.editor.setTheme('punk-dark');

    // Configure Python language
    monaco.languages.setLanguageConfiguration('python', {
      autoClosingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  if (!isLoaded) {
    return (
      <div 
        className="bg-punk-dark border-2 border-punk-purple/30 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-punk-purple animate-pulse">
          Carregando editor...
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-punk-darker/50 border-2 border-punk-purple/30 rounded-lg overflow-hidden cyber-border">
        <div className="bg-punk-gray/50 px-4 py-2 border-b border-punk-purple/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-punk-green text-sm font-mono">🐍 Python</span>
            {readOnly && (
              <span className="text-punk-orange text-xs bg-punk-orange/20 px-2 py-1 rounded">
                Somente Leitura
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-punk-red rounded-full"></div>
            <div className="w-2 h-2 bg-punk-orange rounded-full"></div>
            <div className="w-2 h-2 bg-punk-green rounded-full"></div>
          </div>
        </div>
        
        <Editor
          height={height}
          language="python"
          value={initialCode}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            cursorStyle: 'line',
            cursorBlinking: 'smooth',
            readOnly,
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },
          }}
        />
      </div>
    </div>
  );
}
