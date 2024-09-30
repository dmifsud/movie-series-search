import axios from 'axios';
import {
    GetIdQuery,
    MovieModel,
    OmdbApiResponseError,
    TitleQuery,
    TitleSearchQuery,
    TitleSearchResponse,
} from './models/omdb.schema';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
    console.error('API KEY missing! Please add it in the .env file');
}

const API_URL = 'http://www.omdbapi.com/';

const mainParams = {
    apikey: API_KEY,
};

export class OmdbApi {
    static async get<T = any>(params: T) {
        return axios.get(API_URL, {
            params: { ...mainParams, ...params },
        });
    }

    static async getTitle(title: string): Promise<MovieModel>;
    static async getTitle(query: TitleQuery): Promise<MovieModel>;

    static async getTitle(arg: string | TitleQuery): Promise<MovieModel> {
        let params: TitleQuery;
        if (typeof arg === 'string') {
            params = { t: arg };
        } else {
            params = arg;
        }
        const response = await OmdbApi.get<TitleQuery>(params);
        return response.data;
    }

    static async titleSearch(
        title: string
    ): Promise<TitleSearchResponse | OmdbApiResponseError>;
    static async titleSearch(
        query: TitleSearchQuery
    ): Promise<TitleSearchResponse | OmdbApiResponseError>;

    static async titleSearch(
        arg: string | TitleSearchQuery
    ): Promise<TitleSearchResponse | OmdbApiResponseError> {
        let params: TitleSearchQuery;
        if (typeof arg === 'string') {
            params = { s: arg };
        } else {
            params = arg;
        }
        const response = await OmdbApi.get<TitleSearchQuery>(params);
        return response.data;
    }

    static async getId(
        imdbID: string
    ): Promise<MovieModel | OmdbApiResponseError>;
    static async getId(
        query: GetIdQuery
    ): Promise<MovieModel | OmdbApiResponseError>;

    static async getId(
        arg: string | GetIdQuery
    ): Promise<MovieModel | OmdbApiResponseError> {
        let params: GetIdQuery;
        if (typeof arg === 'string') {
            params = { i: arg };
        } else {
            params = arg;
        }
        const response = await OmdbApi.get<GetIdQuery>(params);
        return response.data;
    }
}
