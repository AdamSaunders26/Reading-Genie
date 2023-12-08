import { Button } from "@/components/ui/button";
import { contentTypes } from "../topics";
import { Action, State, toggleContentType } from "../topicReducer";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function ContentTypesList({
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
      <h1 className="text-2xl font-semibold text-primary text-center mt-4 ">
        What content do they enjoy?
      </h1>
      {contentTypes.map((contentType, idx) => (
        <Button
          onClick={() => {
            toggleContentType(contentType, dispatch);
          }}
          key={idx}
          className={
            selected.contentTypes[
              contentType as keyof typeof selected.contentTypes
            ]
              ? clicked
              : notClicked
          }
        >
          {selected.contentTypes[
            contentType as keyof typeof selected.contentTypes
          ] ? (
            <MdCheckBox className="h-6 w-6 text-[#614bc3]" />
          ) : (
            <MdCheckBoxOutlineBlank className="h-6 w-6" />
          )}
          <div className="mt-1">{contentType}</div>
        </Button>
      ))}
    </div>
  );
}
