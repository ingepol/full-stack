import { Component } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel.service'

@Component({
  selector: 'hotel-tag',
  templateUrl: '../views/hotel.view.html',
  providers: [HotelService]
})
export class HotelComponent {

  public hotels:Array<Hotel>;
  public nameHotel:String;
  public activateFilters:String;
  public activateFilterName:String;
  public activateFilterStar:String;

  constructor(
    private _hotelService: HotelService
  ){}

  ngOnInit(){
        this.activateFilters = "hide";
        this.activateFilterName = "show";
        this.activateFilterStar = "show";
        this._hotelService.getHotels().subscribe(
            result => {
                this.hotels = result.hotels;
                if(!this.hotels){
                    console.log('Error en el servidor.');
                }
            },
            error => {
                var errorMgg =<any>error;
                console.error(error);
            }
        );
    }

    onSubmit(){
        console.log(this.nameHotel);
            this._hotelService.getHotelByName(this.nameHotel).subscribe(
                result => {
                    this.hotels = result.hotels;
                },
                error=> {
                    this.hotels = [];
                }
            );
    }

    getStarts = function(start) {
      return new Array(start);
    }

}
