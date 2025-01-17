import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { ButtonAction } from "src/app/core/interfaces/ui/ui.interface";
import { LayoutService } from "src/app/core/services/ui/layout.service";
import { NavService } from "src/app/core/services/ui/nav.service";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { BUTTON_ACTIONS } from "src/app/core/helpers/ui/ui.constant";

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: "shared-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public elem: any;
  public BUTTON_ACTIONS = BUTTON_ACTIONS;

  constructor(
    public layout: LayoutService,
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any,
  ) {}

  ngOnInit() {
    this.elem = document.documentElement;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu = false;
    this.navServices.levelMenu = false;
  }

  layoutToggle() {
    if ((this.layout.config.settings.layout_version = "dark-only")) {
      document.body.classList.toggle("dark-only");
    }
    document.body.remove;
  }

  searchToggle() {
    this.navServices.search = true;
  }

  languageToggle() {
    this.navServices.language = !this.navServices.language;
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  public openModal(buttonAction: ButtonAction): void {
  }
}
