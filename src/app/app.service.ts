import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { ChartsModel } from './charts/charts.model';


@Injectable()
export class AppService {
    private responseModel: ChartsModel;
    constructor(private http: Http) {

    }
    getGraphData(input): Observable<ChartsModel[]> {
        const vm = this;
        return this.http.post('http://localhost:3000/dashboard/user', input)
            .map((res: Response) => {
                return vm.extractData(res);
            })
            .catch((error: Response) => {
                return vm.handleError(error);
            });
    }

    private extractResponse(res: Response) {
        const body = res.json();
        if (body.error) {
            return body;
        } else {
            return body || body.json();
        }
    }

    private extractData(res: Response) {
        const body = res.json();
        if (body.error) {
            throw (res);
        } else {
            return body.data;
        }
    }
    private handleError(error: Response | any) {
        const errorMsg = error.json();
        return Observable.throw(error);
    }

}
