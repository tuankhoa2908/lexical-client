import './lexical.css';
import './themeLexical.css';

import { $getSelection, $isRangeSelection, $insertNodes, FORMAT_TEXT_COMMAND } from 'lexical';
import { FaCode } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import themingLexical from "../../constants/themingLexical";

import MyPlugin from './plugins/MyPlugin';
import TextLengthPlugin from './plugins/TextLengthPlugin';
import NodeTreePlugin from './plugins/NodeTreePlugin';
import { FillBlankNode } from './plugins/FIllBlankPlugin';
import SubmitPlugin from './plugins/SubmitPlugin';


const FORMAT_TYPES = ['bold', 'italic', 'code', 'underline'];


// 🛠 Error Handler
const onError = (error) => {
    console.error('Lexical error:', error);
}

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [formats, setFormats] = useState({
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                console.log(selection);
                if ($isRangeSelection(selection)) {
                    const newFormats = FORMAT_TYPES.reduce((acc, format) => {
                        acc[format] = selection.hasFormat(format);
                        return acc;
                    }, {});
                    console.log(newFormats);
                    setFormats(newFormats);
                }
            });
        });
    }, [editor]);

    return (
        <div className="toolbar">
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                className={formats.bold ? 'active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                className={formats.italic ? 'active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                className={formats.code ? 'active' : ''}
            >
                <FaCode />
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                className={formats.underline ? 'active' : ''}
            >
                Underline
            </button>
            <button
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();
                        if (selection) {
                            $insertNodes([new FillBlankNode()]);
                        }
                    });
                }}
            >
                Blank Input Box
            </button>
        </div>
    );
}

// ✍️ Main Editor Component
const LexicalEditor = () => {
    const initialConfig = {
        namespace: 'MyBasicEditor',
        theme: themingLexical,
        onError,
        editable: true,
        nodes: [FillBlankNode],
    };
    return (
        <>
            <div className="editor-container">
                <LexicalComposer initialConfig={initialConfig}>
                    <ToolbarPlugin />
                    <div className="editor-content-wrapper">
                        <RichTextPlugin
                            contentEditable={<ContentEditable className="editor-input" />}
                            // placeholder={<div className="editor-placeholder">Type here...</div>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                    </div>
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <MyPlugin />
                    <TextLengthPlugin />
                    <NodeTreePlugin />
                    <SubmitPlugin />
                </LexicalComposer>
            </div>
        </>

    );
};

export default LexicalEditor;
