export interface IWorker {
  name: string;
  publishedAt?: string;
  description: string;
  categories: ICategory[];
  phone: string;
  city: string;
  image?: string;
  id: number;
}

export interface ICategory {
  name: string;
  id:number;
}
