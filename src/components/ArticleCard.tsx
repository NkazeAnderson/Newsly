import React, { useState } from "react";
import Button from "./ui/Button";
import { FaPlus } from "react-icons/fa6";
import { Article } from "../types";
import { Link } from "react-router";

type Props = { article: Article };

function ArticleCard({ article }: Props) {
  const [showSourceFollow, setShowSourceFollow] = useState(false);
  const [showAuthorFollow, setShowAuthorFollow] = useState(false);
  const { source, title, description, imageUrl } = article;
  return (
    <Link to={article.url} target="_blank">
      <div className="my-2 rounded-lg border border-gray-400 p-2">
        <div className="flex gap-2">
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
          {imageUrl && (
            <div className="col-span-1">
              <img
                className="ml-auto size-[150px]"
                src={imageUrl}
                alt="Article image"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
