// "use client";

// import { useRouter } from "next/navigation";

// export default function Breadcrumb({ name }: { name: string }) {
//   const router = useRouter();
//   return (
//     <div className="mb-4 text-sm text-gray-500">
//       <p
//         className="text-blue-600 hover:underline"
//         onClick={() => router.push("/")}
//       >
//         Home
//       </p>
//       {" / "}
//       <p
//         className="text-blue-600 hover:underline"
//         onClick={() => router.push("/")}
//       >
//         Products
//       </p>
//       {" / "}
//       <span className="font-medium text-gray-800">{name}</span>
//     </div>
//   );
// }

import Link from "next/link";

export default function Page() {
  return <Link href="/">Dashboard</Link>;
}
