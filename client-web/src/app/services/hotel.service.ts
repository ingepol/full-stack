/**
  Service responsible for making requests to the API and
  return the response to the hotel component
*/
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class HotelService{
    public url: string;

    constructor(
        private _http:Http
    ){
        this.url = GLOBAL.url;
    }

    getHotels(){
        return this._http.get(this.url+'hotel').map(res => res.json());
    }

    getHotel(id){
        return this._http.get(this.url+'hotel/'+id).map(res => res.json());
    }

    byNameAndStars(name,stars){
        return this._http.get(this.url+'hotel/searchHotels/'+name+'/'+stars).map(res => res.json()).catch(this.handleError);
    }

    public handleError(error: Response) {

      if(error.status == 500 && !GLOBAL.debug){
        return Observable.throw('Server error');
      }

      return Observable.throw(error.json() || 'Server error');

    }
}
