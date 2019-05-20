import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {
  constructor(private _http: HttpClient) { }

  getCakes(){
    return this._http.get('/cakes');
  }
  postCake(newCake){
    return this._http.post('/cakes', newCake);  
  }
  postRating(id, rating){
    let url = '/cakes/' + id + '/rate';
    console.log("postRating URL:", url);
    return this._http.post(url, rating);
  }

  // putToServer(id, editTask){
  //   let url = '/tasks/' + id;
  //   console.log(`Putting to url: ${url}`, editTask);
  //   return this._http.put(url, editTask);
  // }
  // deleteFromServer(task){
  //   return this._http.delete('/tasks/' + task['_id']);  
  // }

}
