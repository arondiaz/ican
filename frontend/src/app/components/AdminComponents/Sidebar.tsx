import { Users, Plus, Home, User } from "lucide-react";
import Link from "next/link";

const data = {
  navMain: [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Trabajadores", url: "/admin/workers", icon: Users },
    { title: "Agregar Trabajador", url: "/admin/addWorker", icon: Plus },
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
            <span className="text-xl font-bold">S!</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Sistema Admin</h3>
            <h4 className="text-xs text-gray-500">Panel de Control</h4>
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
