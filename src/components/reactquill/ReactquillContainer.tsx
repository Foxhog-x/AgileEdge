import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ReactquillContainerProp {
  reactQuillEdit: string | undefined;

  setReactQuillEdit: (value: string) => void;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  setNewQuillValues: (value: string) => void;
}

export const ReactquillContainer: React.FC<ReactquillContainerProp> = ({
  reactQuillEdit,
  setReactQuillEdit,
  hasChanges,
  setNewQuillValues,
  setHasChanges,
}: ReactquillContainerProp) => {
  const quillRef = useRef<ReactQuill | null | any>(null);
  const [editorValue, setEditorValue] = useState<any>(reactQuillEdit);

  useEffect(() => {
    if (editorValue !== reactQuillEdit) {
      setHasChanges(true);
    }
  }, [editorValue, reactQuillEdit, setHasChanges]);

  useEffect(() => {
    if (!hasChanges) {
      console.log("happen");
      setReactQuillEdit(editorValue);
    }
  }, [reactQuillEdit, hasChanges]);
  useEffect(() => {
    setNewQuillValues(editorValue);
  });
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const applyDefaultFontSize = () => {
        const fontSize = quill.container.getElementsByClassName("ql-editor");
        fontSize[0].style.fontSize = "18px";
      };

      const applyHeight = () => {
        const description = quill.container.getElementsByClassName("ql-blank");
        if (description.length > 0) {
          description[0].style.height = "300px";
          description[0].style.padding = "12px";
        }
      };

      const clipboardPosition = () => {
        const getClipboard =
          quill.container.getElementsByClassName("ql-editing");
        if (getClipboard.length > 0) {
          getClipboard[0].style.clientLeft = "100px";
        }
      };

      const applyImageStyles = () => {
        const images = quill.container.getElementsByTagName("img");
        Array.from(images as NodeListOf<HTMLImageElement>).forEach(
          (image: HTMLImageElement) => {
            if (!image.style.maxWidth || image.style.maxWidth !== "800px") {
              image.style.maxWidth = "480px";
              image.style.width = "auto";
              image.style.height = "auto";
              image.style.marginTop = "18px";
            }
          }
        );
      };

      quill.on("text-change", () => {
        applyImageStyles();
      });
      applyImageStyles();
      applyHeight();
      applyDefaultFontSize();
      clipboardPosition();
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
        ["video"],
        ["link", "blockquote", "code-block", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
      ],
    },
  };

  const handleChange = (value: any) => {
    setEditorValue(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        placeholder="Description..."
        theme="snow"
        value={editorValue}
        onChange={handleChange}
      />
    </div>
  );
};
