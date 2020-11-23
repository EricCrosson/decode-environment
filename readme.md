# decode-environment
[![License][]](https://opensource.org/licenses/ISC)
[![NPM Package][]](https://npmjs.org/package/decode-environment)
[![Build status][]](https://travis-ci.org/EricCrosson/decode-environment)
[![Code Coverage][]](https://codecov.io/gh/EricCrosson/decode-environment)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[NPM Package]: https://img.shields.io/npm/v/decode-environment.svg
[Build status]: https://travis-ci.org/EricCrosson/decode-environment.svg?branch=master
[Code Coverage]: https://codecov.io/gh/EricCrosson/decode-environment/branch/master/graph/badge.svg

> Decode environment variables with io-ts

## Install

``` shell
npm install decode-environment
```

## Use

``` typescript
import { decodeEnvironment } from 'decode-environment'
import * as t from 'io-ts'

const codec = t.intersection([
    t.type({
        environment: t.string
    }),
    t.partial({
        retries: t.Int
    })
])

decodeEnvironment(
    codec,
    (env) => ({
        environment: env('NODE_ENV'),
        retries: env('NUM_RETRIES')
    })
)
//=> { _tag: 'Right', right: { environment: 'development', retries: 1 } }
```

The type-signature of `decodeEnvironment` is as follows

``` typescript
export function decodeEnvironment<C extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any>>(
    codec: C,
    struct: (env: (key: string) => (environment: NodeJS.ProcessEnv) => string | undefined) =>
        { [K in keyof Props<C>]: (environment: NodeJS.ProcessEnv) => string | undefined },
    environment: NodeJS.ProcessEnv = process.env
): E.Either<t.Errors, t.TypeOf<C>>
```

## Features

- [X] specify environment from which to source variables
- [X] support `t.TypeC` codecs
- [X] support `t.PartialC` codecs
- [X] support `t.IntersectionC` codecs
- [ ] support nested objects in `struct`
- [ ] support non-`env` literals in `struct`

## Acknowledgments

- [io-ts](https://github.com/gcanti/io-ts)
