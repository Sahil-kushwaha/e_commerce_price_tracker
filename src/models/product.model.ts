import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    url: {
      type:String,
      required: true,
      unique : true
    },
    currency:{
        type : String,
        required : true
    },
    image: {
         type : String,
         required : true
    },
    title: {
         type: String,
         required: true
    },
    currentPrice:{
         type: Number,
         required: true
    } ,
    originalPrice: {
         type: Number,
         required: true
    },
    priceHistory: [
    {
        prices: {type: Number , required: true},
        date : {type: Date , default: Date.now}
     },

    ],
    highestPrice: {type: Number},
    lowestPrice: {type: Number},
    averagePrice: {type: Number},
    discountRate: {type: Number},
    description: {type: String },
    category: {type: String },
    reviewsCount:{type: Number},
    isOutOfStock: {type: Boolean , default : false},
    users:[
        {
            email:{type:String , requrired: true}
        }
    
    ] 
},{timestamps: true});

const Product = mongoose.models.products || mongoose.model('products',productSchema)

export default Product;