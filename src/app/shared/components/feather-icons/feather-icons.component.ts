import { Component, OnInit, Input } from "@angular/core";
import * as feather from "feather-icons";

@Component({
  selector: "shared-feather-icons",
  templateUrl: "./feather-icons.component.html",
  styleUrls: ["./feather-icons.component.scss"],
})
export class FeatherIconsComponent implements OnInit {
  @Input("icon") public icon: string = "";

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      feather.replace();
    });
  }
}
