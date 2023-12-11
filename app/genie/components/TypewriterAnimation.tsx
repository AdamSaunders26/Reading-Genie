export default function TypewriterAnimation() {
  return (
    <style global jsx>{`
      .custom-type-animation-cursor::after {
        content: "|";
        animation: cursor 1.1s infinite step-start;
      }
      @keyframes cursor {
        50% {
          opacity: 0;
        }
      }
    `}</style>
  );
}
