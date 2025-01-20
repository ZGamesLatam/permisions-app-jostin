import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';
import {
  ApiData,
  ApiMessage,
  ApiResponse,
} from 'src/app/core/interfaces/api/api-response.interface';
import { Permission } from '../../interfaces/api/permission.interface';
import { environment } from 'src/environments/environment';
import { ToastrNotificationService } from '../ui/toastr-notification.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private apiUrl: string = `${environment.apiUrl}/permission`;

  constructor(
    private _httpClient: HttpClient,
    private _notificationService: ToastrNotificationService
  ) {}

  // getPermissions(filter: object = {}): Observable<ApiResponse<ApiData<any[]>>> {
  //   const endpoint = `${this.apiUrl}/get-all-permission`;
  //   const params = new HttpParams({ fromObject: { ...filter } });
  //   return this._httpClient
  //     .get<ApiResponse<ApiData<any[]>>>(endpoint, {
  //       params,
  //     })
  //     .pipe(
  //       tap((response) => {
  //         console.log('Respuesta del backend:', response);
  //       })
  //     );
  // }

  // getFilteredPermissions(filters: object = {}): Observable<any> {
  //   const params = new HttpParams({ fromObject: { ...filters } });
  //   return this._httpClient.get(`${this.apiUrl}/filter-permissions`, {
  //     params,
  //   });
  // }

  getFilteredPermissions(
    filter: object = {}
  ): Observable<ApiResponse<ApiData<any[]>>> {
    const endpoint = `${this.apiUrl}/filter-permissions`;
    const params = new HttpParams({ fromObject: { ...filter } });

    // Asegúrate de incluir el token en los encabezados
    const headers = new HttpHeaders({
      'x-api-key': localStorage.getItem('auth-token') || '',
    });

    return this._httpClient.get<ApiResponse<ApiData<any[]>>>(endpoint, {
      params,
      headers,
    });
  }

  public createPermission(
    permission: object
  ): Observable<ApiResponse<ApiData<Permission>>> {
    const endpoint = `${this.apiUrl}/create-permission-type`;
    return this._httpClient
      .post<ApiResponse<ApiData<Permission>>>(endpoint, permission)
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  public updatePermission(
    id: string,
    permission: object
  ): Observable<ApiResponse<ApiData<Permission>>> {
    const endpoint = `${this.apiUrl}/update/${id}`;
    return this._httpClient
      .patch<ApiResponse<ApiData<Permission>>>(endpoint, permission)
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  public approvePermission(
    id: string,
    userAdminId: string
  ): Observable<ApiResponse<Permission>> {
    const endpoint = `${this.apiUrl}/approve-permission/${id}`;
    const headers = new HttpHeaders({
      'x-api-key': localStorage.getItem('auth-token') || '',
    });
    const body = { userAdminId };
    return this._httpClient
      .patch<ApiResponse<Permission>>(endpoint, body, { headers })
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  public rejectPermission(
    id: string,
    userAdminId: string
  ): Observable<ApiResponse<Permission>> {
    const endpoint = `${this.apiUrl}/reject-permission/${id}`;
    const headers = new HttpHeaders({
      'x-api-key': localStorage.getItem('auth-token') || '',
    });
    const body = { userAdminId };
    return this._httpClient
      .patch<ApiResponse<Permission>>(endpoint, body, { headers })
      .pipe(tap((res) => this.showNotification(res.message)));
  }

  private showNotification(message: ApiMessage): void {
    this._notificationService.showNotification({
      title: 'Permission Management',
      message: message,
      type: 'success',
    });
  }
}
