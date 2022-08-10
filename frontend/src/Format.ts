export const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

export const compactCurrencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
});

export const numberFormatter = Intl.NumberFormat('en-US', {});

export const compactNumberFormatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
});

export function years(value: number | undefined): string {
    if(value === 1)
        return `${value} year`;

    return `${value} years`;
}
