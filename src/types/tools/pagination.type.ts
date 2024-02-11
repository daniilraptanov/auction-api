export interface IOffsetPagination {
    take: number;
    skip: number;
}

export interface IPaginateModel<T> {
    rows: T[];
    totalRows: number;
    totalPage: number;
}

