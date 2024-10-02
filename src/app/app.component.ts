import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  data = [
    ["Planet", "Diameter", "Mass"],
    ["Earth", 12756, 5.97],
    ["Mars", 6792, 0.642],
  ];
}
