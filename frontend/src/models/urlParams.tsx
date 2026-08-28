export interface URLParams {
    i: string
    t: string
    type: Type
    y: string
    plot: Plot
    r: R

}

type Type = "movie" | "series" | "episode"

type Plot = "short" | "full"

type R = "json" | "xml"