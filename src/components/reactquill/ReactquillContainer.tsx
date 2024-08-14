import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const ReactquillContainer = () => {
  const quillRef = useRef(null);
  const [editorValue, setEditorValue] = useState("");
  useEffect(() => {
    const quill = quillRef.current.getEditor();
    console.log(quill);
    const applyHeight = () => {
      const description = quill.container.getElementsByClassName("ql-blank");
      if (description.length > 0) {
        if (description.length > 0) {
          description[0].style.height = "300px";
          description[0].style.padding = "12px";
        }
      }
    };

    const applyImageStyles = () => {
      const images = quill.container.getElementsByTagName("img");
      Array.from(images).forEach((image: HTMLImageElement) => {
        if (!image.style.maxWidth || image.style.maxWidth !== "800px") {
          image.style.maxWidth = "480px";
          image.style.width = "auto";
          image.style.height = "auto";
        }
      });
    };

    quill.on("text-change", () => {
      applyImageStyles();
    });

    applyImageStyles();
    applyHeight();
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

  const handleChange = (value) => {
    setEditorValue(value);
  };
  console.log(editorValue);
  return (
    <div style={{ maxWidth: 600, padding: 5 }}>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        placeholder="Descripation..."
        theme="snow"
        value={editorValue}
        onChange={handleChange}
      />
    </div>
  );
};
