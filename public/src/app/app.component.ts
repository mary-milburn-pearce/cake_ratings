import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  cakes: any;
  newCake: object;
  addResults: object;
  cakeClicked: object;
  title = 'public';
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.newCake = { baker: "", imageURL: "" }
    this.addResults = { content: "" }
    this.getCakesFromService();
  }
  getCakesFromService() {
    let observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.cakes = [];
      this.cakes = data['data'];
      if (this.cakeClicked) {
        this.updateCakeClicked();
      }
  })
  }
  onSubmitAdd(newCake) { 
    let observable = this._httpService.postCake(newCake);
    observable.subscribe(data => {
      if (data['errors']) {
        this.addResults['content']=data['message']
      } else {
        this.getCakesFromService();
      }
    });
    this.newCake = { title: "", description: "" };
    this.addResults = { content: "" };
  }
  postRating(ratingInfo) {
    let observable = this._httpService.postRating(ratingInfo);
    observable.subscribe(data => {
      console.log("SubmitRating returned:", data);
      if (data['errors']) {
        //possibly add an area for rate posting errors (not likely since comments optional)
      } else {
        this.getCakesFromService();
      }
    })
  }
  onClickCake(cake) {
    let avg = 0;
    var ratingHeader="";
    if (cake.ratings.length == 0) {
      ratingHeader = "Not yet rated";
    } else {
      let ratingsTotal=0;
      for (let i=0; i<cake.ratings.length; i++) {
        ratingsTotal+=parseInt(cake.ratings[i].points);
      }
      avg = ratingsTotal/cake.ratings.length;
      ratingHeader = `Average rating: ${avg} stars`;
    }
    this.cakeClicked = {
      id: cake._id,
      baker: cake.baker,
      imageURL: cake.imageURL,
      ratings: cake.ratings,
      averageRating: ratingHeader
    }
  }
  updateCakeClicked() {
    for (let c of this.cakes) {
      if (c['_id'] == this.cakeClicked['id']) {
        this.onClickCake(c);
        break;
      }
    }
  }

}
