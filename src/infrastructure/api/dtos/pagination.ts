export interface PaginationResponseDto<Type> {
  totalElements: number;
  totalPages: number;
  size?: number;
  content: Type[];
}
