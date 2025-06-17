// app/admin/empleados/[id]/page.tsx
import EditWorker from "../../../components/AdminComponents/EditWorker";

interface IParams {
  params: {
    id: string;
  };
}

export default async function EditEmpleadoPage({ params }: IParams) {
  const res = await fetch(`http://localhost:4444/workers/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <div>No se encontró el empleado</div>;
  const worker = await res.json();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar empleado</h2>
      <EditWorker worker={worker} />
    </div>
  );
}
