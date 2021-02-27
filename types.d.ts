export interface Pagination {
  total: number;
  last_page: number;
  current_page: number;
}

export interface AdditionalPagination {
  total?: number;
  last_page?: number;
  current_page?: number;
}
