// import Link from "next/link";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import LocationAutocomplete from "./LocationAutocomplete";

// interface DecodedToken {
//   id?: string;
//   name?: string;
//   email?: string;
// }

// export default async function Header() {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   let userName: string | null = null;
//   if (token) {
//     try {
//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET || "thisismykey"
//       ) as DecodedToken;

//       userName = decoded.name || decoded.email || null;
//     } catch (error) {
//       userName = null;
//     }
//   }

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center">
//           <Link href="/" className="text-2xl font-bold text-primary">
//             Shopmaster360
//           </Link>
//         </div>

//         <LocationAutocomplete />

//         <div className="flex-1 mx-8">
//           <input
//             type="text"
//             placeholder="Search for products, brands, and more..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
//           />
//         </div>
//         <div>
//           {userName ? (
//             <div className="flex items-center gap-4">
//               <span className="text-gray-700">Hello, {userName}</span>

//               <Link
//                 href="/signout"
//                 className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
//               >
//                 Sign Out
//               </Link>
//             </div>
//           ) : (
//             <Link
//               href="/signin"
//               className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LocationAutocomplete from "./LocationAutocomplete";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import UserMenu from "./UserMenu";

interface DecodedToken {
  id?: string;
  name?: string;
  email?: string;
}

export default async function Header() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let userName: string | null = null;
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "thisismykey"
      ) as DecodedToken;
      userName = decoded.name || decoded.email || null;
    } catch (error) {
      userName = null;
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button> */}
          <Link
            href="/"
            className="text-xl font-bold text-primary flex items-center gap-1"
          >
            <span className="hidden sm:inline">Shopmaster360</span>
          </Link>
        </div>

        {/* Location and Search */}
        <div className="flex-1 flex items-center gap-4 max-w-3xl">
          <LocationAutocomplete />

          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search products, brands..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-sm"
              aria-label="Search products"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {userName ? (
            <div className="flex items-center gap-4">
              <UserMenu userName={userName} />
            </div>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors text-sm"
            >
              <UserCircleIcon className="w-5 h-5" />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
