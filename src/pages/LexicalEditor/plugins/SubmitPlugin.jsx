import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useDispatch } from 'react-redux';
import { saveRawHTML } from '../../../redux/editorSlice';
import { useNavigate } from 'react-router-dom';

const SubmitPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        editor.update(() => {
            const editorState = editor.getEditorState();
            const json = editorState.toJSON();
            console.log(json);
            dispatch(saveRawHTML(json)); 
        });
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <button className='button' onClick={() => navigate(-1)}>Return</button>
            <button className="button" style={{ marginTop: '10px' }} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default SubmitPlugin;
