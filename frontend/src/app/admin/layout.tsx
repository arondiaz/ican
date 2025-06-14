import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Sidebar } from "../components/AdminComponents/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessiontokenadms");

  if (!token) {
    redirect("/login"); // redirige si no hay token
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
