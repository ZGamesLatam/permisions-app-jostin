import { Component, ViewEncapsulation, HostListener } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Menu } from "src/app/core/interfaces/ui/nav.interface";
import { LayoutService } from "src/app/core/services/ui/layout.service";
import { NavService } from "src/app/core/services/ui/nav.service";

@Component({
  selector: "shared-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  public menuItems: Menu[] = [];

  // For Horizontal Menu
  public margin: any = 0;
  public width: any = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;

  constructor(
    private router: Router,
    public navServices: NavService,
    public layout: LayoutService
  ) {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });

              return;
            });

            return;
          });
        }
      });
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: { target: { innerWidth: number } }) {
    this.width = event.target.innerWidth - 500;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  // Active Nave state
  setNavActive(item: Menu) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item: Menu) {
    if (!item.active) {
      this.menuItems.forEach((a) => {
        if (this.menuItems && this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b) => {
          if (a.children && a.children.includes(item)) {
            b.active = false;
          }
        });

        return;
      });
    }
    item.active = !item.active;
  }

  // For Horizontal Menu
  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3051) {
      this.margin = -3464;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }
}
