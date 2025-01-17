import { Component, Input, TemplateRef, Type } from "@angular/core";
import { NgbAccordionDirective } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "shared-accordions-toogle-panel",
  templateUrl: "./toogle-panel.component.html",
})
export class TooglePanelComponent {
  @Input()
  public isCollapsed: boolean = true;

  @Input()
  public title: string = "words.filter";

  @Input()
  public headerTemplate: TemplateRef<HTMLElement> | null = null;

  @Input()
  public contentTemplate: TemplateRef<HTMLElement> | null = null;

  @Input()
  public contentComponent: Type<any | null> | null = null;

  public collapseAccordion(accordion: NgbAccordionDirective): void {
    accordion.toggle("first");
    this.isCollapsed = !this.isCollapsed;
  }
}
