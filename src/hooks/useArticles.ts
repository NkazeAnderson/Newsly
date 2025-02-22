import { useEffect, useState } from 'react'
import { AppQueryParams, Article } from '../types'
import { WebArticleMethods } from '../utils/WebArticles'
import { useQueryMethods } from './useQueryMethods'


function useArticles() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(false)
    const {getQueryValueFor} = useQueryMethods()
    const keyword = getQueryValueFor(AppQueryParams.keyword) || "politics"
    useEffect(()=>{
        setLoading(true)
        WebArticleMethods.getArticleForKeyWord(keyword).then(res=>setArticles(res)).catch(e=>{console.log(e);
        }).finally(()=>{
            setLoading(false)
        })
    }, [keyword])
  return {articles, loading}
}

export default useArticles