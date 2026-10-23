package roar_net;

import java.util.Set;

public interface Problem {

    /**
     * The names of the features this problem instance provides.
     */
    public default Set<String> getFeatures() {
        throw new NotImplementedException("getFeatures() is not yet implemented.");
    }

    /**
     * This function produces an empty solution for the given problem instance.
     * <p>
     * <h2>Use cases</h2>
     * <p>
     * Empty solutions are typically used as initial solutions in constructive search.
     * <p>
     * Feature: constructive
     */
    public default Solution emptySolution() {
        if (this.getFeatures().contains("constructive")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function produces a feasible solution for the given problem instance or none if the
     *   underlying heuristic fails to generate such a solution.
     * <p>
     * <h2>Use cases</h2>
     * <p>
     * Heuristic solutions are often used as initial solutions in local search.
     * <p>
     * Feature: heuristic
     */
    public default Solution heuristicSolution() {
        if (this.getFeatures().contains("heuristic")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function samples the feasible decision space of the given problem instance uniformly at
     *   random (with replacement) and produces a feasible solution.
     * <p>
     * <h2>Use cases</h2>
     * Random solutions are often used as initial solutions in local search. The initial population
     *   of evolutionary algorithms typically consists of solutions generated at random.
     * <p>
     * Feature: heuristic
     */
    public default Solution randomSolution() {
        if (this.getFeatures().contains("heuristic")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function returns the construction neighbourhood structure of the given problem instance.
     *   In a constructive-search model of a combinatorial optimisation problem, the construction
     *   neighbourhood structure, or construction rule, specifies how partial solutions, including
     *   empty solutions, may be made progressively more complete until a complete solution is reached.
     * <p>
     * <h2>Use cases</h2>
     * <p>
     * A construction neighbourhood structure is required by all constructive search approaches,
     *   including but not limited to greedy construction and ruin and recreate.
     * <p>
     * Feature: constructive
     */
    public default Neighbourhood constructionNeighbourhood() {
        if (this.getFeatures().contains("constructive")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function returns the destruction neighbourhood structure of the given problem instance.
     *   In a constructive-search model of a combinatorial optimisation problem, the destruction
     *   neighbourhood structure, or destruction rule, dictates how complete or partial solutions
     *   may be made progressively less complete until an empty solution is reached.
     * <p>
     * <h2>Use cases</h2>
     * A destruction neighbourhood structure is required by some constructive search approaches, such
     *   as ruin and recreate.
     * <p>
     * Feature: destructive
     */
    public default Neighbourhood destructionNeighbourhood() {
        if (this.getFeatures().contains("destructive")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function returns the local neighbourhood structure of the given problem instance. In a
     *   local-search model of a combinatorial optimisation problem, the local neighbourhood
     *   structure specifies which feasible solutions, or neighbours, can be obtained from each
     *   feasible solution by means of a "small" modification. The notion of local optimum is
     *   intrinsically tied to the definition of such a neighbourhood.
     * <p>
     * <h2>Use cases</h2>
     * A local neighbourhood structure is required by all local search approaches, including but not
     *   limited to best-improvement, first-improvement and iterated local search, tabu search and
     *   evolutionary algorithms.
     * <p>
     * Feature: local
     */
    public default Neighbourhood localNeighbourhood() {
        if (this.getFeatures().contains("local")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }
}
