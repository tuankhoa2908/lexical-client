import "../LexicalEditor/lexical.css";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FillBlankNode } from "../LexicalEditor/plugins/FIllBlankPlugin";


import themingLexical from "../../constants/themingLexical";
import { useNavigate } from "react-router-dom";
import ListWord from "../../components/ListWord";

const ImportHTMLPlugin = ({ htmlJSON }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (Object.keys(htmlJSON).length === 0) return;
        setTimeout(() => {
            const parsedState = editor.parseEditorState(htmlJSON);
            editor.setEditorState(parsedState);
        }, 0);
    }, [htmlJSON, editor]);

    return null;
};

const words = ['are', 'in', 'on', 'is', 'play'];

const FillBlank = () => {
    const rawHTML = useSelector((state) => state.editor.rawHTML);
    const navigate = useNavigate();

    const initialConfig = {
        namespace: 'PreviewEditor',
        theme: themingLexical,
        onError: (error) => console.error(error),
        editable: true,
        nodes: [FillBlankNode]
    };


    return (
        <>
            <div className="editor-container">
                <LexicalComposer initialConfig={initialConfig}>
                    <ImportHTMLPlugin htmlJSON={rawHTML} />
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        // placeholder={<div className="editor-placeholder">Loading content...</div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                </LexicalComposer>
            </div>
            <ListWord words={words} />
            <button className="button" style={{ marginTop: '10px' }} onClick={() => navigate(-1)} >Return</button>
        </>
    )
}

export default FillBlank;