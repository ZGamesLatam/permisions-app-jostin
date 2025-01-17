import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterService<T> {
  private filterDataSubject: Subject<T> = new Subject<T>();

  constructor() {}

  public getFilterData(): Observable<T> {
    return this.filterDataSubject.asObservable();
  }

  public updateFilterData(data: T): void {
    this.filterDataSubject.next(data);
  }
}
