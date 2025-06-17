import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Sidebar } from "../components/AdminComponents/Sidebar";
import jwt from "jsonwebtoken";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessiontokenadms")?.value; //value**

  const SECRET = process.env.JWT_SECRET;

  if (!SECRET) throw new Error("JWT_SECRET no definido");
  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, SECRET);
  } catch (err) {
    console.error("Token inválido:", err);
    redirect("/login");
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border border-black">
            <h3>admin panel</h3>
            <p>hola</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
