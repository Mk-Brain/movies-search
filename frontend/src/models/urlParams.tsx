export interface URLParams {
    i: string | null
    t: string
    type: Type | null
    y: string | null
    plot: Plot | null
    r: R | null

}

type Type = "movie" | "series" | "episode"

type Plot = "short" | "full"

type R = "json" | "xml"