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

const ImportHTMLPlugin = ({ htmlJSON }) => {
    const [editor] = useLexicalComposerContext();
    if (!htmlJSON) return null;
    useEffect(() => {
        if (htmlJSON === null) return;
        const parsedState = editor.parseEditorState(htmlJSON);
        console.log(parsedState);
        editor.setEditorState(parsedState);
    }, [htmlJSON, editor]);

    return null;
};

const FillBlank = () => {
    const rawHTML = useSelector((state) => state.editor.rawHTML);
    console.log(rawHTML);

    const initialConfig = {
        namespace: 'PreviewEditor',
        theme: themingLexical,
        onError: (error) => console.error(error),
        editable: true,
        nodes: [FillBlankNode]
    };


    return (
        <>
            <LexicalComposer initialConfig={initialConfig}>
                <ImportHTMLPlugin htmlJSON={rawHTML} />
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<div className="editor-placeholder">Loading content...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
            </LexicalComposer>
        </>
    )
}

export default FillBlank;