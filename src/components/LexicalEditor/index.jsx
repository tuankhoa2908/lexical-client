import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


import ToolbarPlugin from './plugins/ToolbarPlugin';

import './lexical.css';
import './themeLexical.css';
import themingLexical from './themingLexical';

const EditorWrapper = ({ onUpdate }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const json = editorState.toJSON();
                onUpdate(json);
            });
        });
    }, [editor, onUpdate]);

    return (
        <>
            <ToolbarPlugin />
            <RichTextPlugin
                contentEditable={<ContentEditable className="editor-content-editable" />}
                placeholder={<div className="editor-placeholder">Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
        </>
    );
};

const LexicalEditor = ({ onUpdate }) => {
    const initialConfig = {
        namespace: 'PlaygroundEditor',
        theme: themingLexical,
        onError: (error) => console.error(error),
        editable: true,
    };

    return (
        <div className="editor-wrapper">
            <LexicalComposer initialConfig={initialConfig}>
                <EditorWrapper onUpdate={onUpdate} />
            </LexicalComposer>
        </div>
    );
};

export default LexicalEditor;
