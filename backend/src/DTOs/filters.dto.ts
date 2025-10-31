export interface FiltersAllowDTO {
    name: string | undefined;
    code: string | undefined;
    minPurchasePrice: string | undefined;
    maxPurchasePrice: string | undefined;
    minSalesPrice: string | undefined;
    maxSalesPrice: string | undefined;
    maxTotalQuantity: number | undefined;
    minTotalQuantity: number | undefined;
};