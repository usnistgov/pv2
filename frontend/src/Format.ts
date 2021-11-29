export const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
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
