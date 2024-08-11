import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from './app-state.service';
import {Injectable} from "@angular/core";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appStateService: AppStateService,
              private loadingService : LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoadingSpinner();

    // Clone the request and add the authorization header
    const req = request.clone({
      setHeaders: {
        Authorization: 'Bearer JWT'
      }
    });

    // Pass the modified request to the next handler
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
