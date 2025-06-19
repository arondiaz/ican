"use client";
import { useState } from "react";
import Image from "next/image";
import upload from "../../assets/upload.png";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    phone: "",
    city: "",
    categoryIds: [] as number[],
  });

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

  const imageSrc = image ? URL.createObjectURL(image) : upload;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...data, image });
    const url = "http://localhost:4444/workers";

    try {
      console.log(data);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await res.json();
      alert("Usuario creado correctamente");
      setData({
        name: "",
        description: "",
        phone: "",
        city: "",
        categoryIds: [] as number[],
      });
    } catch (error) {
      console.log(error);
    }
    //formdata
  };

  return (
    <>
      <section className="min-h-screen py-10 px-5 sm:px-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Agregar nuevo trabajador
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-6 ">
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
                  <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt="Vista previa"
                    className="rounded-md border"
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  //required
                  onChange={(e) => {
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-variant text-white px-6 py-2 rounded-md"
              >
                Agregar trabajador
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
