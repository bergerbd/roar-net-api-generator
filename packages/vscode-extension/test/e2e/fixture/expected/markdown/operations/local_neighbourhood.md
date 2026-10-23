# Local neighbourhood

## Signature

```text
local_neighbourhood(Problem) : Neighbourhood
```

## Description

This function returns the local neighbourhood structure of the given problem instance. In a
  local-search model of a combinatorial optimisation problem, the local neighbourhood
  structure specifies which feasible solutions, or neighbours, can be obtained from each
  feasible solution by means of a "small" modification. The notion of local optimum is
  intrinsically tied to the definition of such a neighbourhood.

## Use cases
A local neighbourhood structure is required by all local search approaches, including but not
  limited to best-improvement, first-improvement and iterated local search, tabu search and
  evolutionary algorithms.

## Features

This operation belongs to: [local](../features.md#local).

## See also

[Problem](../types/Problem.md),
[Neighbourhood](../types/Neighbourhood.md).
