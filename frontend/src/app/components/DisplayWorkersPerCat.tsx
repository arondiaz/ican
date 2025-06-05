import Link from "next/link";

type Props = {
  workers: {
    id: number;
    name: string;
    description: string;
    phone: string;
    city: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

const DisplayWorkersPerCat = ({ workers }: Props) => {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((work) => (
          <Link href={`/worker/${work.id}`} key={work.id}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {work.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {work.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📍 {work.city}
              </p>
              <div className="flex justify-end">
                <button className="bg-blue-800 text-white px-4 py-1 rounded-md ">
                  Contacta
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayWorkersPerCat;
