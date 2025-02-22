import { Article, ArticleApis, NewsApiResponse, NYTimesResponse, TheGuardianResponse } from "../types";

class WebArticles {
    private articlesApis:ArticleApis = {
        NewsApi: "https://newsapi.org/v2/everything",
        TheGuardian: "https://content.guardianapis.com/search",
        NYTimes:"https://api.nytimes.com/svc/search/v2/articlesearch.json"
    }
    constructor (private NYTimesKey:string, private TheGuardianKey:string, private NewsApiKey:string){
   
    }

   private getArticleApiUrl(api:keyof ArticleApis) {
        switch (api) {
            case "NYTimes":
                return `${this.articlesApis.NYTimes}?api-key=${this.NYTimesKey}`
              
            case "TheGuardian":
                return `${this.articlesApis.TheGuardian}?show-fields=trailText,byline,headline,thumbnail&api-key=${this.TheGuardianKey}`
              
            case "NewsApi":
                return `${this.articlesApis.NewsApi}?apiKey=${this.NewsApiKey}`
              
            default:
                throw new Error("We do not support this Api");
                break;
        }
    }
    private async makeRequest (url:string){
       const res = await fetch(url)
       if (res.status === 200) {
        return await res.json()
       }else{
        console.log(res.body);
        throw new Error("An error occured while fetching the url: "+ url);
       }
    }
    private removeByFromByLine(byLine:string){
        return (byLine && byLine.toLocaleLowerCase().startsWith("by")) ? byLine.split("by").reverse()[0].trim() : byLine
    }
    private keyword:string = "Politics"
    private async getArticlesErrorhandler(Func:Promise<Article[]>):Promise<Article[]>{
        try {
            return await Func
        } catch (error) {
            console.log(error);
            return []
        }
    }
    private async getArticlesFromNYTimes():Promise<Article[]>{
            const api:keyof ArticleApis = "NYTimes"
            const url = this.getArticleApiUrl(api) + `&q=${this.keyword}`
             const {response:{docs}} =   await this.makeRequest(url) as { response: {docs: NYTimesResponse[]}}
             return docs.map(item=>{
                const image = item.multimedia.find(media=>media.type === "image") 
                return {
                    id:item._id,
                    title:item.headline.main,
                    description:item.lead_paragraph,
                    date:new Date(item.pub_date),
                    source:{name:item.source, api, author:this.removeByFromByLine(item.byline.original) },
                    url:item.web_url,
                    imageUrl:  image ? `https://www.nytimes.com/${image.url}` : ""
                }
             })
     
    }
    private async getArticlesFromTheGuardian():Promise<Article[]>{
            const api:keyof ArticleApis = "TheGuardian"
            const url = this.getArticleApiUrl(api) + `&q=${this.keyword}`
             const {response:{results}} =   await this.makeRequest(url) as { response: {results: TheGuardianResponse[]}}
             return results.map(item=>{
               
                return {
                    id:item.id,
                    title:item.fields.headline,
                    description:item.fields.trailText,
                    date:new Date(item.webPublicationDate),
                    source:{name:item.fields.publication, api, author:this.removeByFromByLine(item.fields.byline) },
                    url:item.webUrl,
                    imageUrl:  item.fields.thumbnail
                }
             })
    }
    private async getArticlesFromNewsApi():Promise<Article[]>{
            const api:keyof ArticleApis = "NewsApi"
            const url = this.getArticleApiUrl(api) + `&q=${this.keyword}`
             const {articles} =   await this.makeRequest(url) as { articles: NewsApiResponse[]}
             return articles.map(item=>{
                return {
                    id:"",
                    title:item.title,
                    description:item.description,
                    date:new Date(item.publishedAt),
                    source:{name:item.source.name, api, author:this.removeByFromByLine(item.author) },
                    url:item.url,
                    imageUrl:  item.urlToImage
                }
             })
    }
   async getArticleForKeyWord(keyword:string){
    this.keyword = keyword
    const promises = [this.getArticlesErrorhandler(this.getArticlesFromNYTimes()), this.getArticlesErrorhandler(this.getArticlesFromTheGuardian()), this.getArticlesErrorhandler(this.getArticlesFromNewsApi())]
    const resolvedPromises = await Promise.all(promises)
    return resolvedPromises.flatMap(item=>item)
    }
}
export const WebArticleMethods =  new WebArticles()