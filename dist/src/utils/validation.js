/**
 * 基础参数校验工具
 */
export function requireNonEmptyString(value, name) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${name} must be a non-empty string`);
    }
    return value.trim();
}
export function requireNonEmptyArray(value, name) {
    if (!Array.isArray(value) || value.length === 0) {
        throw new Error(`${name} must be a non-empty array`);
    }
    return value;
}
export function clampNumber(value, name, min, max) {
    if (!Number.isFinite(value)) {
        throw new Error(`${name} must be a finite number`);
    }
    return Math.min(Math.max(value, min), max);
}
//# sourceMappingURL=validation.js.map