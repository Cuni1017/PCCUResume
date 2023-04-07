import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

const DisplayLexical = () => {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      setHtmlString(htmlString);
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
};

export default DisplayLexical;
