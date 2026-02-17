/* eslint-disable no-unused-vars */
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";


// Convert FileList → array of image files
function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

export default function Editor({rteRef}) {
  const extensions = useExtensions({
    placeholder: "Describe your property here...",
  });

  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");

   
  const handleNewImageFiles = useCallback((files, insertPosition) => {
    if (!rteRef.current?.editor) return;

    const attributesForImageFiles = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    insertImages({
      images: attributesForImageFiles,
      editor: rteRef.current.editor,
      position: insertPosition,
    });
  }, [rteRef]);

  const handleDrop = useCallback(
    (view, event) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) return false;

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        const insertPosition = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        handleNewImageFiles(imageFiles, insertPosition);
        event.preventDefault();
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  const handlePaste = useCallback(
    (_view, event) => {
      if (!event.clipboardData) return false;

      const pastedImageFiles = fileListToImageFiles(
        event.clipboardData.files
      );

      if (pastedImageFiles.length > 0) {
        handleNewImageFiles(pastedImageFiles);
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  return (
    <>
      <RichTextEditor
        ref={rteRef}
        sx={{minHeight: "250px"}}
        extensions={extensions}
        content={""}
        editable={isEditable}
        editorProps={{
          handleDrop,
          handlePaste,
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          variant: "outlined",
          MenuBarProps: {
            hide: !showMenuBar,
          },
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>
    </>
  );
}
