import { IOffsetPagination } from "../types/tools/pagination.type";

export class PaginationService {
    static ALL_PAGES = -1;
    
    static calculateOffset(page: number, limit: number): IOffsetPagination {
        limit = Math.abs(limit);
        // const isAllPages = page === PaginationService.ALL_PAGES
        return {
            take: limit,
            skip: limit * (Math.abs(page) - 1)
        }
    }

    static calculateTotalPage(totalRows: number, limit: number): number {
        if (totalRows <= 0 || limit <= 0) {
            return 0;
        }
        return Math.ceil(totalRows / limit);
    }
}
