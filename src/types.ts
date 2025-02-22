

export enum AppQueryParams {
  category="cat",
  source="src",
  period="prd",
  keyword="keyword"
}

export interface ArticleApis {
  NewsApi :"https://newsapi.org/v2/everything",
  NYTimes :"https://api.nytimes.com/svc/search/v2/articlesearch.json",
  TheGuardian:"https://content.guardianapis.com/search"
}

export interface Article {
  id:string
    title: string;
    description: string;
    source: {
      name: string;
      author: string;
      api:keyof ArticleApis
    };
    url: string;
    imageUrl: string;
    date:Date
  }

 export interface Period {
    text:string,
    value: "day" | "week" | "month" | "year" | "plusOneYear"
  }

 export interface QueryComponentsProps {
    selected: string | null;
    setQueryValue: (value: string) => void;
    removeQuery: VoidFunction;
  }

 export type NYTimesResponse = {
  "web_url": string,
  "lead_paragraph": string,
  "source": string,
  "multimedia": {
      "type": "image",
      "url": string,
    }[]
  ,
  "headline": {
    "main": string
  },
  "pub_date": string,
  "subsection_name": string,
  "byline": {
    "original": string,
  },
  "_id": string,
}

export type NewsApiResponse =  {
  "source": {
    "id": null|string,
    "name": string
  },
  "author": string,
  "title": string,
  "description": string,
  "url": string,
  "urlToImage": string,
  "publishedAt": string,
}

export type TheGuardianResponse =    {
  "id": string,
  "webPublicationDate": string,
  "webTitle": string,
  "webUrl": string,
  "fields": {
    "headline": string,
    "trailText": string,
    "byline": string,
    "thumbnail": string,
    "publication":string
  }
}