import Container from "./ui/Container";
import CategorySelect from "./CategorySelect";
import PeriodSelect from "./PeriodSelect";
import ArticleCard from "./ArticleCard";
import { periods, sources } from "../constants";
import { categories } from "../mockedConstants";
import Spacer from "./ui/Spacer";
import SourceSelect from "./SourceSelect";
import { useQueryMethods } from "../hooks/useQueryMethods";
import { AppQueryParams } from "../types";
import { useContext } from "react";
import { ArticlesContext } from "../contextProviders/ArticlesContextProvider";
import useArticles from "../hooks/useArticles";

function SearchContent() {
  const { getQueryValueFor, setParam, deleteParam } = useQueryMethods();
  const { articles, loading } = useContext(ArticlesContext) as ReturnType<
    typeof useArticles
  >;
  const sourcesSet = new Set(articles.map((item) => item.source.name));
  let displayedArticles = [...articles];
  const source = getQueryValueFor(AppQueryParams.source);
  if (source) {
    displayedArticles = displayedArticles.filter(
      (item) => item.source.name === source,
    );
  }

  return (
    <Container>
      <div className="pb-10">
        <CategorySelect
          categories={categories}
          selected={getQueryValueFor(AppQueryParams.category)}
          setQueryValue={setParam(AppQueryParams.category)}
          removeQuery={deleteParam(AppQueryParams.category)}
        />
        <Spacer space={20} />
        <div className="grid grid-cols-3">
          <div className="col-span-2">
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
                  selected={getQueryValueFor(AppQueryParams.period)}
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
                displayedArticles.map((item, index) => (
                  <ArticleCard key={`${item.id}-${index}`} article={item} />
                ))
              )}
            </div>
          </div>
          <div className="px-7 py-2">
            <div className="sticky top-10 max-h-[75vh] border border-gray-400 p-4 pb-10">
              <SourceSelect
                sources={[...sourcesSet]}
                selected={getQueryValueFor(AppQueryParams.source)}
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
