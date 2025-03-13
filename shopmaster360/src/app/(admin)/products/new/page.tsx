import ProductForm from "@/app/components/products/ProductForm";

// async function getProducts() {
//   const res = await fetch("http://localhost:3001/products", {
//     cache: "no-store",
//   });
//   return res.json();
// }

export default function AdminProductsPage() {
  return <ProductForm />;
}
