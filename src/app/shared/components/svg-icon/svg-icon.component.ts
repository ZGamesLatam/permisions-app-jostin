import { Component, Input } from "@angular/core";
import { LayoutService } from "src/app/core/services/ui/layout.service";

@Component({
  selector: "shared-svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrls: ["./svg-icon.component.scss"],
})
export class SvgIconComponent {
  @Input("icon")
  public icon: string = "";
  constructor(public layOut: LayoutService) {}

  getSvgType() {
    return (
      document
        .getElementsByClassName("sidebar-wrapper")[0]
        .getAttribute("icon") == "stroke-svg"
    );
  }
}
