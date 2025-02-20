import Container from "./ui/Container";
import CategorySelect from "./CategorySelect";
import PeriodSelect from "./PeriodSelect";
import ArticleCard from "./ArticleCard";
import { AppQueryParams, periods, sources } from "../constants";
import { articles, categories } from "../mockedConstants";
import { useSearchParams } from "react-router";
import Spacer from "./ui/Spacer";
import SourceSelect from "./SourceSelect";
import { useQueryMethods } from "../hooks/useQueryMethods";

function SearchContent() {
  const { getQueryValueFor, setParam, deleteParam } = useQueryMethods();

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
              {articles.map((item) => (
                <ArticleCard article={item} />
              ))}
            </div>
          </div>
          <div className="px-7 py-2">
            <div className="sticky top-10 border border-gray-400 p-4">
              <SourceSelect
                sources={sources}
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
