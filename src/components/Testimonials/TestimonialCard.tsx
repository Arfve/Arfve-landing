import Image from 'next/image';
import { Testimonial } from '@/types/shopify';

export default function TestimonialCard({ quote, author = '', role, imageUrl }: Testimonial) {
  // Only attempt URL transformation if we have a valid Shopify URL
  const shouldShowImage = imageUrl && imageUrl.startsWith('shopify://');
  const publicImageUrl = shouldShowImage 
    ? imageUrl.replace('shopify://shop_images/', '/images/')
    : null;

  return (
    <div className="flex flex-col items-center gap-3 w-[200px] h-[310px]">
      {/* Image Container */}
      <div className="flex justify-center items-center w-[200px] h-[200px] bg-[#DEDEDE] rounded-[20px] p-[10px]">
        {shouldShowImage ? (
          <div className="relative w-[79px] h-[79px]">
            <Image
              src={publicImageUrl!}
              alt={`${author}'s testimonial`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : (
          // Placeholder for missing or invalid images
          <div className="w-[79px] h-[79px] bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-2xl">{author[0]}</span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start gap-3 w-[200px]">
        {/* Quote */}
        <p className="font-inter font-bold text-[20px] leading-[24px] text-white">
          {quote}
        </p>

        {/* Author and Role */}
        <p className="font-inter font-normal text-base leading-[19px] text-white">
          {author}
          <br />
          {role}
        </p>
      </div>
    </div>
  );
}
