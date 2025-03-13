// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Product } from "@/types";

// interface Props {
//   products: Product[];
// }

// export default function ProductsTable({ products }: Props) {
//   const [items, setItems] = useState<Product[]>(products);
//   const router = useRouter();

//   async function handleDelete(id: string) {
//     try {
//       const res = await fetch(`http://localhost:8001/api/product/${id}`, {
//         method: "DELETE",
//         // Include credentials or headers if needed
//       });
//       if (!res.ok) {
//         throw new Error("Failed to delete");
//       }
//       // Optimistically update state
//       setItems(items.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product");
//     }
//   }

//   return (
//     <table className="w-full border">
//       <thead>
//         <tr>
//           <th className="border px-2 py-1">Name</th>
//           <th className="border px-2 py-1">Price</th>
//           <th className="border px-2 py-1">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((prod) => (
//           <tr key={prod._id}>
//             <td className="border px-2 py-1">{prod.name}</td>
//             <td className="border px-2 py-1">{prod.price}</td>
//             <td className="border px-2 py-1">
//               <a
//                 href={`/(admin)/products/${prod._id}/edit`}
//                 className="text-blue-500 underline mr-2"
//               >
//                 Edit
//               </a>
//               <button
//                 onClick={() => handleDelete(prod._id)}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
  const [items, setItems] = useState<Product[]>(products);
  const router = useRouter();

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`http://localhost:8001/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left text-gray-700">Name</th>
            <th className="border px-4 py-2 text-left text-gray-700">Price</th>
            <th className="border px-4 py-2 text-left text-gray-700">Stock</th>
            <th className="border px-4 py-2 text-center text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-100 transition">
                <td className="border px-4 py-2">{prod.name}</td>
                <td className="border px-4 py-2">
                  {prod.price.sale < prod.price.regular ? (
                    <>
                      <span className="text-red-600 font-bold">
                        ${prod.price.sale}
                      </span>
                      <span className="line-through text-gray-500 ml-2">
                        ${prod.price.regular}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">${prod.price.regular}</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {prod.inventory.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      {prod.inventory.stock} in stock
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Out of stock
                    </span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  <a
                    href={`/products/${prod.id}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-600 py-4">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
