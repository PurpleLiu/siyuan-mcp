/**
 * 基础参数校验工具
 */
export declare function requireNonEmptyString(value: string, name: string): string;
export declare function requireNonEmptyArray<T>(value: T[] | undefined | null, name: string): T[];
export declare function clampNumber(value: number, name: string, min: number, max: number): number;
//# sourceMappingURL=validation.d.ts.map