import React, { useContext, useState } from "react";
import Button from "./ui/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Article, followings } from "../types";
import { Link } from "react-router";
import { UserContext } from "../contextProviders/UserContextProvider";
import useUser from "../hooks/useUser";

type Props = {
  article: Article;
  isFollowingAuthor: boolean;
  isFollowingSource: boolean;
  addFollowing: (item: followings) => void;
};

function ArticleCard({
  article,
  isFollowingAuthor,
  isFollowingSource,
  addFollowing,
}: Props) {
  const [showSourceFollow, setShowSourceFollow] = useState(false);
  const [showAuthorFollow, setShowAuthorFollow] = useState(false);
  const { source, title, description, imageUrl, date } = article;

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
                  icon={isFollowingSource ? FaMinus : FaPlus}
                  text={isFollowingSource ? "Unfollow" : "Follow"}
                  action={() => {
                    addFollowing({ name: source.name });
                  }}
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
                  icon={isFollowingAuthor ? FaMinus : FaPlus}
                  text={isFollowingAuthor ? "Unfollow" : "Follow"}
                  action={() => {
                    addFollowing({
                      name: article.source.name,
                      author: article.source.author,
                    });
                  }}
                />
              </span>
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="order-last col-span-1 md:order-first md:col-span-2">
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="text-right text-sm">{date.toDateString()}</p>
          </div>
          {imageUrl && (
            <div className="col-span-1">
              <img
                className="ml-auto h-[150px] w-full"
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
