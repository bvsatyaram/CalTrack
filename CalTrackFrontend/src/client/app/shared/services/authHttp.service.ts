import {CurrentUserService} from './current-user.service';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions, Request, RequestOptionsArgs, Response, RequestMethod} from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthHttpService {

  // private etags: Cache = new Cache({ max_size: 50 });

  constructor(private http: Http, private router: Router, private currentUserService: CurrentUserService) {}

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let req: Request;
    if (typeof url === 'string') {
      let reqOpt = new RequestOptions(options);
      reqOpt.url = url;
      req = new Request(reqOpt);
    }else {
      req = url;
    }

    // let loginUrls :string[] = [`${CONFIG.dev.apiUrl}/auth/sign_in`, `${CONFIG.dev.apiUrl}/auth`];
    //
    // if(loginUrls.indexOf(req.url) < 0) {
    // };

      this._beforeCall(req);
    return this.http.request(req)
      .do((res:Response) => {
        this._afterCall(req, res);
      }, (err: Response) => {
        if(err.status === 401) {
          this.currentUserService.redirectUrl = req.url;
          this.router.navigate(['/login']);
        }
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Get, url, options);
    return this.request(url, opts);
  }
  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Post, url, options, body);
    return this.request(url, opts);
  }
  put(url: string,  body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Put, url, options, body);
    return this.request(url, opts);
  }
  patch(url: string,  body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Patch, url, options, body);
    return this.request(url, opts);
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Delete, url, options);
    return this.request(url, opts);
  }

  private appendAuthorizationHeaders(req: Request) : void {

    let authHeaders = JSON.parse(localStorage.getItem('authStoredHeaders'));

    for(let key in authHeaders) {
      req.headers.append(key, authHeaders[key]);
    }
  }

  private _beforeCall(req: Request): void {
    this.appendAuthorizationHeaders(req);
  }

  private _afterCall(req: Request, res: Response) {

    if(res.status === 401) {
      this.router.navigate(['/login']);
      return;
    }

    // let etag: string = res.headers.get('x-etag');

    let authHeaders = res.headers;

    let authStoredHeaders:any = {};

    if (authHeaders.get('access-token')) {

      authStoredHeaders['access-token'] = authHeaders.get('access-token');
      authStoredHeaders['client'] = authHeaders.get('client');
      authStoredHeaders['expiry'] = authHeaders.get('expiry');
      authStoredHeaders['token-type'] = authHeaders.get('token-type');
      authStoredHeaders['uid'] = authHeaders.get('uid');

      localStorage.setItem('authStoredHeaders', JSON.stringify(authStoredHeaders));
    }
  }

  private _build(method: RequestMethod, url: string, options: RequestOptionsArgs, body?: string): RequestOptionsArgs {
    let aBody = body ? body : options && options.body ? options.body : undefined;
    let opts: RequestOptionsArgs = {
      method: method,
      url: url,
      headers: options && options.headers ? options.headers : new Headers(),
      search: options && options.search ? options.search : undefined,
      body: aBody
    };
    return opts;
  }
}
