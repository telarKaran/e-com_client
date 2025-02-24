import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LocationAutocomplete from "./LocationAutocomplete";

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
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Shopmaster360
          </Link>
        </div>

        <LocationAutocomplete />

        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search for products, brands, and more..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          {userName ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Hello, {userName}</span>

              <Link
                href="/signout"
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <Link
              href="/signin"
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
