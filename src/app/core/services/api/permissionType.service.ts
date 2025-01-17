import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionTypeService {
  private apiUrl: string = `${environment.apiUrl}/permission-type/get-permissions-type`;

  constructor(private http: HttpClient) {}

  getPermissionTypes(): Observable<{ _id: string; name: string }[]> {
    return this.http
      .get<{ data: { _id: string; name: string }[] }>(this.apiUrl)
      .pipe(
        map((response) => {
          console.log('Respuesta del backend:', response);
          return response.data || [];
        })
      );
  }
}
