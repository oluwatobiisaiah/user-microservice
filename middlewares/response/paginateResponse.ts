import { Request } from "express";

export const paginate = (req: Request, data: Array<any>) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10); /*Default limit is 10*/
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(data.length / limit);
  return { data: data.slice(startIndex, endIndex), page, totalPages };
};
