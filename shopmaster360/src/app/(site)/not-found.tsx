import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <FaExclamationTriangle className="h-16 w-16 text-primary" />
        </div>

        <h1 className="mt-4 text-9xl font-bold text-primary">404</h1>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FFA500] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
