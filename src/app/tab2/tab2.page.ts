import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  //url: string = "http://localhost:1337/parse/functions/createRegister/";
  url: string = "http://192.168.1.6:1337/parse/functions/createRegister/";
  parseApplicationId: string = "c4mPu$z05t3Nib1310T53rV3r";

  constructor(public http: HttpClient) {}

  SendRegister() {
    let data = {
      id_device: "10",
      timestamp: "2019-06-10T17:02:00Z",
      lat: 3.3722586,
      long: -76.54794559,
      h2o: 8875
    };

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("X-Parse-Application-Id", this.parseApplicationId);

    this.http.post(this.url, JSON.stringify(data), { headers }).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
    console.log(data);
  }
}
