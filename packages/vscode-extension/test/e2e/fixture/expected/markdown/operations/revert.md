# Revert

## Signature

```text
revert(Move, Solution) : Solution
```

## Description

This function reverts the application of a move to a solution. If applying a move to a
  solution A results in solution B, then reverting the same move from solution B must produce
  solution A.

The result must be a solution to which applying the given move produces the given solution.

## Pre-requisites
The given move and the given solution must pertain to the same problem instance. In addition,
  the given move must have been previously generated under some neighbourhood for the solution
  to which this operation reverts.

## Use cases
This operation allows backtracking from a given solution to be performed by reverting each move
  previously applied to it in reverse order. This assumes that storing and reverting moves is
  generally more efficient than copying or storing solutions.

## Features

This operation belongs to: [is-reversible](../features.md#is-reversible).

## See also

[Move](../types/Move.md),
[Solution](../types/Solution.md).
