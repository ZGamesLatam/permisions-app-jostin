import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import {
  ApiData,
  ApiMessage,
  ApiResponse,
} from "src/app/core/interfaces/api/api-response.interface";
import { Betshop } from "src/app/core/interfaces/api/betshop.interface";
import { environment } from "src/environments/environment";
import { NgSelect } from "../../interfaces/ui/ui.interface";
import { ToastrNotificationService } from "../ui/toastr-notification.service";

@Injectable({
  providedIn: "root",
})
export class BetshopService {
  private apiUrl: string = `${environment.apiUrl}/betshop`;

  constructor(
    private _httpClient: HttpClient,
    private _notificationService: ToastrNotificationService
  ) {}

  public findBetshop(
    filter: object
  ): Observable<ApiResponse<ApiData<Betshop[]>>> {
    const endpoint = `${this.apiUrl}/find`;
    const params = new HttpParams({ fromObject: { ...filter } });
    return this._httpClient.get<ApiResponse<ApiData<Betshop[]>>>(endpoint, {
      params,
    });
  }

  public createBetshop(
    betshop: object
  ): Observable<ApiResponse<ApiData<Betshop>>> {
    const endpoint = `${this.apiUrl}/create`;
    return this._httpClient
      .post<ApiResponse<ApiData<Betshop>>>(endpoint, betshop)
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  public updateBetshop(
    id: string,
    betshop: object
  ): Observable<ApiResponse<ApiData<Betshop>>> {
    const endpoint = `${this.apiUrl}/update/${id}`;
    return this._httpClient
      .patch<ApiResponse<ApiData<Betshop>>>(endpoint, betshop)
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  public findBetshopForSelect(
    filter: object
  ): Observable<ApiData<NgSelect<string>[]>> {
    return this.findBetshop(filter).pipe(
      map((response) => ({
        totalCount: response.data.totalCount,
        result: response.data.result.map((betshop) => ({
          label: betshop.name,
          value: betshop._id,
        })),
      }))
    );
  }

  private showNotification(message: ApiMessage): void {
    this._notificationService.showNotification({
      title: "betshopManagement.betshops.title",
      message: message,
      type: "success",
    });
  }
}
