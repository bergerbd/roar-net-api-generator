# Destruction neighbourhood

## Signature

```text
destruction_neighbourhood(Problem) : Neighbourhood
```

## Description

This function returns the destruction neighbourhood structure of the given problem instance.
  In a constructive-search model of a combinatorial optimisation problem, the destruction
  neighbourhood structure, or destruction rule, dictates how complete or partial solutions
  may be made progressively less complete until an empty solution is reached.

## Use cases
A destruction neighbourhood structure is required by some constructive search approaches, such
  as ruin and recreate.

## Features

This operation belongs to: [destructive](../features.md#destructive).

## See also

[Problem](../types/Problem.md),
[Neighbourhood](../types/Neighbourhood.md).
