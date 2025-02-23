import Container from "./ui/Container";
import CategorySelect from "./CategorySelect";
import PeriodSelect from "./PeriodSelect";
import ArticleCard from "./ArticleCard";
import { categories, periods } from "../constants";
import Spacer from "./ui/Spacer";
import SourceSelect from "./SourceSelect";
import { useQueryMethods } from "../hooks/useQueryMethods";
import { AppQueryParams, Article } from "../types";
import { useContext, useEffect, useState } from "react";
import { ArticlesContext } from "../contextProviders/ArticlesContextProvider";
import useArticles from "../hooks/useArticles";
import { UserContext } from "../contextProviders/UserContextProvider";
import useUser from "../hooks/useUser";

function SearchContent() {
  const { getQueryValueFor, setParam, deleteParam } = useQueryMethods();
  const { articles, loading } = useContext(ArticlesContext) as ReturnType<
    typeof useArticles
  >;
  const { addFollowing, confirmFollowings } = useContext(
    UserContext,
  ) as ReturnType<typeof useUser>;
  const [sort, setSort] = useState(true);

  const sourcesSet = new Set(articles.map((item) => item.source.name));
  let displayedArticles = [...articles];
  const source = getQueryValueFor(AppQueryParams.source);
  const period = getQueryValueFor(AppQueryParams.period);
  const category = getQueryValueFor(AppQueryParams.category);
  if (source) {
    displayedArticles = displayedArticles.filter(
      (item) => item.source.name === source,
    );
  }
  if (period) {
    displayedArticles = displayedArticles.filter((item) => {
      const selectedPeriod = periods.find((item) => item.value === period);
      const millisecondsInOneDay = 1000 * 60 * 60 * 24;
      const currentTimeStamp = new Date().getTime();
      const articleTimeStamp = item.date.getTime();
      switch (selectedPeriod?.value) {
        case "day":
          return articleTimeStamp + millisecondsInOneDay > currentTimeStamp;
        case "week":
          return articleTimeStamp + millisecondsInOneDay * 7 > currentTimeStamp;
        case "month":
          return (
            articleTimeStamp + millisecondsInOneDay * 30 > currentTimeStamp
          );
        case "year":
          return (
            articleTimeStamp + millisecondsInOneDay * 30 * 12 > currentTimeStamp
          );
        case "plusOneYear":
          return (
            articleTimeStamp + millisecondsInOneDay * 30 * 12 < currentTimeStamp
          );

        default:
          return true;
      }
    });
  }

  if (sort) {
    const first: Article[] = [];
    const second: Article[] = [];
    displayedArticles.forEach((item) => {
      const { isFollowingAuthor, isFollowingSource } = confirmFollowings(item);
      if (isFollowingAuthor || isFollowingSource) {
        first.push(item);
        return;
      }
      second.push(item);
    });
    // displayedArticles = displayedArticles.sort((first, second) => {
    //   return (
    //     Number(
    //       confirmFollowings(first).isFollowingAuthor ||
    //         confirmFollowings(first).isFollowingSource,
    //     ) -
    //     Number(
    //       confirmFollowings(second).isFollowingAuthor ||
    //         confirmFollowings(second).isFollowingSource,
    //     )
    //   );
    // });
    displayedArticles = [...first, ...second];
    setSort(false);
  }

  useEffect(() => {
    setSort(true);
    console.log("Sorting");
  }, [category]);

  return (
    <Container>
      <div className="pb-10">
        <CategorySelect
          categories={categories}
          selected={category}
          setQueryValue={setParam(AppQueryParams.category)}
          removeQuery={deleteParam(AppQueryParams.category)}
        />
        <Spacer space={20} />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="order-last col-span-1 md:order-first md:col-span-2">
            <div className="flex items-center justify-between rounded-r-2xl bg-black/20 p-2">
              <div className="flex-grow">
                <h3>
                  {getQueryValueFor(AppQueryParams.category) ??
                    "Personalized News Feed"}
                </h3>
              </div>
              <div>
                <PeriodSelect
                  periods={periods}
                  selected={period}
                  setQueryValue={setParam(AppQueryParams.period)}
                  removeQuery={deleteParam(AppQueryParams.period)}
                />
              </div>
            </div>
            <Spacer space={8} />
            <div className="space-y-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-2 py-24">
                  <img className="size-24 animate-ping" src="/logo.png" />
                  <p className="font-bold text-black">Loading...</p>
                </div>
              ) : (
                <div>
                  {!displayedArticles.length ? (
                    <p>Sorry!, no Articles match this search</p>
                  ) : (
                    <div>
                      <p className="py-2">
                        <b>Results:</b> {displayedArticles.length}
                      </p>
                      {displayedArticles.map((item, index) => {
                        const { isFollowingAuthor, isFollowingSource } =
                          confirmFollowings(item);
                        return (
                          <ArticleCard
                            key={`${item.id}-${index}`}
                            article={item}
                            addFollowing={addFollowing}
                            isFollowingAuthor={isFollowingAuthor}
                            isFollowingSource={isFollowingSource}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 px-7 py-2">
            <div className="sticky top-10 max-h-[25vh] border border-gray-400 p-4 pb-10 lg:max-h-[75vh]">
              <SourceSelect
                sources={[...sourcesSet]}
                selected={source}
                setQueryValue={setParam(AppQueryParams.source)}
                removeQuery={deleteParam(AppQueryParams.source)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SearchContent;
