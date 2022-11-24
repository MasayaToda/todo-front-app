export interface Todo {
    id: number;
    categoryId?: number;
    title: string;
    body: string;
    state: number;
    createdAt?:string;
    updatedAt?:string;
  }