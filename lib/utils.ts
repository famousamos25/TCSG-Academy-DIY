import { clsx, type ClassValue } from 'clsx';
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