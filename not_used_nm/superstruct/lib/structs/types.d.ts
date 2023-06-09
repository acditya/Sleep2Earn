import { Infer, Struct } from '../struct';
import { TupleSchema, ObjectSchema, ObjectType } from '../utils';
/**
 * Ensure that any value passes validation.
 */
export declare function any(): Struct<any, null>;
/**
 * Ensure that a value is an array and that its elements are of a specific type.
 *
 * Note: If you omit the element struct, the arrays elements will not be
 * iterated at all. This can be helpful for cases where performance is critical,
 * and it is preferred to using `array(any())`.
 */
export declare function array<T extends Struct<any>>(Element: T): Struct<Infer<T>[], T>;
export declare function array(): Struct<unknown[], undefined>;
/**
 * Ensure that a value is a boolean.
 */
export declare function boolean(): Struct<boolean, null>;
/**
 * Ensure that a value is a valid `Date`.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 */
export declare function date(): Struct<Date, null>;
/**
 * Ensure that a value is one of a set of potential values.
 *
 * Note: after creating the struct, you can access the definition of the
 * potential values as `struct.schema`.
 */
export declare function enums<T extends number>(values: readonly T[]): Struct<T, {
    [K in T[][number]]: K;
}>;
export declare function enums<T extends string>(values: readonly T[]): Struct<T, {
    [K in T[][number]]: K;
}>;
/**
 * Ensure that a value is a function.
 */
export declare function func(): Struct<Function, null>;
/**
 * Ensure that a value is an instance of a specific class.
 */
export declare function instance<T extends {
    new (...args: any): any;
}>(Class: T): Struct<InstanceType<T>, null>;
/**
 * Ensure that a value is an integer.
 */
export declare function integer(): Struct<number, null>;
/**
 * Ensure that a value matches all of a set of types.
 */
export declare function intersection<A>(Structs: TupleSchema<[A]>): Struct<A, null>;
export declare function intersection<A, B>(Structs: TupleSchema<[A, B]>): Struct<A & B, null>;
export declare function intersection<A, B, C>(Structs: TupleSchema<[A, B, C]>): Struct<A & B & C, null>;
export declare function intersection<A, B, C, D>(Structs: TupleSchema<[A, B, C, D]>): Struct<A & B & C & D, null>;
export declare function intersection<A, B, C, D, E>(Structs: TupleSchema<[A, B, C, D, E]>): Struct<A & B & C & D & E, null>;
export declare function intersection<A, B, C, D, E, F>(Structs: TupleSchema<[A, B, C, D, E, F]>): Struct<A & B & C & D & E & F, null>;
export declare function intersection<A, B, C, D, E, F, G>(Structs: TupleSchema<[A, B, C, D, E, F, G]>): Struct<A & B & C & D & E & F & G, null>;
export declare function intersection<A, B, C, D, E, F, G, H>(Structs: TupleSchema<[A, B, C, D, E, F, G, H]>): Struct<A & B & C & D & E & F & G & H, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I]>): Struct<A & B & C & D & E & F & G & H & I, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J]>): Struct<A & B & C & D & E & F & G & H & I & J, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K]>): Struct<A & B & C & D & E & F & G & H & I & J & K, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L, M>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L & M, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L & M & N, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P, null>;
export declare function intersection<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q]>): Struct<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q, null>;
/**
 * Ensure that a value is an exact value, using `===` for comparison.
 */
export declare function literal<T extends boolean>(constant: T): Struct<T, T>;
export declare function literal<T extends number>(constant: T): Struct<T, T>;
export declare function literal<T extends string>(constant: T): Struct<T, T>;
export declare function literal<T>(constant: T): Struct<T, null>;
/**
 * Ensure that a value is a `Map` object, and that its keys and values are of
 * specific types.
 */
export declare function map(): Struct<Map<unknown, unknown>, null>;
export declare function map<K, V>(Key: Struct<K>, Value: Struct<V>): Struct<Map<K, V>, null>;
/**
 * Ensure that no value ever passes validation.
 */
export declare function never(): Struct<never, null>;
/**
 * Augment an existing struct to allow `null` values.
 */
export declare function nullable<T, S>(struct: Struct<T, S>): Struct<T | null, S>;
/**
 * Ensure that a value is a number.
 */
