package roar_net;

public interface Move {

    /**
     * The problem instance this object was created for.
     */
    public default Problem getProblem() {
        throw new NotImplementedException("getProblem() is not yet implemented.");
    }

    /**
     * This function applies a move to a solution in order to produce the corresponding neighbour.
     * <p>
     * <h2>Pre-requisites</h2>
     * The given move must have been generated under some neighbourhood for the given solution or a
     *   pristine copy of it.
     * <p>
     * <h2>Use cases</h2>
     * Applying moves to solutions is required by all optimisation algorithms in order to visit new
     *   solutions.
     * <p>
     * Provided by every implementation.
     */
    public default Solution apply(final Solution solution) {
        throw new NotImplementedException("This function is not yet implemented.");
    }

    /**
     * This function reverts the application of a move to a solution. If applying a move to a
     *   solution A results in solution B, then reverting the same move from solution B must produce
     *   solution A.
     * <p>
     * The result must be a solution to which applying the given move produces the given solution.
     * <p>
     * <h2>Pre-requisites</h2>
     * The given move and the given solution must pertain to the same problem instance. In addition,
     *   the given move must have been previously generated under some neighbourhood for the solution
     *   to which this operation reverts.
     * <p>
     * <h2>Use cases</h2>
     * This operation allows backtracking from a given solution to be performed by reverting each move
     *   previously applied to it in reverse order. This assumes that storing and reverting moves is
     *   generally more efficient than copying or storing solutions.
     * <p>
     * Feature: is-reversible
     */
    public default Solution revert(final Solution solution) {
        if (getProblem().getFeatures().contains("is-reversible")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function produces the difference between the lower bound of the solution that would be
     *   obtained by applying the given move to the given solution and the lower bound of the given
     *   solution. If lower bound of either solution is undefined, the lower-bound increment is also
     *   undefined, and this function produces no value.
     * <p>
     * Since it is assumed that the objective function is to be minimised, the lower-bound increment
     *   resulting from a construction move cannot be negative, and that resulting from a destruction
     *   move cannot be positive.
     * <p>
     * <h2>Pre-requisites</h2>
     * The given move must have been generated under some neighbourhood structure for the given
     *   solution or a pristine copy of it.
     * <p>
     * <h2>Use cases</h2>
     * The lower-bound increment provides a heuristic measure of move quality in constructive search.
     *   In algorithms such as GRASP, construction moves typically consist of adding components to
     *   the current solution, and move quality is often seen as an attribute of the components
     *   themselves. The lower-bound increment provides a more general, drop-in replacement for such
     *   move-quality heuristics in constructive search.
     * <p>
     * Determining the lower-bound increment can often be performed faster than applying a move to a
     *   solution and computing the difference between the two lower-bound values. This avoids
     *   spending time applying moves to solutions that will be discarded immediately, and motivates
     *   further investment in efficient lower-bound increment evaluation, even if at the expense of
     *   some additional processing when moves are applied to solutions.
     * <p>
     * Feature: bounded
     */
    public default double lowerBoundIncrement(final Solution solution) {
        if (getProblem().getFeatures().contains("bounded")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function produces the difference between the value of the objective function at the
     *   solution that would be obtained by applying the given move to the given solution and the
     *   corresponding value at the given solution. If either solution is infeasible, the
     *   objective-value increment is undefined, and this function produces no value.
     * <p>
     * It is assumed that the objective function is to be minimised.
     * <p>
     * <h2>Pre-requisites</h2>
     * The given move must have been generated under some neighbourhood structure for the given
     *   solution or a pristine copy of it.
     * <p>
     * <h2>Use cases</h2>
     * The objective-value increment provides a measure of move quality, especially in local-search
     *   algorithms, but also in constructive search algorithms.
     * <p>
     * Determining the objective-value increment can often be performed faster than applying a move
     *   to a solution and computing the difference between the two objective values. This avoids
     *   spending time applying moves to solutions that will be discarded immediately, and motivates
     *   further investment in efficient objective-value increment evaluation, even if at the expense
     *   of some additional processing when moves are applied to solutions.
     * <p>
     * Feature: improved-ov-calculation
     */
    public default double objectiveValueIncrement(final Solution solution) {
        if (getProblem().getFeatures().contains("improved-ov-calculation")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * Returns the Neighbourhood the Move was created for.
     * <p>
     * Provided by every implementation.
     */
    public default Neighbourhood getNeighbourhood() {
        throw new NotImplementedException("This function is not yet implemented.");
    }
}
