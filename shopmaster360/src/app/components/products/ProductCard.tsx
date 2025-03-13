"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: {
      regular: number;
      sale?: number;
      discountPercentage?: number;
    };
    media: Array<{
      type: "image" | "video";
      path: string;
    }>;
    inventory: {
      stock: number;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.media.find((m) => m.type === "image")?.path;
  const isDiscounted =
    product.price.sale && product.price.sale < product.price.regular;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`} className="block">
        {mainImage && (
          <div className="relative aspect-square">
            <Image
              src={`/${mainImage}`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            {isDiscounted ? (
              <>
                <span className="text-red-600 font-bold">
                  ${product.price.sale}
                </span>
                <span className="line-through text-gray-500">
                  ${product.price.regular}
                </span>
              </>
            ) : (
              <span className="font-bold">${product.price.regular}</span>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {product.inventory.stock > 0
              ? `${product.inventory.stock} in stock`
              : "Out of stock"}
          </div>
        </div>
      </Link>
    </div>
  );
}
