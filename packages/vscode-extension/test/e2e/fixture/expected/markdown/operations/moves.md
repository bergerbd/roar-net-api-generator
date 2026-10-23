# Moves

## Signature

```text
moves(Neighbourhood, Solution) : Move[0..*]
```

## Description

This function provides for the complete enumeration of the neighbours of a given solution by
  producing a sequence of moves in unspecified order.

## Pre-requisites
Both the given neighbourhood structure and the given solution must pertain to the same
  problem instance.

## Use cases
Move enumeration is appropriate when the optimisation algorithm performs a full exploration of
  the set of neighbours of a solution before deciding how to proceed. In this case,
  enumeration order is irrelevant to the algorithm.

Greedy construction with random tie breaking and best-improvement local search are examples of
  algorithms where the whole set of neighbours is explored before the next move is accepted
  or the algorithm stops.

## Features

This operation belongs to: [enumerable](../features.md#enumerable).

## See also

[Neighbourhood](../types/Neighbourhood.md),
[Solution](../types/Solution.md),
[Move](../types/Move.md).
