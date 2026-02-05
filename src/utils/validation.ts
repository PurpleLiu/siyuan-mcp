/**
 * 基础参数校验工具
 */

export function requireNonEmptyString(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value.trim();
}

export function requireNonEmptyArray<T>(value: T[] | undefined | null, name: string): T[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${name} must be a non-empty array`);
  }
  return value;
}

export function clampNumber(value: number, name: string, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  return Math.min(Math.max(value, min), max);
}
