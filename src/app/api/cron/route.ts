import { connectDB } from "@/lib/db/config.db";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { amazonProductScrapper } from "@/lib/scrapper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import Product from "@/models/product.model";
import {  NextResponse } from "next/server";

export async function GET() {
     try {
          connectDB()  
          
          const product = await Product.find()
          if(!product) throw new Error("No Products found")
         
         // 1. scrape latest product details and update DB
         const updateProducts = await Promise.all(
             product.map(async (currentProduct)=>{
                  const scrappedProduct = await amazonProductScrapper(currentProduct.url)

                  if(!scrappedProduct) throw new Error( "No product found")
                  
                    const updatPriceHistory:any = [
                        ...currentProduct.priceHistory,
                        {price:scrappedProduct.currentPrice}
                      ]
       
                    const product = {
                            ...scrappedProduct,
                             priceHistory : updatPriceHistory,
                             lowestPrice: getLowestPrice(updatPriceHistory),
                             highestPrice: getHighestPrice(updatPriceHistory),
                             averagePrice: getAveragePrice(updatPriceHistory)
                    }
                   
                    const updatedProduct  = await Product.findOneAndUpdate(
                        {url:product.url},
                        product,
                        {new :true}
                   )
 
         // 2. check each product's status and send email accordingly
                   const emailNotifType = getEmailNotifType(scrappedProduct,
                        currentProduct
                    )

                    if(emailNotifType && updatedProduct.users.length>0){

                         const productInfo = {
                            title: updatedProduct.title,
                            url: updatedProduct.url
                         }

                       const emailContent = generateEmailBody(productInfo , emailNotifType)  
                       const userEmails = updatedProduct.users.map((user:any)=>user.email)
                       await sendEmail(emailContent ,userEmails)
                    }
                   
                    return updatedProduct

                })
            )
          
        return NextResponse.json({
            message: "ok", data: updateProducts
        })

     } catch (error:any) {
         console.error(error.message)
     }
}