/**
 * decode-environment
 * Decode environment variables with io-ts
 */

import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import * as R from 'fp-ts/Record'
import { pipe } from 'fp-ts/function'

type TypeOrPartial<C = never> = C extends t.TypeC<infer P>
    ? t.TypeOf<t.TypeC<P>>
    : C extends t.PartialC<infer P>
    ? t.TypeOf<t.PartialC<P>>
    : never

type Props<C = never> = C extends t.TypeC<infer P>
    ? t.TypeOf<t.TypeC<P>>
    : C extends t.PartialC<infer P>
    ? t.TypeOf<t.PartialC<P>>
    : C extends t.IntersectionC<infer P>
    ? TypeOrPartial<P[0]> & TypeOrPartial<P[1]>
    : C extends t.IntersectionC<infer P>
    ? TypeOrPartial<P[0]> & TypeOrPartial<P[1]> & TypeOrPartial<P[2]>
    : C extends t.IntersectionC<infer P>
    ? TypeOrPartial<P[0]> &
          TypeOrPartial<P[1]> &
          TypeOrPartial<P[2]> &
          TypeOrPartial<P[3]>
    : C extends t.IntersectionC<infer P>
    ? TypeOrPartial<P[0]> &
          TypeOrPartial<P[1]> &
          TypeOrPartial<P[2]> &
          TypeOrPartial<P[3]> &
          TypeOrPartial<P[4]>
    : never

/**
 * Decode `struct` with `codec` after reading variables from
 * `environment`.
 */
export function decodeEnvironment<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any>
>(
    codec: C,
    struct: (
        env: (
            key: string
        ) => (environment: NodeJS.ProcessEnv) => string | undefined
    ) => {
        [K in keyof Props<C>]: (
            environment: NodeJS.ProcessEnv
        ) => string | undefined
    },
    environment: NodeJS.ProcessEnv = process.env
): E.Either<t.Errors, t.TypeOf<C>> {
    const env = (key: string) => (
        environment: NodeJS.ProcessEnv
    ): string | undefined => environment[key]

    return pipe(
        struct(env),
        R.reduceWithIndex({}, (key, acc, value) =>
            Object.assign(acc, { [key]: value(environment) })
        ),
        codec.decode.bind(null)
    )
}
