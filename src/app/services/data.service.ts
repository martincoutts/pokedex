import { HttpClient } from "@angular/common/http";

export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.url}pokedex/2/`);
  }

  getItem(id: number) {
    return this.http.get(`${this.url}pokemon-species/${id}/`);
  }
}
