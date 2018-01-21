export class Hotel {
    constructor(
      public id:String,
      public name:String,
      public stars,
      public price:Number,
      public image:String,
      public amenities:Array<String>
    ){}
}
