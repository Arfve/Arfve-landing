"use client";
import { useState } from "react";
import Image from "next/image";

interface Variant {
  id: string;
  title: string;
  selectedOptions: Array<{ name: string; value: string }>;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  image: {
    url: string;
  };
}

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
      node: Variant;
    }>;
  };
}

interface ItemProps {
  product: ProductNode;
}

export default function Item({ product }: ItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  
  const activeVariant = product.variants.edges[activeVariantIndex].node;
  
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const handleAddToBasket = () => {
    console.log(
      `Adding to basket: ${product.title} - ${activeVariant.selectedOptions[0].value}, Quantity: ${quantity}`
    );
    alert(`Added ${quantity} × ${product.title} (${activeVariant.selectedOptions[0].value}) to basket!`);
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-[89px] p-4">
      <div className="flex flex-col items-center">
        <div className="relative mb-4 w-full">
          <Image
            width={500}
            height={500}
            src={activeVariant.image.url}
            alt={`${product.title} ${activeVariant.selectedOptions[0].value}`}
            className="w-[37.91rem] h-[313px] rounded-xl"
          />
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col items-start gap-6 h-[291px]">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        

        
        <div>
          <p>
            {activeVariant.priceV2.amount} {activeVariant.priceV2.currencyCode}
          </p>
        </div>
        <div className="flex gap-2">
          {product.variants.edges.map((edge, index) => {
            const colorValue = edge.node.selectedOptions.find(
              (option) => option.name === "Color"
            )?.value;
            return (
              <button
                key={edge.node.id}
                onClick={() => setActiveVariantIndex(index)}
                style={{ backgroundColor: colorValue?.toLowerCase() || "transparent" }}
                className={`w-8 h-8 rounded-full border ${
                  index === activeVariantIndex ? "border-blue-500" : "border-gray-300"
                } focus:outline-none`}
              />
            );
          })}
        </div>
        <p>AI enabled - 11mm drivers - ANC</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-2xl overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              &lt;
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
          <div className="h-full w-[2.5px] rounded-lg bg-gray-500"></div>
          <button
            onClick={handleAddToBasket}
            className="bg-[#243555] text-white px-8 py-2 hover:bg-[#344d7c] rounded-3xl"
          >
            Add to basket
          </button>
        </div>
        <a
          href={product.onlineStoreUrl}
          className="inline-block hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pre-order - delivery by July 2025
        </a>
      </div>
    </div>
  );
}
