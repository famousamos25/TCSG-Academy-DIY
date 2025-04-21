import { clsx, type ClassValue } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function lowerFirstLetter(str: any) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function convertKeysToLowerFirst(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToLowerFirst(item)); // Recursively process array elements
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc: any, key) => {
            const newKey = lowerFirstLetter(key);
            acc[newKey] = convertKeysToLowerFirst(obj[key]); // Recursively process values
            return acc;
        }, {});
    }
    return obj; // Return primitive values as is
}

export const formatAmountWithCurrency = (value: any, format: any) => {
    if (value === null) return 'null';
    if (format) return `$${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 9 }).format(value)}`;
    return value;
};

export const randomId = (length = 21) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = customAlphabet(characters, length);
   return nanoid();
};

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}