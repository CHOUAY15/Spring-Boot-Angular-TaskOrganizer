import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, switchMap, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<boolean>(false);

  loading$ = this.loading.asObservable();
  error$ = this.error.asObservable();

  constructor() {}

  loadData<T>(dataObservable: Observable<T>, minLoadTime: number = 3000): Observable<T> {
    console.log('StateManagementService: Starting loadData');
    this.loading.next(true);
    this.error.next(false);

    return timer(minLoadTime).pipe(
      tap(() => console.log('StateManagementService: Timer completed')),
      switchMap(() => dataObservable.pipe(
        tap(data => console.log('StateManagementService: Data received', data)),
        catchError(error => {
          console.error('StateManagementService: Error loading data', error);
          this.error.next(true);
          return of(null as T);
        })
      )),
      finalize(() => {
        console.log('StateManagementService: Request finalized');
        this.loading.next(false);
      })
    );
  }

  setLoading(isLoading: boolean) {
    console.log('StateManagementService: Setting loading to', isLoading);
    this.loading.next(isLoading);
  }

  setError(hasError: boolean) {
    console.log('StateManagementService: Setting error to', hasError);
    this.error.next(hasError);
  }
}
