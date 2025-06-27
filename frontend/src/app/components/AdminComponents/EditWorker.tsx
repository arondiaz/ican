"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IWorker } from "@/app/utils/interface";
import Image from "next/image";

export default function EditWorker({ worker }: { worker: IWorker }) {
  const [data, setData] = useState({
    name: worker.name || "",
    phone: worker.phone || "",
    description: worker.description || "",
    city: worker.city || "",
    categoryIds: worker.categories?.map(category => category.id) || [],
    image: worker.image,
  });

  const [image, setImage] = useState<File | null>(null);
  const URL2 = process.env.NEXT_PUBLIC_API;

  const router = useRouter();

  const categoryOptions = [
    { value: "1", name: "Electricista" },
    { value: "2", name: "Plomero" },
    { value: "3", name: "Carpintero" },
    { value: "4", name: "Gasista" },
    { value: "5", name: "Mecanico" },
    { value: "6", name: "Gomero" },
    { value: "7", name: "Instalador de aire" },
    { value: "8", name: "Cerrajero" },
  ];

  const cityOptions = [
    { value: "", name: "Seleccionar" },
    { value: "Rosario", name: "Rosario" },
    { value: "Santa Fe", name: "Santa Fe" },
    { value: "Casilda", name: "Casilda" },
  ];

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "categoryIds") {
      const options = (e.target as HTMLSelectElement).selectedOptions;
      const values = Array.from(options).map((option) =>
        parseInt(option.value)
      );
      setData((prev) => ({ ...prev, categoryIds: values }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const imageSrc = image ? URL.createObjectURL(image) : worker.image;

  const uploadImageToCloudinary = async (file: File) => {
    const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const payload = {
      ...data,
      image: image ? imageUrl : data.image,
    };

    await fetch(`${URL2}/workers/${worker.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
    router.push("/admin/workers");
  };

  const handleDelete = async (id: number) => {
    await fetch(`${URL2}/workers/${id}`, {
      method: "DELETE",
    });
    router.push("/admin/workers");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      {/* Imagen */}
      <div>
        <label
          htmlFor="image"
          className="block text-md md:text-lg lg:text-xl font-medium text-gray-700 mb-1"
        >
          Imagen
        </label>
        <div className="flex items-center gap-4">
          <label htmlFor="image" className="cursor-pointer">
            {imageSrc && (
              <Image
                src={imageSrc}
                width={200}
                height={200}
                priority
                alt="Vista previa"
                className="rounded-md border"
              />
            )}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            //required
            onChange={(e) => {
              console.log(e);
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
          />
        </div>
      </div>

      {/* Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block  text-md md:text-lg  font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-md md:text-lg font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label
          htmlFor="phone"
          className="block  text-md md:text-lg font-medium text-gray-700"
        >
          Teléfono
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={data.phone}
          onChange={handleChange}
          required
        />
      </div>

      {/* Ciudad */}

      <div className="flex-1">
        <label className="block  text-md md:text-lg font-medium text-gray-700">
          Ciudad
        </label>
        <select
          name="city"
          value={data.city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2"
          required
        >
          {cityOptions.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Categorías */}
      <div>
        <label
          htmlFor="categoryIds"
          className="block text-md md:text-lg font-medium text-gray-700"
        >
          Categorías
        </label>
        <select
          multiple
          id="categoryIds"
          name="categoryIds"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={data.categoryIds as []}
          onChange={handleChange}
          required
        >
          {categoryOptions.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Usá Ctrl o Cmd para seleccionar varias opciones
        </p>
      </div>

      {/* Botón */}
      <div className="text-center flex flex-row justify-center gap-8">
        <button
          type="submit"
          className="bg-variant text-white px-6 py-2 rounded-md"
        >
          Editar{" "}
        </button>
        <button
          type="submit"
          className="bg-red-800 text-white px-6 py-2 rounded-md"
          onClick={() => handleDelete(worker.id)}
        >
          Eliminar{" "}
        </button>
      </div>
    </form>
  );
}
