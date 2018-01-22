/**
  Component that controls the actions and the information displayed
  in the hotels view.
*/
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
  public nameHotel:string;
  public activateFilters:boolean;
  public activateFilterName:boolean;
  public activateFilterStar:boolean;
  public starsCheck:any;
  public selectedAllStar: any;
  public starSelecteds: any;
  constructor(
    private _hotelService: HotelService
  ){}

  ngOnInit(){
        this.activateFilters = true;
        this.activateFilterName = true;
        this.activateFilterStar = true;
        this.starsCheck = [
            { quantity: 5, selected: false },
            { quantity: 4, selected: false },
            { quantity: 3, selected: false },
            { quantity: 2, selected: false },
            { quantity: 1, selected: false }
        ];

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


            this.byNameAndStars();

    }

  filters = function(){
    this.activateFilters = !this.activateFilters;
  }

  filterName = function(){
    this.activateFilterName = !this.activateFilterName;
  }

  filterStars = function(){
    this.activateFilterStar = !this.activateFilterStar;
  }

  getStars = function(star) {
    return new Array(star);
  }

  selecteAllStar = function() {
    this.starsCheck.forEach(function(elem){
      elem.selected = this.selectedAllStar;
    });
  }
  checkIfSelected = function() {

    this.selectedAllStar = this.starsCheck.every(function(item:any) {
        return item.selected == true;
    });

    this.byNameAndStars();
  }

  private starsSelectedToString(){

    let arrayStars:Array<string>=Array();

    this.starSelecteds =   this.starsCheck.filter(function(item:any) {
        return item.selected == true;
    });

    this.starSelecteds.forEach(function(elem){
        arrayStars.push(elem.quantity);
    });

    if(arrayStars.length === 0){
        return "1,2,3,4,5";
    }

    return arrayStars.join();
  }

  private byNameAndStars(){

    let searchName:string = "*";
    let arrayStars:string;

    if(this.nameHotel !== undefined && this.nameHotel !== ""){
      searchName = this.nameHotel;
    }

    arrayStars = this.starsSelectedToString();

    this._hotelService.byNameAndStars(searchName,arrayStars).subscribe(
        result => {
            this.hotels = result.hotels;
        },
        error=> {
            this.hotels = [];
        }
    );
  }


}
