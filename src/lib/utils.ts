import { PriceHistoryItem } from "@/types/type"

// extract price element from all possible element have
export function extractPrice(...elements:any){
  
     for(const element of elements){
         const priceText = element.text().trim()

         if(priceText){
            const digitPrice =  priceText.replace(/[^0-9.]/g, '')
            return digitPrice
         } 
     }
    
  return ""
}

// extract and return currency symbol
export function extractCurrency(elements:any){
     const currency = elements.text().trim().slice(0,1);
     return  currency? currency : ""
       
} 

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
   // these are possible elements holding description of the product
   const selectors = [
     ".a-unordered-list .a-list-item",
     ".a-expander-content p",
     // Add more selectors here if needed
   ];
 
   for (const selector of selectors) {
     const elements = $(selector);
     console.log(elements)
     if (elements.length > 0) {
       const textContent = elements
       .map((_: any, element: any) => $(element).text().trim())
       .get()
       .join("\n");

       return textContent;
     }
   }
 
   // If no matching elements were found, return an empty string
   return "";
 }
 
 export function getHighestPrice(priceList: PriceHistoryItem[]) {
   let highestPrice = priceList[0];
 
   for (let i = 0; i < priceList.length; i++) { 
     if (priceList[i].price > highestPrice.price) {
       highestPrice = priceList[i];
     }
   }
 
   return highestPrice.price;
 }
 
 export function getLowestPrice(priceList: PriceHistoryItem[]) {
   let lowestPrice = priceList[0];
 
   for (let i = 0; i < priceList.length; i++) {
     if (priceList[i].price < lowestPrice.price) {
       lowestPrice = priceList[i];
     }
   }
 
   return lowestPrice.price;
 }
 
 export function getAveragePrice(priceList: PriceHistoryItem[]) {
   const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
   const averagePrice = sumOfPrices / priceList.length || 0;
 
   return averagePrice;
 }

