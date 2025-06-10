import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function MyPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // This function will be called when the editor is mounted
    const removeListener = editor.registerUpdateListener(({ editorState }) => {
      // This function will be called whenever the editor state updates
      console.log('Editor state updated:', editorState);
    });

    // Return a cleanup function that will be called when the plugin is unmounted
    return () => {
      removeListener();
    };
  }, [editor]);

  return null; // Plugins don't always need to render anything
}

export default MyPlugin;