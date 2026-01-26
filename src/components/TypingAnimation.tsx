import { motion } from "motion/react";

export default function TypingAnimation({
  text,
  delay = 0,
  className,
  style,
  whileInView = false,
}: {
  text?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  whileInView?: boolean;
}) {
  const displayText =
    text || "This is a typing animation component placeholder.";

  const words = displayText.split(" ");
  let charIndex = 0;

  return (
    <div className={className} style={style}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split("").map((char, index) => {
            const currentCharIndex = charIndex++;
            return (
              <motion.span
                key={index}
                style={{ display: "inline-block" }}
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                }}
                whileInView={
                  whileInView
                    ? {
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                    : undefined
                }
                animate={
                  whileInView
                    ? undefined
                    : {
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                }
                transition={{
                  delay: currentCharIndex * 0.05 + delay,
                  duration: 0.5,
                  ease: "easeIn",
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <motion.span
              style={{ display: "inline-block" }}
              initial={{
                opacity: 0,
                filter: "blur(4px)",
              }}
              whileInView={
                whileInView
                  ? {
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              animate={
                whileInView
                  ? undefined
                  : {
                      opacity: 1,
                      filter: "blur(0px)",
                    }
              }
              transition={{
                delay: charIndex++ * 0.05 + delay,
                duration: 0.5,
                ease: "easeIn",
              }}
            >
              {"\u00A0"}
            </motion.span>
          )}
        </span>
      ))}
    </div>
  );
}
