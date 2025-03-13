import { Product } from "@/types";
import Link from "next/link";
async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:8001/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const rawProducts = await res.json();

  // Map API response to correct structure
  return rawProducts.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: {
      regular: product.price.regular,
      sale: product.price.sale ?? product.price.regular,
      discountPercentage: product.price.discountPercentage ?? 0,
    },
    media: product.media.map((m: any) => ({
      type: m.type,
      path: m.path,
    })),
    inventory: {
      stock: product.inventory.stock,
    },
  }));
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className=" mx-50">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border p-4 rounded"
          >
            <img
              src={
                product.media[0]?.path
                  ? `http://localhost:8001/${product.media[0]?.path}`
                  : "/placeholder.png"
              }
              alt={product.name}
              className="mb-2"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p>
              ${product.price.sale}{" "}
              {product.price.sale < product.price.regular && (
                <span className="text-gray-500 line-through">
                  ${product.price.regular}
                </span>
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
