import test from 'ava'
import * as iots from 'io-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

/**
 * Unit under test
 */

import { decodeEnvironment } from '../../src/decode-environment'

/* eslint-disable @typescript-eslint/no-unused-vars */

type Congruent<A, B> = [A] extends [B]
    ? [B] extends [A]
        ? true
        : never
    : never

test('should fail to decode a t.type codec when env does not satisfy requirements', t => {
    const codec = iots.type({
        horse: iots.number,
    })
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.pass(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.fail()
            }
        )
    )
})

test('should decode a t.type codec', t => {
    const codec = iots.type({
        horse: iots.string,
    })
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})

test('should decode a t.partial codec', t => {
    const codec = iots.partial({
        cat: iots.string,
    })
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                cat: env('cat'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})

test('should decode a t.intersection codec of length 2', t => {
    const codec = iots.intersection([
        iots.type({
            horse: iots.string,
        }),
        iots.partial({
            cat: iots.string,
        }),
    ])
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
                cat: env('cat'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})

test('should decode a t.intersection codec of length 3', t => {
    const codec = iots.intersection([
        iots.type({
            horse: iots.string,
        }),
        iots.partial({
            cat: iots.string,
        }),
        iots.partial({
            donkey: iots.string,
        }),
    ])
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
                cat: env('cat'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})

test('should decode a t.intersection codec of length 4', t => {
    const codec = iots.intersection([
        iots.type({
            horse: iots.string,
        }),
        iots.partial({
            cat: iots.string,
        }),
        iots.partial({
            donkey: iots.string,
        }),
        iots.partial({
            crab: iots.string,
        }),
    ])
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
                cat: env('cat'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})
test('should decode a t.intersection codec of length 5', t => {
    const codec = iots.intersection([
        iots.type({
            horse: iots.string,
        }),
        iots.partial({
            cat: iots.string,
        }),
        iots.partial({
            donkey: iots.string,
        }),
        iots.partial({
            crab: iots.string,
        }),
        iots.partial({
            thneed: iots.string,
        }),
    ])
    pipe(
        decodeEnvironment(
            codec,
            env => ({
                horse: env('horse'),
                cat: env('cat'),
            }),
            {
                horse: 'apple',
            }
        ),
        E.fold(
            () => t.fail(),
            value => {
                const _assertion: Congruent<
                    typeof value,
                    iots.TypeOf<typeof codec>
                > = true
                t.pass()
            }
        )
    )
})
