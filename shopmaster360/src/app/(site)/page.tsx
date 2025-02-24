import Image from "next/image";
import { cookies } from "next/headers";

export default async function Home() {
  console.log((await cookies()).get("session "));
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello</h1>
    </div>
  );
}
