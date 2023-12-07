import { Button } from "@/components/ui/button";
import { contentLengths } from "../topics";
import { Action, State, toggleContentLength } from "../topicReducer";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function ContentLengthsList({
  selected,
  dispatch,
  buttonClasses,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
  buttonClasses: {
    clicked: string;
    notClicked: string;
  };
}) {
  const { clicked, notClicked } = buttonClasses;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary text-center mt-4">
        Length of content
      </h1>
      {contentLengths.map((contentLength, idx) => (
        <Button
          onClick={() => {
            toggleContentLength(contentLength.split(" ")[0], dispatch);
          }}
          key={idx}
          className={
            selected.contentLengths[
              contentLength.split(
                " "
              )[0] as keyof typeof selected.contentLengths
            ]
              ? clicked
              : notClicked
          }
        >
          {selected.contentLengths[contentLength.split(" ")[0]] ? (
            <MdCheckBox className="h-6 w-6 text-[#614bc3]" />
          ) : (
            <MdCheckBoxOutlineBlank className="h-6 w-6" />
          )}

          <div className="mt-1">{contentLength}</div>
        </Button>
      ))}
    </div>
  );
}
