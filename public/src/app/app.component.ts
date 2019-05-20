import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  cakes: object;
  newCake: object;
  addResults: object;
  cakeClicked: object;
  newRating=[];
  arrCakes: any;
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
      this.cakes = data;
    })
  }
  onSubmitAdd(newCake) { 
    console.log(`Submit called with: ${newCake}`);
    let observable = this._httpService.postCake(newCake);
    observable.subscribe(data => {
      console.log("Returned:", data);
      if (data['errors']) {
        this.addResults['content']=data['message']
      } else {
        this.getCakesFromService();
      }
    });
    this.newCake = { title: "", description: "" };
    this.addResults = { content: "" };
  }
  onSubmitRating(cake) {
    console.log('onSubmitRating:', this.frmRate)
    let observable = this._httpService.postRating(cake['_id'], this.newRating);
    observable.subscribe(data => {
      console.log("SubmitRating returned:", data);
      if (data['errors']) {
        //this.rateResults['content']=data['message']
      } else {
        this.getCakesFromService();
      }
    })
  }
  onClickCake(cake) {
    console.log(`Cake clicked: ${JSON.stringify(cake)}`);
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
      baker: cake.baker,
      imageURL: cake.imageURL,
      ratings: cake.ratings,
      averageRating: ratingHeader
    }
    console.log('cakeClicked:', this.cakeClicked);
  }

}
