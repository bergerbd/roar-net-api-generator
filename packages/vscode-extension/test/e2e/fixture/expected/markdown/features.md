# Features

The API is variable: an implementation provides only the operations of the
features it supports. Operations that belong to no feature are provided by
every implementation.

## Feature tree

- [RoarNetAPI](#roarnetapi)
  - *optional*
    - [SolutionCreation](#solutioncreation)
      - *optional*
        - [constructive](#constructive)
        - [heuristic](#heuristic)
    - [SearchStrategy](#searchstrategy)
      - *optional*
        - [local](#local)
        - [enumerable](#enumerable)
        - [destructive](#destructive)
        - [is-reversible](#is-reversible)
    - [SearchSpaceConstraint](#searchspaceconstraint)
      - *optional*
        - [bounded](#bounded)
    - [improved-ov-calculation](#improved-ov-calculation)

## Features

### RoarNetAPI

### SolutionCreation

*Optional* sub-feature of [RoarNetAPI](#roarnetapi).

### constructive

*Optional* sub-feature of [SolutionCreation](#solutioncreation).

Operations:

- [empty\_solution](./operations/empty_solution.md): `empty_solution(Problem) : Solution`
- [construction\_neighbourhood](./operations/construction_neighbourhood.md): `construction_neighbourhood(Problem) : Neighbourhood`
- [is\_feasible](./operations/is_feasible.md): `is_feasible(Solution) : bool`

### heuristic

*Optional* sub-feature of [SolutionCreation](#solutioncreation).

Operations:

- [heuristic\_solution](./operations/heuristic_solution.md): `heuristic_solution(Problem) : Solution`
- [random\_solution](./operations/random_solution.md): `random_solution(Problem) : Solution`

### SearchStrategy

*Optional* sub-feature of [RoarNetAPI](#roarnetapi).

### local

*Optional* sub-feature of [SearchStrategy](#searchstrategy).

Operations:

- [local\_neighbourhood](./operations/local_neighbourhood.md): `local_neighbourhood(Problem) : Neighbourhood`

### enumerable

*Optional* sub-feature of [SearchStrategy](#searchstrategy).

Operations:

- [moves](./operations/moves.md): `moves(Neighbourhood, Solution) : Move[0..*]`
- [random\_moves\_without\_replacement](./operations/random_moves_without_replacement.md): `random_moves_without_replacement(Neighbourhood, Solution) : Move[0..*]`

### destructive

*Optional* sub-feature of [SearchStrategy](#searchstrategy).

Operations:

- [destruction\_neighbourhood](./operations/destruction_neighbourhood.md): `destruction_neighbourhood(Problem) : Neighbourhood`

### is-reversible

*Optional* sub-feature of [SearchStrategy](#searchstrategy).

Operations:

- [revert](./operations/revert.md): `revert(Move, Solution) : Solution`

### SearchSpaceConstraint

*Optional* sub-feature of [RoarNetAPI](#roarnetapi).

### bounded

*Optional* sub-feature of [SearchSpaceConstraint](#searchspaceconstraint).

Operations:

- [lower\_bound](./operations/lower_bound.md): `lower_bound(Solution) : double`
- [lower\_bound\_increment](./operations/lower_bound_increment.md): `lower_bound_increment(Move, Solution) : double`

### improved-ov-calculation

*Optional* sub-feature of [RoarNetAPI](#roarnetapi).

Operations:

- [objective\_value\_increment](./operations/objective_value_increment.md): `objective_value_increment(Move, Solution) : double`

## Operations of every implementation

- [create](./operations/create.md): `create(API) : Problem`
- [copy](./operations/copy.md): `copy(Solution) : Solution`
- [objective\_value](./operations/objective_value.md): `objective_value(Solution) : double`
- [get\_problem (Solution)](./operations/get_problem_solution.md): `get_problem(Solution) : Problem`
- [random\_move](./operations/random_move.md): `random_move(Neighbourhood, Solution) : Move[0..1]`
- [get\_problem (Neighbourhood)](./operations/get_problem_neighbourhood.md): `get_problem(Neighbourhood) : Problem`
- [apply](./operations/apply.md): `apply(Move, Solution) : Solution`
- [get\_neighbourhood](./operations/get_neighbourhood.md): `get_neighbourhood(Move) : Neighbourhood`
