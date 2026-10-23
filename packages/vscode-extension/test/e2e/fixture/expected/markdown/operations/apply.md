# Apply

## Signature

```text
apply(Move, Solution) : Solution
```

## Description

This function applies a move to a solution in order to produce the corresponding neighbour.

## Pre-requisites
The given move must have been generated under some neighbourhood for the given solution or a
  pristine copy of it.

## Use cases
Applying moves to solutions is required by all optimisation algorithms in order to visit new
  solutions.

## Features

This operation does not belong to a feature; every implementation provides it.

## See also

[Move](../types/Move.md),
[Solution](../types/Solution.md).
