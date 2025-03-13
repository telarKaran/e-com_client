// // import ProductTable from "@/app/components/products/ProductTable";

// // async function getProducts() {
// //   const res = await fetch("http://localhost:3001/products", {
// //     cache: "no-store",
// //   });
// //   return res.json();
// // }

// // export default async function AdminProductsPage() {
// //   const products = await getProducts();

// //   return (
// //     <div className="container mx-auto p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl font-bold">Manage Products</h1>
// //         <a href="/admin/products/new" className="btn-primary">
// //           Add New Product
// //         </a>
// //       </div>
// //       <ProductTable products={products} />
// //     </div>
// //   );
// // }

// // src/app/(admin)/products/page.tsx
// import { Product } from "@/types";
// import ProductsTable from "@/app/components/products/ProductsTable";

// async function getAllProducts(): Promise<Product[]> {
//   const res = await fetch("http://localhost:8001/api/products", {
//     // Important for server components to always fetch fresh data
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return res.json();
// }

// export default async function ProductsPage() {
//   const products = await getAllProducts();

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Products</h2>
//       <a
//         href="/products/new"
//         className="inline-block bg-blue-500 text-white px-4 py-2 mb-4 rounded"
//       >
//         + Add New Product
//       </a>
//       <ProductsTable products={products} />
//     </div>
//   );
// }

import { Product } from "@/types";
import ProductsTable from "@/app/components/products/ProductsTable";

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:8001/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const rawProducts = await res.json();

  // Transform API response
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
      <a
        href="/products/new"
        className="inline-block bg-blue-600 text-white px-4 py-2 mb-4 rounded-md shadow hover:bg-blue-700 transition"
      >
        + Add New Product
      </a>
      <ProductsTable products={products} />
    </div>
  );
}
