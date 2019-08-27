import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';
import { QueueAttribute } from "../../shared/models/queueAttribute.model";



@Injectable(
    {
        providedIn: 'root'
    }
    )
export class QueueService {

    private readonly PATH: string = 'queue';

    constructor(
        private http: HttpClient) { }

        // Http Headers
        httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        // Error handling
        errorHandl(error) {
            let errorMessage = '';
            if(error.error instanceof ErrorEvent) {
                // Get client-side error
                errorMessage = error.error.message;
            } else {
                // Get server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(errorMessage);
            return throwError(errorMessage);
        }

        getQueueAttribute(): Observable<QueueAttribute> {
                return this.http.get<QueueAttribute>(env.baseApiUrl + this.PATH )
                    .pipe(
                        retry(1),
                        catchError(this.errorHandl)
                    )
        }

        // PUT
        /*UpdateBug(id, data): Observable<Bug> {
            return this.http.put<Bug>(this.baseurl + '/bugtracking/' + id, JSON.stringify(data), this.httpOptions)
                .pipe(
                    retry(1),
                    catchError(this.errorHandl)
                )
        }*/

        // DELETE
       /* DeleteBug(id){
            return this.http.delete<Bug>(this.baseurl + '/bugtracking/' + id, this.httpOptions)
                .pipe(
                    retry(1),
                    catchError(this.errorHandl)
                )
        }*/

    // POST
    /* CreateBug(data): Observable<Bug> {
         return this.http.post<Bug>(this.baseurl + '/bugtracking/', JSON.stringify(data), this.httpOptions)
             .pipe(
                 retry(1),
                 catchError(this.errorHandl)
             )
     }*/

    // GET
    /*GetIssue(id): Observable<Bug> {
        return this.http.get<Bug>(this.baseurl + '/bugtracking/' + id)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }*/

}
