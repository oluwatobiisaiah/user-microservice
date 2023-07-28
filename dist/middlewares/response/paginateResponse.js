"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (req, data) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10); /*Default limit is 10*/
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPages = Math.ceil(data.length / limit);
    return { data: data.slice(startIndex, endIndex), page, totalPages };
};
exports.paginate = paginate;
