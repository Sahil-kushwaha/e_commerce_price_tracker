
import axios from "axios";
import * as  cheerio from 'cheerio'
import { extractPrice ,extractCurrency, extractDescription } from "../utils";
export async function amazonProductScrapper(url:string) {
     if(!url) return ;

     const username   = String(process.env.BRIGHT_DATA_USERNAME)

     const password   = String(process.env.BRIGHT_DATA_PASSWORD)

     const port = 22225;
     const session_id = (1000000*Math.random())|0;
     const proxyOptions = {
          auth:{
               username:`${username}-session-${session_id}`,
               password,
          },
          host: 'brd.superproxy.io',
          port,
          rejectUnauthorized: false
     }

    try {
       // fetch the product
       const respone = await axios.get(url,proxyOptions)
       // cheerio parsed response data
   
       const $ = cheerio.load(respone.data);
    
       // extract the product title

       const title = $('#productTitle').text().trim()
       const currentPrice= extractPrice(
          $('span.priceToPay'),
          $('a.size.base.a-color-price'),
          $('.a-button-selected .a-color-base')
       )
      

       const originalPrice = extractPrice(
          $('#priceblock_ourprice'),
          $('.a-price.a-text-price span.a-offscreen'),
          $('#listPrice'),
          $('#priceblock_dealprice'),
         $('.a-size-base.a-color-price')
      );

      const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

      const image = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'
 
      const imageUrls = Object.keys(JSON.parse(image))
   
      const currency =  extractCurrency( $(".a-price-symbol "))
     
      const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"")

      const description = extractDescription($)

      
      const data = {
         url,
         currency: currency || '$',
         image: imageUrls[0],
         title,
         currentPrice: Number(currentPrice) || Number(originalPrice),
         originalPrice: Number(originalPrice) || Number(currentPrice),
         priceHistory: [],
         discountRate: Number(discountRate) || 0,
         category: 'category',
         reviewsCount:100,
         stars: 4.5,
         isOutOfStock: outOfStock,
         description,
         lowestPrice: Number(currentPrice) || Number(originalPrice),
         highestPrice: Number(originalPrice) || Number(currentPrice),
         averagePrice: Number(currentPrice) || Number(originalPrice),
       }
    
      return data;

    } catch (error:any) {
       throw new Error(`Failed to scrape product:${error.message}`)
    }  
}

