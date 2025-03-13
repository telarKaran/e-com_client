"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  sku: string;
  name: string;
  price: {
    regular: number;
    sale?: number;
  };
  inventory: {
    stock: number;
  };
  status: "active" | "inactive";
  createdAt: string;
}

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      router.refresh();
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Created
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3 font-mono text-sm text-gray-600">
                {product.sku}
              </td>
              <td className="px-4 py-3">
                $
                {product.price.sale
                  ? product.price.sale
                  : product.price.regular}
              </td>
              <td className="px-4 py-3">{product.inventory.stock}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 space-x-2">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="text-primary hover:text-primary-dark"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
