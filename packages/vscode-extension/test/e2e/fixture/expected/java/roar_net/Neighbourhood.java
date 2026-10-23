package roar_net;

import java.util.Optional;
import java.util.stream.Stream;

public interface Neighbourhood {

    /**
     * This function provides for the complete enumeration of the neighbours of a given solution by
     *   producing a sequence of moves in unspecified order.
     * <p>
     * <h2>Pre-requisites</h2>
     * Both the given neighbourhood structure and the given solution must pertain to the same
     *   problem instance.
     * <p>
     * <h2>Use cases</h2>
     * Move enumeration is appropriate when the optimisation algorithm performs a full exploration of
     *   the set of neighbours of a solution before deciding how to proceed. In this case,
     *   enumeration order is irrelevant to the algorithm.
     * <p>
     * Greedy construction with random tie breaking and best-improvement local search are examples of
     *   algorithms where the whole set of neighbours is explored before the next move is accepted
     *   or the algorithm stops.
     * <p>
     * Feature: enumerable
     */
    public default Stream<Move> moves(final Solution solution) {
        if (getProblem().getFeatures().contains("enumerable")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * This function provides for the random sampling of the neighbours of a given solution by
     *   producing a move drawn uniformly at random from the set of possible moves for that solution
     *   under the given neighbourhood structure or none if no such moves exist.
     * <p>
     * <h2>Pre-requisites</h2>
     * Both the given neighbourhood structure and the given solution must pertain to the same problem
     *   instance.
     * <p>
     * <h2>Use cases</h2>
     * Sampling moves uniformly at random is appropriate when only a partial exploration of the set of
     *   neighbours of a solution is performed by the optimisation algorithm. In this case, complete
     *   exploration of that set is neither expected nor detected.
     * <p>
     * Randomised local search (RLS) and most evolutionary algorithms are examples of algorithms
     *   where a single move for each solution is typically generated at random and immediately
     *   applied.
     * <p>
     * Provided by every implementation.
     */
    public default Optional<Move> randomMove(final Solution solution) {
        throw new NotImplementedException("This function is not yet implemented.");
    }

    /**
     * This function provides for the complete enumeration of the neighbours of a given solution
     *   by producing a sequence of moves in random order.
     * <p>
     * <h2>Pre-requisites</h2>
     * Both the given neighbourhood structure and the given solution must pertain to the same
     *   problem instance.
     * <p>
     * <h2>Use cases</h2>
     * Sampling at random without replacement is appropriate when the optimisation algorithm explores
     *   the set of neighbours of a solution sequentially and may decide to stop the exploration and
     *   proceed some other way after seeing each move. In this case, the order in which moves are
     *   presented may influence how long such a partial exploration takes. Sampling at random
     *   without replacement avoids the bias inherent to deterministic enumeration, while still
     *   allowing completion of the exploration to be detected.
     * <p>
     * First-improvement local search is an example of an algorithm where moves are typically
     *   accepted before the whole set of neighbours is explored, but complete exploration is still
     *   performed in case no improving move is found.
     * <p>
     * Feature: enumerable
     */
    public default Stream<Move> randomMovesWithoutReplacement(final Solution solution) {
        if (getProblem().getFeatures().contains("enumerable")) {
            throw new NotImplementedException("This function should be supported by this problem instance, but is not yet implemented.");
        } else {
            throw new UnsupportedOperationException("This function is not supported by this problem instance.");
        }
    }

    /**
     * Returns the Problem the Neighbourhood was created for.
     * <p>
     * Provided by every implementation.
     */
    public default Problem getProblem() {
        throw new NotImplementedException("This function is not yet implemented.");
    }
}
