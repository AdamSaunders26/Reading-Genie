import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

export default function LikeButtons() {
  const [likeButton, setLikeButton] = useState(false);
  const [dislikeButton, setDislikeButton] = useState(false);

  const buttonClass =
    "text-center flex-1 flex items-center justify-center gap-2 py-2 rounded-b-md  ";
  return (
    <div className="flex justify-between bg-primary text-white rounded-b-md ">
      <p
        className={
          likeButton ? buttonClass + " bg-geniePurple-700 " : buttonClass
        }
        onClick={() => {
          setLikeButton((curr) => !curr);
          setDislikeButton(false);
        }}
      >
        <FaThumbsUp
          className={likeButton ? "text-accent animate-bounce-short" : ""}
        />{" "}
        <span className="pt-1">Like</span>
      </p>
      <p
        className={
          dislikeButton
            ? buttonClass +
              " bg-geniePurple-700 border-l-2 border-l-white rounded-l-none "
            : buttonClass + " border-l-2 border-l-white rounded-l-none"
        }
        onClick={() => {
          setDislikeButton((curr) => !curr);
          setLikeButton(false);
        }}
      >
        <FaThumbsDown
          className={dislikeButton ? "text-accent animate-bounce-short" : ""}
        />
        <span className="pt-1">Dislike</span>
      </p>
    </div>
  );
}
