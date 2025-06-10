import { useEffect, useState } from 'react';
import { $getRoot } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function printNodeTree(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const type = node.getType();
  const key = node.__key;
  let output = `${indent}- ${type} (key: ${key})`;

  const children = typeof node.getChildren === 'function' ? node.getChildren() : [];
  for (const child of children) {
    output += '\n' + printNodeTree(child, depth + 1);
  }

  return output;
}

function NodeTreePlugin() {
  const [editor] = useLexicalComposerContext();
  const [tree, setTree] = useState('');

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const treeStr = printNodeTree(root);
        setTree(treeStr);
      });
    });
  }, [editor]);

  return (
    <pre
      className="node-tree-viewer"
      style={{
        whiteSpace: 'pre-wrap',
        background: '#f0f0f0',
        padding: '1rem',
        border: '1px solid #ccc',
        fontSize: '0.85rem',
        marginTop: '1rem',
        color: '#000',
      }}
    >
      {tree}
    </pre>
  );
}

export default NodeTreePlugin;
