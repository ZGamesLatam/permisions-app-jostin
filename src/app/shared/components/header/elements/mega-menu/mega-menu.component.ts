import { Component, OnInit } from "@angular/core";
import { Menu } from "src/app/core/interfaces/ui/nav.interface";
import { NavService } from "src/app/core/services/ui/nav.service";

@Component({
  selector: "shared-header-mega-menu",
  templateUrl: "./mega-menu.component.html",
  styleUrls: ["./mega-menu.component.scss"],
})
export class MegaMenuComponent implements OnInit {
  public megaItems: Menu[] = [];
  public levelmenuitems: Menu[] = [];

  constructor(public navServices: NavService) {}

  ngOnInit() {}

  megaMenuToggle() {
    this.navServices.levelMenu = false;
    this.navServices.megaMenu = !this.navServices.megaMenu;
    if (window.innerWidth < 991) {
      this.navServices.collapseSidebar = true;
    }
  }

  levelMenuToggle() {
    this.navServices.megaMenu = false;
    this.navServices.levelMenu = !this.navServices.levelMenu;
    if (window.innerWidth < 991) {
      this.navServices.collapseSidebar = true;
    }
  }

  // Click Toggle menu
  toggletNavActive(item: Menu) {
    if (!item.active) {
      for (let i = 0; i < this.megaItems.length; i++) {
        const a = this.megaItems[i];
        if (this.megaItems.includes(item)) {
          a.active = false;
        }
        if (a.children) {
          for (let j = 0; j < a.children.length; j++) {
            const b = a.children[j];
            if (a.children.includes(item)) {
              b.active = false;
            }
          }
        }
      }
    }
    item.active = !item.active;
  }
}