export declare function number(): Struct<number, null>;
/**
 * Ensure that a value is an object, that is has a known set of properties,
 * and that its properties are of specific types.
 *
 * Note: Unrecognized properties will fail validation.
 */
export declare function object(): Struct<Record<string, unknown>, null>;
export declare function object<S extends ObjectSchema>(schema: S): Struct<ObjectType<S>, S>;
/**
 * Augment a struct to allow `undefined` values.
 */
export declare function optional<T, S>(struct: Struct<T, S>): Struct<T | undefined, S>;
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */
export declare function record<K extends string, V>(Key: Struct<K>, Value: Struct<V>): Struct<Record<K, V>, null>;
/**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 */
export declare function regexp(): Struct<RegExp, null>;
/**
 * Ensure that a value is a `Set` object, and that its elements are of a
 * specific type.
 */
export declare function set(): Struct<Set<unknown>, null>;
export declare function set<T>(Element: Struct<T>): Struct<Set<T>, null>;
/**
 * Ensure that a value is a string.
 */
export declare function string(): Struct<string, null>;
/**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 */
export declare function tuple<A>(Structs: TupleSchema<[A]>): Struct<[A], null>;
export declare function tuple<A, B>(Structs: TupleSchema<[A, B]>): Struct<[A, B], null>;
export declare function tuple<A, B, C>(Structs: TupleSchema<[A, B, C]>): Struct<[A, B, C], null>;
export declare function tuple<A, B, C, D>(Structs: TupleSchema<[A, B, C, D]>): Struct<[A, B, C, D], null>;
export declare function tuple<A, B, C, D, E>(Structs: TupleSchema<[A, B, C, D, E]>): Struct<[A, B, C, D, E], null>;
export declare function tuple<A, B, C, D, E, F>(Structs: TupleSchema<[A, B, C, D, E, F]>): Struct<[A, B, C, D, E, F], null>;
export declare function tuple<A, B, C, D, E, F, G>(Structs: TupleSchema<[A, B, C, D, E, F, G]>): Struct<[A, B, C, D, E, F, G], null>;
export declare function tuple<A, B, C, D, E, F, G, H>(Structs: TupleSchema<[A, B, C, D, E, F, G, H]>): Struct<[A, B, C, D, E, F, G, H], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I]>): Struct<[A, B, C, D, E, F, G, H, I], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J]>): Struct<[A, B, C, D, E, F, G, H, I, J], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K]>): Struct<[A, B, C, D, E, F, G, H, I, J, K], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L, M>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L, M], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L, M, N], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P], null>;
export declare function tuple<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q]>): Struct<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q], null>;
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */
export declare function type<S extends ObjectSchema>(schema: S): Struct<ObjectType<S>, S>;
/**
 * Ensure that a value matches one of a set of types.
 */
export declare function union<A>(Structs: TupleSchema<[A]>): Struct<A, null>;
export declare function union<A, B>(Structs: TupleSchema<[A, B]>): Struct<A | B, null>;
export declare function union<A, B, C>(Structs: TupleSchema<[A, B, C]>): Struct<A | B | C, null>;
export declare function union<A, B, C, D>(Structs: TupleSchema<[A, B, C, D]>): Struct<A | B | C | D, null>;
export declare function union<A, B, C, D, E>(Structs: TupleSchema<[A, B, C, D, E]>): Struct<A | B | C | D | E, null>;
export declare function union<A, B, C, D, E, F>(Structs: TupleSchema<[A, B, C, D, E, F]>): Struct<A | B | C | D | E | F, null>;
export declare function union<A, B, C, D, E, F, G>(Structs: TupleSchema<[A, B, C, D, E, F, G]>): Struct<A | B | C | D | E | F | G, null>;
export declare function union<A, B, C, D, E, F, G, H>(Structs: TupleSchema<[A, B, C, D, E, F, G, H]>): Struct<A | B | C | D | E | F | G | H, null>;
export declare function union<A, B, C, D, E, F, G, H, I>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I]>): Struct<A | B | C | D | E | F | G | H | I, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J]>): Struct<A | B | C | D | E | F | G | H | I | J, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K]>): Struct<A | B | C | D | E | F | G | H | I | J | K, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L | M, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L | M | N, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P, null>;
export declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(Structs: TupleSchema<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q]>): Struct<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q, null>;
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 */
export declare function unknown(): Struct<unknown, null>;
//# sourceMappingURL=types.d.ts.map