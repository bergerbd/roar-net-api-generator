# Random solution

## Signature

```text
random_solution(Problem) : Solution
```

## Description

This function samples the feasible decision space of the given problem instance uniformly at
  random (with replacement) and produces a feasible solution.

## Use cases
Random solutions are often used as initial solutions in local search. The initial population
  of evolutionary algorithms typically consists of solutions generated at random.

## Features

This operation belongs to: [heuristic](../features.md#heuristic).

## See also

[Problem](../types/Problem.md),
[Solution](../types/Solution.md).
