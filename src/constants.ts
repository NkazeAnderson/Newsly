import { Period } from "./types"

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

export const sources = [
    "New York Times",
    "The Guardian Post"
]

export const addArticlesInterval = 120000
