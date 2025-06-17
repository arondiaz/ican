import { Users, Plus, Home, User, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import S from "../../assets/s.png";

const data = {
  navMain: [
    { title: "Web", url: "/", icon: Globe },
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Trabajadores", url: "/admin/workers", icon: Users },
    { title: "Agregar trabajador", url: "/admin/addWorker", icon: Plus },
  ],
};

function NavItem({
  url,
  icon: Icon,
  title,
}: {
  url: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <li>
      <Link
        href={url}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm text-gray-700"
      >
        <Icon className="size-4" />
        <span>{title}</span>
      </Link>
    </li>
  );
}

export function Sidebar() {
  return (
    <aside className="flex flex-col h-full p-4 bg-white border-r">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <div className="flex flex-row items-center gap-6">
              <Image
                src={S}
                alt="serviciosya! logo"
                width={55}
                height={55}
                className="rounded-xl"
                priority
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Admin system</h3>
            <h4 className="text-xs text-gray-500">Control panel</h4>
          </div>
        </Link>
      </div>
      <nav className="flex-1 border-t">
        <ul className="space-y-1 mt-4">
          {data.navMain.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-4 border-t">
        <Link href="/admin/profile" className="flex items-center gap-3 text-sm">
          <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-accent">
            <User className="size-4 text-white" />
          </div>
          <div>
            <div className="font-semibold">Administrador</div>
            <div className="text-xs text-gray-500">admin@admin.com</div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
