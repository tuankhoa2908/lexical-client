import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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
        </div>
    );
}

export default ToolbarPlugin;