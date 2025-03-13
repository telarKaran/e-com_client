// app/[productId]/page.tsx
import Image from "next/image";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

interface Product {
  name: string;
  sku: string;
  brand: string;
  category: string;
  attributes: Record<string, any>;
  media: { type: string; path: string }[];
  status: string;
  price: {
    regular: number;
    sale?: number;
    discountPercentage?: number;
  };
  inventory: {
    stock: number;
    warehouses: Array<{ location: string; quantity: number }>;
  };
  seller: {
    name: string;
    address: string;
    email: string;
    contact: string;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
  description?: string;
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // 1. Fetch the product data from your backend API
  const productRes = await fetch(
    `http://localhost:8001/api/products/${params.productId}`
  );

  if (!productRes.ok) {
    // Handle not found or error
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-red-500">
          Product Not Found
        </h1>
        <p>
          There was an error fetching product <code>{params.productId}</code>.
        </p>
      </div>
    );
  }

  const productData = await productRes.json();
  const product = productData as Product;

  // 2. Destructure fields for easier usage
  const {
    name,
    sku,
    brand,
    status,
    price,
    attributes,
    inventory,
    seller,
    media,
    description,
  } = product;

  const mainImage = media?.find((m) => m.type === "image")?.path;

  // 3. Render page
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb name={name} />

      {/* Main content container with box styling */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* -- Left Column: Product Image -- */}
          <div className="flex flex-col items-center justify-center">
            <div className="border rounded-lg overflow-hidden">
              {mainImage ? (
                <Image
                  src={`http://localhost:8001/${mainImage}`}
                  alt={name}
                  width={500}
                  height={500}
                  className="object-cover"
                />
              ) : (
                <div className="p-8 text-gray-400">No image available</div>
              )}
            </div>
          </div>

          {/* -- Right Column: Product Details -- */}
          <div className="space-y-4">
            {/* Product Title & Brand */}
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              {price.sale && (
                <span className="inline-block bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  SALE
                </span>
              )}
            </div>
            {brand && (
              <div className="text-sm text-gray-500">
                Brand: <span className="font-medium">{brand}</span>
              </div>
            )}
            <div className="text-sm text-gray-500">
              SKU: <span className="font-medium">{sku}</span>
            </div>

            {/* Price Section */}
            <div className="mt-4">
              {price.sale ? (
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-red-600">
                    ${price.sale.toFixed(2)}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${price.regular.toFixed(2)}
                  </span>
                  {price.discountPercentage && (
                    <span className="text-sm text-green-600">
                      {price.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-2xl font-bold">
                  ${price.regular.toFixed(2)}
                </div>
              )}
            </div>

            {/* Stock / Inventory */}
            <div className="text-sm">
              <span className="font-medium">In Stock:</span>{" "}
              {inventory?.stock ?? 0}
            </div>

            {/* Attributes (color, size, etc.) */}
            {attributes && Object.keys(attributes).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Attributes
                </h3>
                <table className="w-full text-sm text-left text-gray-600 mt-2">
                  <tbody>
                    {Object.entries(attributes).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-1 pr-4 font-medium capitalize">
                          {key}
                        </td>
                        <td className="py-1">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Seller info */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Seller Information
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li>
                  <span className="font-medium">Name:</span> {seller?.name}
                </li>
                <li>
                  <span className="font-medium">Address:</span>{" "}
                  {seller?.address}
                </li>
                <li>
                  <span className="font-medium">Email:</span> {seller?.email}
                </li>
                <li>
                  <span className="font-medium">Contact:</span>{" "}
                  {seller?.contact}
                </li>
              </ul>
            </div>

            {/* Status */}
            <div className="text-sm">
              <span className="font-medium">Status:</span> {status}
            </div>

            {/* Buy / Add-to-Cart Buttons */}
            <div className="mt-6 flex space-x-3">
              <button className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors duration-200">
                Add to Cart
              </button>
              <button className="px-5 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition-colors duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {description && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Product Description
            </h3>
            <p className="text-gray-700 leading-relaxed mt-2">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
