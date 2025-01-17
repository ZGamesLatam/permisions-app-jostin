import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class RouteHelperService {
  constructor() {}

  public getRouteContext(route: ActivatedRoute): { [key: string]: boolean } {
    const context: { [key: string]: boolean } = {};

    let parentRoute = route.parent;
    while (parentRoute) {
      const urlSegments = parentRoute.snapshot.url.map(
        (segment) => segment.path
      );
      urlSegments.forEach((segment) => {
        context[segment] = true;
      });
      parentRoute = parentRoute.parent;
    }

    return context;
  }

  public getSpecificContext(
    route: ActivatedRoute,
    keys: string[]
  ): { [key: string]: boolean } {
    const context = this.getRouteContext(route);
    const specificContext: { [key: string]: boolean } = {};

    keys.forEach((key) => {
      specificContext[key] = context[key] || false;
    });

    return specificContext;
  }
}
