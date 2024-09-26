export interface TitleQuery {
    /** Title of movie or series */
    t: string;
    /** Year of release */
    y?: number;
    /** Return movie or series */
    type?: "movie" | "series";
    /** Return short or full plot */
    plot?: "short" | "full";
    /** The response type to return */
    r?: "json" | "xml";
    /** JSONP callback name */
    callback?: string;
}

export interface TitleSearchQuery {
    /** Title of movie or series */
    s: string;
    /** Year of release */
    y?: number;
    /** Return movie or series */
    type?: "movie" | "series" | "episode";
    /** The response type to return */
    r?: "json" | "xml";
    /** Page number to return */
    page?: number;
    /** JSONP callback name */
    callback?: string;
}

export interface GetIdQuery {
    /** A valid IMDb ID (e.g. tt0000001) */
    i: string;
    /** Return short or full plot */
    plot?: "short" | "full";
    /** The response type to return */
    r?: "json" | "xml";
    /** JSONP callback name */
    callback?: string;
}

export interface OmdbApiResponse<T> {
    Response: string;
    totalResults: string;
    Search: T;
}


export interface MovieModel {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    Response: string;
    Ratings?: { Source: string; Value: string }[];

    totalSeasons?: string; // Optional
    tomatoMeter?: string; // Optional
    tomatoImage?: string; // Optional
    tomatoRating?: string; // Optional
    tomatoReviews?: string; // Optional
    tomatoFresh?: string; // Optional
    tomatoRotten?: string; // Optional
    tomatoConsensus?: string; // Optional
    tomatoUserMeter?: string; // Optional
    tomatoUserRating?: string; // Optional
    tomatoUserReviews?: string; // Optional
    tomatoURL?: string; // Optional
    DVD?: string; // Optional
    BoxOffice?: string; // Optional
    Production?: string; // Optional
    Website?: string; // Optional
}


export interface TitleSearchResponse extends OmdbApiResponse<MovieModel[]> {}