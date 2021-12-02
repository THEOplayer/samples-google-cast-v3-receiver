export function fromUint8ArrayToNumberArray(array: Uint8Array): number[] {
    return Array.from(new Uint8Array(array));
}
