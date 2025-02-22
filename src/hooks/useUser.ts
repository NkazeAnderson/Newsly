import React, { useState } from 'react'
import { Article, followings, user } from '../types'
import { followingsLocalStorageKey } from '../constants'

function useUser() {
    const [user, setUser] = useState<user>({followings:getFollowings()})
    
   
    function getFollowings(){
       const followingsString = localStorage.getItem(followingsLocalStorageKey)
       if (!followingsString) {
        return []
       }
        return JSON.parse(followingsString) as followings[]
    }
    function addFollowing(item:followings) {
        if (user.followings.some(_=>(_.name===item.name && !_.author && !item.author) || (item.name===_.name && item.author && item.author === _.author))) {
            return
        }
        user.followings.push(item)
        setUser({...user})
        localStorage.setItem(followingsLocalStorageKey, JSON.stringify(user.followings))
    }
    
    function confirmFollowings(article:Article){
        const isFollowingSource = user.followings.some(
            (item) => item.name === article.source.name && !item.author,
          );
        
          const isFollowingAuthor = user.followings.some(
            (item) =>
              item.name === article.source.name &&
              item.author &&
              item.author.includes(article.source.author),
          );
          return {isFollowingAuthor, isFollowingSource}
    }

  return {user, addFollowing, confirmFollowings}
}

export default useUser