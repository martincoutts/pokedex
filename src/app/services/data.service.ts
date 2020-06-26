import { HttpClient } from '@angular/common/http';

export class DataService {
    constructor(private url: string, private http: HttpClient) {}

    getAll() {
        return this.http.get(`${this.url}pokedex/1?limit=4`);
    }

    getItem(id: number, param: string, url?: string) {
        return url
            ? this.http.get(url)
            : this.http.get(`${this.url}${param}/${id}/`);
    }
}
