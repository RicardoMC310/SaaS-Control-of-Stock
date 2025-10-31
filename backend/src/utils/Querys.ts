import { FiltersAllowDTO } from "../DTOs/filters.dto";

export function mapQuerysToFilters(query: any): FiltersAllowDTO {
    return {
        name: query.name as string | undefined,
        code: query.code as string | undefined,
        minPurchasePrice: query.minPurchasePrice as string | undefined,
        maxPurchasePrice: query.maxPurchasePrice as string | undefined,
        minSalesPrice: query.minSalesPrice as string | undefined,
        maxSalesPrice: query.maxSalesPrice as string | undefined,
        minTotalQuantity: query.minTotalQuantity ? Number(query.minTotalQuantity) : undefined,
        maxTotalQuantity: query.maxTotalQuantity ? Number(query.maxTotalQuantity) : undefined,
    };
}