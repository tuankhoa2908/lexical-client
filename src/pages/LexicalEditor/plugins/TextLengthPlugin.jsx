import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import { $getRoot, $getSelection } from 'lexical';

const TextLengthPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [length, setLength] = useState(0);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent(); // Lấy toàn bộ văn bản
        setLength(textContent.length);
      });
    });
  }, [editor]);

  return (
    <div style={{ marginTop: '8px', fontSize: '14px', color: '#555' }}>
      Text Length: {length} characters
    </div>
  );
};

export default TextLengthPlugin;
