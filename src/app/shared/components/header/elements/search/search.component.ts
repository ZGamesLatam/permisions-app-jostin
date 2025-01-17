import { Component, OnInit } from "@angular/core";
import { Menu } from "src/app/core/interfaces/ui/nav.interface";
import { NavService } from "src/app/core/services/ui/nav.service";

@Component({
  selector: "shared-header-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {
  public menuItems: Menu[] = [];
  public items: Menu[] = [];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = "";

  constructor(public navServices: NavService) {
    this.navServices.items.subscribe((menuItems) => (this.items = menuItems));
  }

  ngOnInit() {}

  searchToggle() {
    this.navServices.search = false;
    document.getElementsByTagName("body")[0].classList.remove("offcanvas");
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: any[] = [];
    term = term.toLowerCase();
    this.items.filter((menuItems) => {
      if (!menuItems?.title) return false;
      if (
        menuItems.title.toLowerCase().includes(term) &&
        menuItems.type === "link"
      ) {
        items.push(menuItems);
      }
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems) => {
        if (
          subItems &&
          subItems.title &&
          subItems.title.toLowerCase().includes(term) &&
          subItems.type === "link"
        ) {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) return false;
        subItems.children.filter((suSubItems) => {
          if (
            suSubItems &&
            suSubItems.title &&
            suSubItems.title.toLowerCase().includes(term)
          ) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
      return;
    });
    return;
  }

  checkSearchResultEmpty(items: string | any[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.getElementsByTagName("body")[0].classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.getElementsByTagName("body")[0].classList.remove("offcanvas");
  }
}
