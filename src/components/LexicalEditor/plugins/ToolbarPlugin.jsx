import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState, useEffect } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, createCommand } from "lexical";
import { $patchStyleText } from '@lexical/selection';
export const SET_FONT_SIZE_COMMAND = createCommand("SET_FONT_SIZE_COMMAND");

import { FaCode, FaBold, FaItalic, FaUnderline, FaUndo, FaRedo } from "react-icons/fa";

const FONT_SIZES = ["12px", "14px", "16px", "18px", "24px", "32px"];
const TEXT_FORMATS = ["bold", "italic", "code", "underline"];

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({});
  const [currentFontSize, setCurrentFontSize] = useState("");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        // Check active formats (bold, italic...)
        const newFormats = TEXT_FORMATS.reduce((acc, format) => {
          acc[format] = selection.hasFormat(format);
          return acc;
        }, {});
        setFormats(newFormats);
      });
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SET_FONT_SIZE_COMMAND,
      (fontSize) => {
        setCurrentFontSize(fontSize);
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              "font-size": fontSize,
            });
          }
        });
        return true;
      },
      0
    );
  }, [editor]);


  return (
    <div className="toolbar">
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Undo"
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Redo"
      >
        <FaRedo />
      </button>

      <select
        value={currentFontSize}
        onChange={(e) => editor.dispatchCommand(SET_FONT_SIZE_COMMAND, e.target.value)}
        style={{ padding: "4px", borderRadius: "4px" }}
      >
        <option value="" disabled>
          Font size
        </option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={formats.bold ? 'active' : ''}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={formats.italic ? 'active' : ''}
      >
        <FaItalic />
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
        <FaUnderline />
      </button>
    </div>
  );
}

export default ToolbarPlugin;