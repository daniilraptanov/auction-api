export class PaginationService {
    static ALL_PAGES = -1;
    
    static calculateOffset(page: number, limit: number) {
        limit = Math.abs(limit);
        const isAllPages = page === PaginationService.ALL_PAGES
        return {
            take: limit,
            skip: isAllPages 
                ? page
                : (limit * (Math.abs(page) - 1))
        }
    }
}
