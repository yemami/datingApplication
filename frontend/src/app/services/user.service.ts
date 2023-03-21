import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8000';

  getProfileDetails() {
    return this.http.get(this.url + `/users`);
  }
  updateProfileDetails(data: any, formData: FormData) {
    console.log(data);
    if (formData.has('profilePic')) {
      return this.http.patch(this.url + `/users`, data).pipe(
        switchMap((response: any) => {
          return this.http.post(this.url + `/profile/upload-picture`, formData);
        })
      );
    } else {
      return this.http.patch(this.url + `/users`, data);
    }
  }

  constructor(private http: HttpClient) {}
}
