"use server"

import Product from "@/models/product.model";
import { connectDB } from "../db/config.db";
import { amazonProductScrapper } from "../scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
import { User } from "@/types/type";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(producturl:string){
      
     if(!producturl) return ;
     
     try{
          connectDB()
         const scrappedProduct = await amazonProductScrapper(producturl)
         if(!scrappedProduct) return " " ;
         const existingProduct = await  Product.findOne({url: scrappedProduct.url})
         let product = scrappedProduct;
         if(existingProduct){
             const updatPriceHistory:any = [
                 ...existingProduct.priceHistory,
                 {price:scrappedProduct.currentPrice}
               ]

              product = {
                     ...scrappedProduct,
                      priceHistory : updatPriceHistory,
                      lowestPrice: getLowestPrice(updatPriceHistory),
                      highestPrice: getHighestPrice(updatPriceHistory),
                      averagePrice: getAveragePrice(updatPriceHistory)
           }

         }
        
        const newProduct  = await Product.findOneAndUpdate(
             {url:scrappedProduct.url},
             product,
             {upsert:true  ,new :true}
          
        )

       revalidatePath(`/products/${newProduct._id}`)
      
     } catch(error:any){
          throw new Error("failed to create/update product: "+error.message)
     }

}

export async function getProductById(productId:string) {
      try{
           connectDB();
           
           const product= await Product.findById(productId)
           if(!product) return null;
           
           return product;

      } catch(error:any){
         console.log(error)
      }
}

export async function getAllProducts() {
       try {
            connectDB()
            const allProduct = await Product.find()
            return allProduct

          } catch (error:any) {
            console.log(error.message)
       }
}

export async function getSimilarProducts(productId:string) {
       try {
            connectDB()
            const currentProduct = await Product.findById(productId)
            if(!currentProduct) return null;

           const similarProducts = await Product.find({
               _id:{$ne:productId}
           }).limit(3)

           return similarProducts

          } catch (error:any) {
            console.log(error.message)
       }
}

export async function addUserEmailToProduct(productId: string,userEmail:string){
      try {
            const product = await Product.findById(productId)
         
            if(!product) return;

            const userExists = product.users.some((user:User)=>user.email === userEmail)

            if(!userExists) {
                product.users.push({email:userEmail});
            }

            await product.save();

            const emailContent = generateEmailBody(product,"WELCOME")

            await sendEmail(emailContent, [userEmail])

      } catch (error:any) {
           console.log(error.message)
      }
}