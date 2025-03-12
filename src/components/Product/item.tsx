"use client";
import { useState } from "react";
import Image from "next/image";

interface ProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  onlineStoreUrl: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface ItemProps {
  product: ProductNode;
}

export default function Item({ product }: ItemProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = product.images.edges;
  const currentImage = images[activeImageIndex];

  const [quantity, setQuantity] = useState(1);
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToBasket = () => {
    console.log(`Adding to basket: ${product.title}, Quantity: ${quantity}`);
    alert(`Added ${quantity} × ${product.title} to basket!`);
  };

  return (
    <div className=" mx-auto flex flex-col md:flex-row items-start justify-center gap-[89px] p-4">
      <div className=" flex flex-col items-center">
        <div className="relative mb-4 w-full  ">
          <Image
            width={500}
            height={500}
            src={currentImage.node.url}
            alt={currentImage.node.altText || "Product image"}
            className=" w-[37.91rem] h-[313px] rounded-xl "
            
          />
        </div>
        <div className="flex gap-2">
          {images.map((imgEdge, index) => (
            <Image
              key={index}
              width={64}
              height={64}
              src={imgEdge.node.url}
              alt={imgEdge.node.altText || "Product thumbnail"}
              className={`w-16 h-16 object-cover cursor-pointer border ${
                index === activeImageIndex
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col items-start gap-6 h-[291px] ">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div>
          <p>
            {product.variants.edges[0].node.priceV2.amount}{" "}
            {product.variants.edges[0].node.priceV2.currencyCode}
          </p>
        </div>
        <p>AI enabled - 11mm drivers - ANC </p>

        <div className="flex items-center gap-4 ">
          <div className="flex items-center border rounded-2xl  overflow-hidden">
            <button
              data-tracking-id="decrement-button"
              onClick={handleDecrease}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              &lt;
            </button>
            <span className="px-4">{quantity}</span>
            <button
              data-tracking-id="increment-button"
              onClick={handleIncrease}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
          <div className="h-full w-[2.5px] rounded-lg bg-gray-500"></div>
          <button
            data-tracking-id="add-to-basket-button"
            onClick={handleAddToBasket}
            className=" bg-[#243555] text-white px-8 py-2  hover:bg-[#344d7c] rounded-3xl"
          >
            Add to basket
          </button>
        </div>
        <a
          href={product.onlineStoreUrl}
          className="inline-block  hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pre-order - delivery by july 2025
        </a>
      </div>
    </div>
  );
}
