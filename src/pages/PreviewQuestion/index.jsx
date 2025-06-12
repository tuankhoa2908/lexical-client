import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import themingLexical from "../../components/LexicalEditor/themingLexical";
import InputFlexOnImage from "../../components/InputFlexOnImage";
import ReturnButton from "../../components/ButtonNavigate/ReturnButton";
import ListWord from "../../components/ListWord/ListWord";

const words = ['in', 'on', 'fly', 'badminton', 'chill', 'loki']

const PreviewQuestion = () => {
    const [data, setData] = useState({
        question: {},
        inputs: null,
        audioUrl: null,
        preview: null
    })

    const questionState = useSelector(state => state.questionState);
    useEffect(() => {
        console.log("====", questionState);
        setData(questionState);
        console.log(1);
    }, [questionState]);
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

    const initialConfig = {
        namespace: 'PreviewEditor',
        theme: themingLexical,
        onError: (error) => console.error(error),
        editable: false,
    };

    const checkAnswer = () => {
        console.log("====", data.inputs);
        console.log("=====", questionState.inputs);
        const correctInputs = data.inputs.map((input) => {
            const correct = questionState.inputs?.find(i => i.key === input.key);
            const isCorrect = correct && correct.value.trim().toLowerCase() === input.value.trim().toLowerCase();
            return { ...input, isCorrect };
        });

        setData(prev => ({
            ...prev,
            inputs: correctInputs
        }));
    }

    return (
        <>
            <ReturnButton />
            <h1>Preview question</h1>
            <div className="editor-container">
                <LexicalComposer initialConfig={initialConfig}>
                    <ImportHTMLPlugin htmlJSON={data.question} />
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                </LexicalComposer>
            </div>
            <audio controls src={data.audioUrl} />
            <br />
            <div
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    marginTop: 10,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                }}
            >
                <img
                    src={data.preview}
                    alt="preview"
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        pointerEvents: "none",
                    }}
                />
                {data.inputs !== null && data.inputs.map((item, idx) => (
                    <InputFlexOnImage
                        id={item.key}
                        x={item.x}
                        y={item.y}
                        value={item.value}
                        canEdit={false}
                        isCorrect={item.isCorrect}
                        onChange={(e) => {
                            const newInputs = data.inputs.map((input, i) => {
                                if (i === idx) {
                                    return { ...input, value: e }; // ✅ tạo object mới thay vì sửa object cũ
                                }
                                return input;
                            });

                            setData((prev) => ({
                                ...prev,
                                inputs: newInputs
                            }));
                        }}

                    />
                ))}
            </div>
            <ListWord words={words} />
            <button className="button-secondary" onClick={checkAnswer}>Check</button>
        </>
    )
};

export default PreviewQuestion;