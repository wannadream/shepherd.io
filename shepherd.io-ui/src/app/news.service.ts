import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from './news';

@Injectable()
export class NewsService {

  constructor(private _http: HttpClient) { }

  getNews() {
    return this._http.get<Array<News>>('/api/news');
  }

  updateNews() {
    return this._http.get<Array<Array<News>>>('/api/news/refresh');
  }

  searchNews(keywords: string) {
    if (!keywords) {
      keywords = '';
    }
    keywords = keywords.trim();

    if (keywords === '') {
      return this._http.get<Array<News>>('/api/news');
    } else {
      return this._http.get<Array<News>>(`/api/news/search/${encodeURIComponent(keywords)}`);
    }
  }
}
