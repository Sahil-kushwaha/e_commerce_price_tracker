import { getProductById, getSimilarProducts } from "@/lib/action";
import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";

interface Props{
    params : {id:string}
}
async function ProductDetails({params}:Props){
    const product:Product = await getProductById(params.id)
    if(!product) redirect('/')

    const similarProduct = await getSimilarProducts(params.id)    

    return(

        <div className="product-container" >
             <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                      src = {product.image}
                      alt={product.title}
                      width={580}
                      height={400}
                      className= "mx-auto" 
                     />
                </div>
                <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                         <div className="flex flex-col gap-3">
                               <p className="text-[28] dark:text-slate-300 text-secondary font-semibold" >
                                   {product.title}
                               </p>
                               <Link
                               href = {product.url}
                               target="_blank"
                               className="text-base dark:text-white text-black opacity-50"
                               >
                                Visit Product
                               </Link>
                         </div>

                         <div className="flex items-center gap-3">
                            <div className="product-hearts">
                               <Image
                                 src="/assets/icons/red-heart.svg"
                                 alt="heart-icon"
                                 width={20}
                                 height={20}
                               />
                               <p className="text-base font-semibold text-[#D46F77]">
                                {product.reviewsCount}
                               </p>
                            </div>
                             <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                  src='/assets/icons/bookmark.svg'
                                  alt='bookmark'
                                  width={20}
                                  height={20}
                                 />
                             </div>
                             <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                  src='/assets/icons/share.svg'
                                  alt='bookmark'
                                  width={20}
                                  height={20}
                                 />
                             </div>
                         </div>
                      </div>
                      <div className="product-info">
                         <div className="flex flex-col gap-2">
                             <p className="text-[34px] dark:text-slate-200 text-secondary font-bold">
                                {product.currency}{product.currentPrice}
                             </p>
                             <p className="text-[24px] dark:text-slate-200 text-secondary font-bold line-through">
                                {product.currency}{product.originalPrice}
                             </p>
                         </div>
                         <div className="flex flex-col gap-4">
                             <div className="flex gap-3">
                                <div className="product-stars">
                                    <Image
                                     src="/assets/icons/star.svg"
                                     alt="star"
                                     width={16}
                                     height={16} 
                                    />
                                    <p className="text-sm text-primary-orange font-semibold">
                                         {product.stars || '25'}
                                    </p>
                                </div>
                                <div className="product-reviews">
                                    <Image
                                     src="/assets/icons/comment.svg"
                                     alt="comment"
                                     width={16}
                                     height={16} 
                                    />
                                    <p className="text-sm text-primary-orange font-semibold">
                                         {product.reviewsCount } Reviews
                                    </p>
                                </div>
                             </div>

                             <p className="text-sm opacity-50">
                                <span className="text-primary-green font-semibold">93%</span> of
                                buyers have recommended this
                             </p>
                         </div>
                      </div>

                      <div className="my-7 flex flex-col gap-5">
                         <div className="flex gap-5 flex-wrap">
                             <PriceInfoCard
                              title = "Current Price"
                              iconSrc="/assets/icons/price-tag.svg"
                              value={`${product.currency} ${product.currentPrice}`} 
                             />
                             <PriceInfoCard
                              title = "Average Price"
                              iconSrc="/assets/icons/chart.svg"
                              value={`${product.currency} ${product.averagePrice}`} 
                             />
                             <PriceInfoCard
                              title = "highest Price"
                              iconSrc="/assets/icons/arrow-up.svg"
                              value={`${product.currency} ${product.highestPrice}`} 
                             />
                             <PriceInfoCard
                              title = "Lowest Price"
                              iconSrc="/assets/icons/arrow-down.svg"
                              value={`${product.currency} ${product.lowestPrice}`} 
                             />
                         </div>
                      </div>
                  <Modal productId={params.id}/>
                </div>
             </div>
             <div className="flex flex-col gap-16  ">
                 <div className="flex flex-col gap-4">
                    <h3 className="text-2xl dark:text-slate-200 text-secondary  font-semibold">
                         Product Description
                    </h3>
                    <div className=" max-md:product-short-description">
                         {product?.description?.split('\n')}
                    </div>
                 </div>
                 <button className="btn w-fit mx-auto flex items-center
                 justify-center gap-3 min-w-[200px]">
                     <Image 
                       src="/assets/icons/bag.svg"
                       alt='check'
                       width={22}
                       height={22}
                     />

                     <Link href={product.url} target="_blank" className="text-base" >
                        Buy Now
                     </Link>
                 </button>
             </div>
            
            { similarProduct && similarProduct?.length >0 && (
                 <div className="py-14 flex flex-col gap-2 w-full">
                     <p className="dark:text-neutral-300 section-text">Similar Product</p>
                     <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProduct.map(product=>(
                            < ProductCard key={product._id} product= {product} />
                        ))}
                     </div> 
                 </div>   
            ) }

        </div>
    )
}

export default ProductDetails;