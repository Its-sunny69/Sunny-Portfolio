import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  sunburst,
  atelierSulphurpoolDark,
  arta,
  atelierHeathDark,
  gml,
  irBlack,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Data = {
  title: string;
  description: string;
  codeSnippet: string;
};

export default function LabelDetailCard({
  data,
  ref,
}: {
  data: Data;
  ref: React.Ref<HTMLDivElement>;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const HandleCopy = () => {
    navigator.clipboard.writeText(data.codeSnippet);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="z-70 flex h-screen w-full items-center justify-center">
      <div
        className="absolute inset-0 mask-t-from-black mask-t-from-80% mask-t-to-transparent mask-r-from-white mask-r-from-80% mask-r-to-transparent mask-b-from-white mask-b-from-80% mask-b-to-transparent mask-l-from-white mask-l-from-80% mask-l-to-transparent mask-alpha"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 1px, rgba(225,225,225, 0.4) 1px)",
          backgroundRepeat: "repeat",
          backgroundSize: "5px 5px",
        }}
      />
      <div
        ref={ref}
        className="scroll-bar relative z-80 h-[80%] w-[90%] overflow-x-hidden overflow-y-auto rounded-lg bg-black p-8 text-sm text-gray-200"
      >
        <p className="text-3xl">{data.title}</p>
        <p className="my-4 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: data.description.replace(/\n/g, '<br />') }} />
        <div className="rounded-lg border border-dashed border-gray-600">
          <div className="flex items-center justify-between p-3">
            <p className="font-36days " data-cursor-hover="true">Code Snippet</p>
            <button onClick={HandleCopy} className="hover:text-neutral-600 active:scale-95 transition-all cursor-pointer" data-cursor-hover="true" title="Copy">
              <ContentCopyRoundedIcon />
            </button>

            <AnimatePresence>
              {isCopied && (
                <motion.div
                  className="fixed top-5 right-5 rounded-md bg-white px-6 py-2 text-sm text-black shadow-lg"
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <hr className="h-[0.5px] border-none bg-gray-600" />

          <SyntaxHighlighter
            language="tsx"
            style={irBlack}
            showLineNumbers
            wrapLongLines
            className="my-2"
          >
            {data.codeSnippet}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
