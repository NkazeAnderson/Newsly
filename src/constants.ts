export const NYTIMESURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=[]"
export const periods:[Period, ...Period[]] = [
    {value:"day", text:"Today"},
    {value:"week", text:"This week"},
    {value:"month", text:"This month"},
    {value:"year", text:"This year"},
    {value:"plusOneYear", text:"+1 year"},
]
export const AppInfo = {
    name: "Newsly",
}
export enum AppQueryParams {
    category="cat",
    source="src",
    period="prd",
    keyword="keyword"
}

export const sources = [
    "New York Times",
    "The Guardian Post"
]