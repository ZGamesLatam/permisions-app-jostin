import { Component, OnInit, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LayoutService } from "src/app/core/services/ui/layout.service";

@Component({
  selector: "shared-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"],
})
export class CustomizerComponent implements OnInit {
  public screenwidth: any = window.innerWidth;
  public customizer: string = "";
  public layoutType: string = "ltr";
  public sidebarType: string = "compact-wrapper";
  public sidebarSetting: string = "default-sidebar";
  public MIXLayout: string = "default";
  public icon: string = "stroke-svg";

  public primary_color: string = "#84A7CD";
  public secondary_color: string = "#214178";

  constructor(private modalService: NgbModal, public layout: LayoutService) {}

  @HostListener("window:resize", ["$event"])
  onResize(event: { target: { innerWidth: any } }) {
    this.screenwidth = event.target.innerWidth;
  }

  ngOnInit() {}

  // Open Modal
  openModal(popup: any) {
    this.modalService.open(popup, {
      backdropClass: "dark-modal",
      centered: true,
    });
  }

  // Open customizer
  Customizer(val: string) {
    this.customizer = val;
  }

  // Customize Layout Type
  customizeLayoutType(val: string) {
    this.layoutType = val;
    this.layout.config.settings.layout_type = val;
    if (val == "rtl") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "rtl";
    } else if (val == "box-layout") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "box-layout";
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("dir");
      document.body.className = "";
    }
  }

  svgIcon(val: string) {
    this.icon = val;
    this.layout.config.settings.icon = val;
    if (val == "stroke-svg") {
      document
        .getElementsByTagName("sidebar-wrapper")[0]
        ?.setAttribute("icon", val);
    } else {
      document
        .getElementsByTagName("sidebar-wrapper")[0]
        ?.setAttribute("icon", val);
    }
  }

  // Customize Sidebar Type
  customizeSidebarType(val: string) {
    this.sidebarType = val;
    this.layout.config.settings.layout = val;
  }

  // Customize Mix Layout
  customizeMixLayout(val: string) {
    this.MIXLayout = val;
    this.layout.config.settings.layout_version = val;
    document.body?.classList.remove("light-only", "dark-sidebar", "dark-only");
    document.body.classList.add(val);
    if (val === "default") {
      document.body?.classList.add("light-only");
    } else if (val === "dark-sidebar") {
      document.body?.classList.add("dark-sidebar");
    } else {
      document.body?.classList.add("dark-only");
    }
  }

  applyColor() {
    this.layout.setColor(this.primary_color, this.secondary_color);
  }

  resetColor() {
    this.layout.resetColor();
  }
}
