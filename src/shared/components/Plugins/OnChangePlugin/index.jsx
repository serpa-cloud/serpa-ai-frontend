// @flow
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from "lexical";
import { forwardRef, useEffect, useImperativeHandle, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type Props = {|
  +onChange?: ?({ plainText: string, state: any }) => void,
  +onSubmit?: ?({ plainText: string, state: any }) => void,
|};

function OnChangePluginInterface(
  { onChange = null, onSubmit = null }: Props,
  ref: React$RefSetter<any>
): React$Node {
  const [editor] = useLexicalComposerContext();

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(async () => {
      const text = $getRoot().getTextContent();
      const editorState = editor.getEditorState();
      const serializedState = editorState.toJSON();

      if (onSubmit) onSubmit({ plainText: text, state: serializedState });
    });
  }, [editor, onSubmit]);

  const replaceState = useCallback(
    (newState: any) => {
      editor.update(() => {
        try {
          const parsedState = editor.parseEditorState(newState);
          editor.setEditorState(parsedState);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to replace editor state:", error);
        }
      });
    },
    [editor]
  );

  useImperativeHandle(ref, () => ({
    replaceState,
    submit: handleOnSend,
  }));

  const handleOnChange = useCallback(() => {
    editor.getEditorState().read(() => {
      const text = $getRoot().getTextContent();
      const editorState = editor.getEditorState();
      const serializedState = editorState.toJSON();

      if (onChange) onChange({ plainText: text, state: serializedState });
    });
  }, [editor, onChange]);

  useEffect(() => {
    const removeEnterListener = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const mustSend = event?.shiftKey || event?.ctrlKey || event?.metaKey;
        if (!mustSend) {
          return false;
        }
        event?.preventDefault();
        handleOnSend();
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );

    // Register the listener for editor changes
    const removeChangeListener = editor.registerUpdateListener(() => {
      handleOnChange();
    });

    return () => {
      removeEnterListener();
      removeChangeListener();
    };
  }, [editor, handleOnChange, handleOnSend, onChange]);

  return null;
}

export default forwardRef(OnChangePluginInterface);
