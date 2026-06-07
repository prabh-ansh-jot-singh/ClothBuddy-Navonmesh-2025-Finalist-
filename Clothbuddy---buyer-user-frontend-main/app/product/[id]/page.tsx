'use client';
import { ThumbsDown } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Text } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ShoppingBagIcon } from 'lucide-react';
import { productList } from '@/constants/productData';
import { toast } from 'sonner';
import { useCartStore } from '@/data/cartData';
import { Star } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useEffect, useState, use } from 'react';
import { Lens } from "@/components/ui/lens";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  src: string;
  rating?: number;
  images?: string[];
}

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // ✅ Unwrapping the params Promise
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCartStore();

  const sideImages = [
    { src: '/products/temp/1.jpg' },
    { src: '/products/temp/2.jpg' },
    { src: '/products/temp/3.jpg' },
    { src: '/products/temp/4.jpg' }
  ]
  const availableSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const [selectedSize, setSelectedSize]: any = useState(null);
  const [sizeChart, setSizeChart]: any = useState([
    { size: 'S', chest: 40, shoulder: 17, length: 29.7 },
    { size: 'M', chest: 42, shoulder: 18, length: 30 },
    { size: 'L', chest: 44, shoulder: 19, length: 30.2 },
    { size: 'XL', chest: 46, shoulder: 20, length: 30.5 },
    { size: '2XL', chest: 48, shoulder: 21, length: 30.7 }
  ])
  const [selectedImage, setSelectedImage]: any = useState(null);

  const [productReviews, setProductReview]: any = useState([
    { name: 'akhil n.', ratings: 4, title: 'Nice Fit', comment: 'No colour fade while washing, good fit, nice quality cloth. Good with both shorts and pants.', posted: '12 February 2025' },
    { name: 'Rustom', ratings: 4, title: 'Good for daily use', comment: 'It was good colour shown as in picture.. very comfortable and wash ability', posted: '23 January 2025' },
    { name: 'Mark', ratings: 3, title: ' Cloth Quality is not Good', comment: 'It is shown very well in the photo, actually it is not the same shirt, it is of very poor quality, all the color also came off within 2 days, money wasted.', posted: '30 January 2025' },
    { name: 'Mohd Ajmal Khan', ratings: 5, title: ' Very good fabric', comment: 'Very good fabric, very good white color, what i order that i received, I received the delivery on next day after i placed the order. Recommend to buy it. Affordable and reasonable price.', posted: '1 February 2025' },
    { name: 'Manik Malhotra', ratings: 4, title: 'nice shirt', comment: 'quality good as per price', posted: '22 February 2025' }
  ])

  const [productSpecs, setProductSpecs] = useState([
    { title: 'Sleeve Length', value: 'Short Sleeves' },
    { title: 'Neck', value: 'Round Neck' },
    { title: 'Pattern', value: 'Solid' },
    { title: 'Length', value: 'Regular' },
    { title: 'Type', value: 'Pullover' },
    { title: 'Print or Pattern Type', value: 'Solid' },
    { title: 'Occasion', value: 'Casual' },
    { title: 'Hemline', value: 'Straight' }
  ]);

  function Rating({ value, size = 16, max = 5 }: { value: number, max: number, size: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const isFull = i < Math.floor(value);
          const isHalf = i === Math.floor(value) && value % 1 !== 0;

          return (
            <div key={i} className="relative w-4 h-6 mt-[6px]">
              {/* Empty Star */}
              <Star strokeWidth={1.5} size={size} className="text-gray-300 absolute" />

              {/* Full Star */}
              {isFull && <Star strokeWidth={1.5} size={size} className="text-yellow-400 fill-yellow-400 absolute" />}

              {/* Half Star (CSS Mask Trick) */}
              {isHalf && (
                <Star
                  strokeWidth={1.5} size={size}
                  className="text-yellow-400 fill-yellow-400 absolute"
                  style={{ clipPath: "inset(0 50% 0 0)" }} // Masking right half
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }


  const [reviewFilters, setReviewFilters]: any = useState({
    sortFilter: 'most_recent',
    ratingsFilter: 'any'
  });

  const handleFilterChange = (filterName: string, value: string) => {
    switch (filterName) {
      case "sortFilter":
        setReviewFilters((prev: any) => ({ ...prev, sortFilter: value }))
        break;
      case "ratingsFilter":
        setReviewFilters((prev: any) => ({ ...prev, ratingsFilter: value }))
        break;
    }
  }

  useEffect(() => {
    setSelectedImage(sideImages[0].src);
    setSelectedSize(availableSize[0]);
  }, [])

  useEffect(() => {
    const foundProduct = productList.find((p) => p.id.toString() === resolvedParams.id);
    if (!foundProduct) {
      notFound(); // Proper 404 handling
      return;
    }
    setProduct(foundProduct);
  }, [resolvedParams.id]);
  const [hovering, setHovering] = useState(false);
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        src: product.src,
      });
      toast.success(`Added ${product.name} to cart`);
    }
  };


  if (!product) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="text-black py-4 px-4 mt-32 font-assistant md:px-2 md:mt-20">
      <div className='flex flex-col items-start gap-4 md:flex-row'>
        <div className='w-[10%] hidden flex-col gap-2 md:flex'>
          {sideImages.map((item, index) => (
            <img
              onClick={() => setSelectedImage(sideImages[index].src)}
              key={index}
              className="w-24 border object-cover object-top cursor-pointer hover:border-black transition-colors"
              src={item.src}
            />
          ))}

        </div>
        <div className='flex-1 w-full'>
          <ScrollArea className="w-full whitespace-nowrap rounded-md md:hidden">
            <div className="flex mx-auto w-max space-x-4 p-4">
              {sideImages.map((item, index) => (
                <figure key={index} className="shrink-0">
                  <div className="overflow-hidden rounded-md">

                    <img
                      onClick={() => setSelectedImage(sideImages[index].src)}
                      key={index}
                      className="w-56 border object-cover object-top cursor-pointer sm:w-80"
                      src={item.src}
                    />
                  </div>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="z-0 hidden md:block">
            <Lens hovering={hovering} setHovering={setHovering}>
              <img src={selectedImage} />
            </Lens>
          </div>
        </div>
        <div className='flex-1 flex flex-col w-full'>
          {/* PRODUCT TITLE, PRICE AND DISCOUNT SECTION */}
          <div>
            <div className='flex justify-between items-center'>
              <h3 className="text-2xl tracking-wide font-bold text-[#282c3f]">SOLIDS: BLACK</h3>
              <button className='text-[#282c3f] hover:text-green-500'>
                <Share2 className='w-5 h-5' />
              </button>
            </div>
            <span className='text-gray-600 tracking-wider font-semibold'>Seller: G-7 Mens Wear</span>
            <div className="flex items-center gap-0.5">
              <p className='text-[15px] text-black font-semibold mr-1'>2.5</p>
              <Rating value={2.5} max={5} size={16} />
              <p style={{ borderLeft: '1px solid lightgray' }} className='ml-1 px-2 text-[gray] tracking-wider text-[15px]'>987 Ratings</p>
            </div>
            <div className='flex items-center gap-2 text-lg tracking-wide mt-2'>
              <p className='flex items-center font-bold text-[#282c3f]'>
                <IndianRupee strokeWidth={3} className='w-4 h-4 font-bold' />1469
              </p>
              <p className='text-gray-500 font-bold flex'>
                MRP<span className='flex items-center line-through'><IndianRupee strokeWidth={3} className='w-4 h-4' />2999</span>
              </p>
              <p className='text-red-500 font-bold'>
                (47% OFF)
              </p>
            </div>
            <p className="text-[13px] tracking-wide text-[#03a685] font-bold">(Inclusive of all taxes)</p>
          </div>
          <hr className='my-2' />
          {/* PRODUCT SIZES SECTIONS */}
          <div>
            <div className="flex items-center justify-between">
              <p className='font-semibold tracking-wide text-lg'>Select Sizes</p>
              <Dialog>

                <DialogTrigger asChild>
                  <button type="button" className="flex items-center font-semibold text-[#083554] underline">
                    Size Chart
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-black">ClothBuddy - Size Chart</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-1">
                    <p className="text-black font-semibold text-sm">IN REGULAR</p>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Brand Size</TableHead>
                          <TableHead>Chest (in)</TableHead>
                          <TableHead>Soulder (in)</TableHead>
                          <TableHead className="text-right">Length (in)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sizeChart.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-bold text-center text-black">{item.size}</TableCell>
                            <TableCell className="font-semibold text-center text-black">{item.chest}</TableCell>
                            <TableCell className="font-semibold text-center text-black">{item.shoulder}</TableCell>
                            <TableCell className="font-semibold text-center text-black">{item.length}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex items-stretch flex-wrap gap-3 mt-1'>
              {
                availableSize.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(item)}
                    style={{ border: '1px solid #282c3f', transition: '.1s background ease-in-out' }}
                    className={`${selectedSize === item ? 'bg-[#282c3f] text-white' : 'text-gray-800'} tracking-wider text-sm w-[30px] h-[30px] rounded-sm hover:bg-[#282c3f] hover:text-white sm:w-[40px] sm:h-[40px] sm:text-base`} type="button"
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>

          {/* ADD TO BAG BUTTON */}
          <div className='flex items-stretch gap-2 mt-3 flex-col sm:flex-row'>
            <button
              onClick={handleAddToCart}
              style={{ transition: '.1s background ease-in-out' }}
              className='bg-[#4a6e8d] tracking-wide text-white flex justify-center gap-2 items-center p-2 px-6 font-semibold rounded-sm text-sm hover:bg-[#4d7ba3]'
            >
              <ShoppingBagIcon strokeWidth={2.5} className='w-4 h-4' />Add To Bag
            </button>
            <button
              style={{ transition: '.1s background ease-in-out', border: '1px solid #d4d5d9' }}
              className='tracking-wide text-black flex gap-2 justify-center items-center p-2 px-4 font-semibold rounded-sm hover:bg-red-400 hover:text-white'
            >
              <Heart strokeWidth={1.5} className='w-4 h-4' />Add To Wishlist
            </button>
          </div>

          {/* PRODUCTS SPECIFICATION */}
          <div className='flex flex-col tracking-wide mt-3'>
            <p className='font-semibold text-lg flex items-center'>
              <Text strokeWidth={2.5} className='w-5 h-5' />&nbsp;Product Details
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque quaerat neque ad asperiores repudiandae fugit deleniti exercitationem dignissimos nihil fugiat!
            </p>

            {/* SPECIFICATIONS */}
            <div className='mt-2'>
              <p className='font-semibold'>SPECIFICATIONS</p>

              <div className='grid gap-2 mt-1 sm:gap-4 sm:grid-cols-2'>
                {
                  productSpecs.map((item, index) => (
                    <div style={{ borderBottom: '1px solid lightgray' }} key={index} className='flex flex-col'>
                      <p className='text-[13px]'>{item.title}</p>
                      <p className='pb-2'>{item.value}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* REVIEWS DIV */}
      <div className="text-black flex items-start gap-4 mt-4">
        <div className="w-[10%] hidden md:block"></div>
        <div className="flex-1">
          <p className="font-semibold text-lg tracking-wide">REVIEWS</p>
          <div className='flex flex-col gap-1'>
            <p className="font-semibold tracking-wide">Filter By</p>
            <div className='flex gap-2 items-stretch'>
              <Select value={reviewFilters.sortFilter} onValueChange={(value) => handleFilterChange('sortFilter', value)}>
                <SelectTrigger className="w-[150px] rounded-sm focus:outline-none!important">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="most_recent">Most Recent</SelectItem>
                    <SelectItem value="top_reviews">Top Reviews</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={reviewFilters.ratingsFilter} onValueChange={(value) => handleFilterChange('ratingsFilter', value)}>
                <SelectTrigger className="w-[150px] rounded-sm focus:outline-none!important">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="any">All Stars</SelectItem>
                    <SelectItem value="5">5 Star Only</SelectItem>
                    <SelectItem value="4">4 Star Only</SelectItem>
                    <SelectItem value="3">3 Star Only</SelectItem>
                    <SelectItem value="2">2 Star Only</SelectItem>
                    <SelectItem value="1">1 Star Only</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className='mt-2'>Total 987 Reviews</p>
          <hr />
          <div className="flex flex-col gap-3 mt-2">
            {productReviews.map((review: any, index: number) => (
              <div className="flex flex-col" key={index}>
                <div className="flex items-center gap-1">
                  <img className="w-9 h-9" src="/profile_placeholder.jpg" />
                  <p>{review.name}</p>
                </div>
                <div className="flex items-center">
                  <div className="mt-1">
                    <Rating size={12} value={review.ratings} max={5} />
                  </div>
                  <p className="font-bold text-sm">{review.title}</p>
                </div>
                <p className="text-gray-700 text-sm tracking-wide">Reviewed on {review.posted}</p>
                <p className="tracking-wide">{review.comment}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button title='AGREE' className="text-black hover:text-[#03a685]" type="button">
                    <ThumbsUp strokeWidth={1.5} size={15} />
                  </button>
                  <button title='DISAGREE' className="text-black mt-[1px] hover:text-red-600" type="button">
                    <ThumbsDown strokeWidth={1.5} size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
