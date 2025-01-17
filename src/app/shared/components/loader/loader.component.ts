import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "shared-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  public show: boolean = true;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
