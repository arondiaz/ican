export interface IWorker {
  name: string;
  publishedAt?: string;
  description: string;
  categories?: ICategory[];
  phone: string;
  city: string;
  image?: string;
  _id: number;
}

export interface ICategory {
  name: string;
}
