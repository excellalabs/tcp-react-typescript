export interface DataColumn<T> {
    headerLabel: string,
    headerId: string, // must be unique
    comparator: (a: T, b: T) => number,
    renderer: (data: T) => string | number | Element
};