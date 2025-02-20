import React, { useState } from "react";
import Button from "./ui/Button";
import { FaPlus } from "react-icons/fa6";

type Props = { article: Article };

function ArticleCard({ article }: Props) {
  const [showSourceFollow, setShowSourceFollow] = useState(false);
  const [showAuthorFollow, setShowAuthorFollow] = useState(false);
  const { source, title, description, imageUrl } = article;
  return (
    <div className="rounded-lg border border-gray-400 p-2">
      <div className="flex gap-2">
        <img
          className="size-6 rounded-full border"
          src={source.logo}
          alt="Company Logo"
        />
        <p>
          From{" "}
          <span
            className="relative font-semibold text-black"
            onMouseEnter={() => {
              setShowSourceFollow(true);
            }}
            onMouseLeave={() => {
              setShowSourceFollow(false);
            }}
          >
            {source.name}
            <span
              className="absolute bottom-10 left-1/2 size-full rounded-4xl"
              style={{ display: showSourceFollow ? "inline-block" : "none" }}
            >
              <Button
                variant="filled"
                icon={FaPlus}
                text="Follow"
                action={() => {}}
              />
            </span>
          </span>{" "}
          by{" "}
          <span
            className="relative z-0 font-semibold text-black"
            onMouseEnter={() => {
              setShowAuthorFollow(true);
            }}
            onMouseLeave={() => {
              setShowAuthorFollow(false);
            }}
          >
            {source.author}
            <span
              className="absolute bottom-10 left-1/2 size-full rounded-4xl"
              style={{ display: showAuthorFollow ? "inline-block" : "none" }}
            >
              <Button
                variant="filled"
                icon={FaPlus}
                text="Follow"
                action={() => {}}
              />
            </span>
          </span>
        </p>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="col-span-1">
          <img className="size-[150px]" src={imageUrl} alt="Article image" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
