import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HelperService } from './helper.service';

export class AppHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const appReq = req.clone({
            url: environment.apiUrl + req.url,
            headers: req.headers.set('Authorization', localStorage.getItem(HelperService.TOKEN_KEY) || '')
        });
        return next.handle(appReq);
    }
}
