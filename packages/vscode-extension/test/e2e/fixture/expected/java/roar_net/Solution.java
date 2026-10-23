package roar_net;

public interface Solution {

    /**
     * This function produces a copy of the given solution.
     * <p>
     * <h2>Use cases</h2>
     * Making copies of solutions may be required when keeping track of the best solution found so
     *   far. It is also required by optimisation algorithms such as beam search and evolutionary
     *   algorithms.
     * <p>
     * Provided by every implementation.
     */
    public default Solution copy() {
        throw new NotImplementedException("This function is not yet implemented.");
    }

    /**
     * This function informs the client iff a solution is feasible (complete).
     * <p>
     * Feature: constructive
     */
    public default boolean isFeasible() {
        if (getProblem().getFeatures().contains("constructive")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function produces a lower bound on the value taken by the objective function at any
     *   feasible solution that can be obtained by applying construction moves to the given,
     *   presumably partial, solution. If it is known that no feasible solution can be obtained by
     *   further construction, this function should produce no value.
     * <p>
     * Evaluation of the lower bound must occur before this function returns, but the time at which
     *   the evaluation actually occurs is otherwise unspecified.
     * <p>
     * It is assumed that the objective function is to be minimised.
     * <p>
     * <h2>Use cases</h2>
     * Lower bounds are typically used in constructive search to guide solution construction or to
     *   stop it early (also known as *pruning*) by signalling that a better feasible solution than
     *   the best one known so far can no longer be constructed from a given partial solution.
     * <p>
     * Lower-bound functions are strongly related to the notion of *admissible heuristics* in
     *   computer science.
     * <p>
     * Feature: bounded
     */
    public default double lowerBound() {
        if (getProblem().getFeatures().contains("bounded")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function produces the value of the objective function at the given solution if the
     *   solution is feasible, and no value otherwise. A solution is feasible if it satisfies all
     *   constraints of the problem. The objective value of an infeasible solution is undefined.
     * <p>
     * In general, both complete and partial solutions may be feasible or infeasible. Feasible
     *   partial solutions are common, for example, in models of the knapsack problem, as even
     *   an empty knapsack is a feasible solution. Infeasible complete solutions may arise, for
     *   example, when constructing solutions for the travelling salesman problem on incomplete
     *   graphs.
     * <p>
     * Evaluation of the objective function must occur before this function returns, but the time at
     *   which the evaluation actually occurs is otherwise unspecified.
     * <p>
     * It is assumed that the objective function is to be minimised.
     * <p>
     * <h2>Use cases</h2>
     * Objective-value evaluation is required by all optimisation algorithms.
     * <p>
     * Provided by every implementation.
     */
    public default double objectiveValue() {
        throw new NotImplementedException("This function is not yet implemented.");
    }

    /**
     * Returns the Problem the Solution was created for.
     * <p>
     * Provided by every implementation.
     */
    public default Problem getProblem() {
        throw new NotImplementedException("This function is not yet implemented.");
    }
}
