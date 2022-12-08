export function fromUint8ArrayToNumberArray(array: Uint8Array): number[] {
    return Array.from(new Uint8Array(array));
}

export function fromObjectToUint8Array(obj: {[key: string]: any}): Uint8Array {
    return new TextEncoder().encode(JSON.stringify(obj));
}

export function fromObjectToBase64String(obj: {[key: string]: any}): string {
    return fromStringToBase64String(JSON.stringify(obj));
}

export function fromStringToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
}

export function fromStringToBase64String(str: string): string {
    return btoa(str);
}

export function fromBase64StringToString(str: string): string {
    return atob(str);
}

export function fromBase64StringToArrayBuffer(str: string): ArrayBuffer {
    return Uint8Array.from(fromBase64StringToString(str), c => c.charCodeAt(0)).buffer;
}

export function fromUint8ArrayToString(array: Uint8Array): string {
    return new TextDecoder().decode(array);
}

export function fromUint8ArrayToObject(array: Uint8Array): {[key: string]: any} {
    return JSON.parse(new TextDecoder().decode(array));
}

export function fromUint8ArrayToUtf8String(array: Uint8Array): string {
    return new TextDecoder('utf-8').decode(array);
}
