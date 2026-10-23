# Introduction

The ROAR-NET API defines a framework for black-box optimisation problem modelling. It
  is based on abstractions aimed at unifying black-box optimisation problems, and on
  a clear separation between problem modelling and randomised optimisation algorithms.
  The resulting standardisation of black-box problem modelling leads to the following
  advantages: different optimisation algorithms can operate on the same problem model
  (e.g. branch-and-bound and local-search), and different optimisation problems (or
  models) can be solved by the same algorithms.</br>

<b>Conceptualisation</b>: the goal of this specification is to define a minimal,
   programming-language agnostic interface to the optimisation problems that a wide
   variety of Randomised Optimisation Algorithms (ROAs) can use to solve these problems.
   The specification defines the types and operations that have to be implemented when
   modelling an optimisation problem in order to allow supported ROAs to function.</br>

<b>Design principles</b>: it is agnostic of the programming language, it is agnostic
   of the programming paradigm, and implementations of the API are required to only
   store problem-specific information -- they must be completely free of any information
   about the optimisation algorithm to be used.\n\nSupported features: the API supports
   a broad range of problems and Randomised Optimisation Algorithms (ROAs). The current
   version of the specification covers, but is not limited to, single-objective
   combinatorial and discrete optimisation problems, and considers two main algorithmic
   approaches: constructive search, where solutions are constructed iteratively (e.g.
   backtracking, branch-and-bound, greedy algorithms, GRASP); and local search, where
   solutions are found by modifying feasible solutions (e.g. first/best improvement
   local search, iterated local search, simulated annealing).</br>

<b>Background -- Optimisation problem</b>: formally, this specification considers a
  (minimisation) problem in the form <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo>min</mo><mo stretchy="false">&#x0007B;</mo><mi>f</mi><mo stretchy="false">&#x00028;</mo><mi>x</mi><mo stretchy="false">&#x00029;</mo><mo>&#x02223;</mo><mi>x</mi><mo>&#x02208;</mo><mi>F</mi><mo stretchy="false">&#x0007D;</mo></mrow></math>.
  The set F is the set of feasible solutions, which is a subset of the decision space
  S. The mapping <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>f</mi><mi>:</mi><mi>S</mi><mo>&#x02192;</mo><mi>&#x0211D;</mi></mrow></math>
  is an objective function that associates to each solution s in S a real value in
  the objective space, R. The objective space is totally ordered, and the minimum is
  given by all solutions <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msup><mi>x</mi><mo>&#x0002A;</mo></msup><mo>&#x02208;</mo><mi>F</mi></mrow></math>
  such that <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>f</mi><mo stretchy="false">&#x00028;</mo><msup><mi>x</mi><mo>&#x0002A;</mo></msup><mo stretchy="false">&#x00029;</mo><mo>&#x02264;</mo><mi>f</mi><mo stretchy="false">&#x00028;</mo><mi>x</mi><mo stretchy="false">&#x00029;</mo></mrow></math>
  holds for all x in F. Such a solution x* is called an optimal solution. Maximisation
  problems, in which we are searching for the feasible solutions whose value is the
  maximum in the objective space, can be reduced to minimisation problems as
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo>max</mo><mo stretchy="false">&#x0007B;</mo><mi>f</mi><mo stretchy="false">&#x00028;</mo><mi>s</mi><mo stretchy="false">&#x00029;</mo><mo>&#x02223;</mo><mi>s</mi><mo>&#x02208;</mo><mi>F</mi><mo stretchy="false">&#x0007D;</mo><mo>&#x0003D;</mo><mo>&#x02212;</mo><mo>min</mo><mo stretchy="false">&#x0007B;</mo><mo>&#x02212;</mo><mi>f</mi><mo stretchy="false">&#x00028;</mo><mi>s</mi><mo stretchy="false">&#x00029;</mo><mo>&#x02223;</mo><mi>s</mi><mo>&#x02208;</mo><mi>F</mi><mo stretchy="false">&#x0007D;</mo></mrow></math>.
  Optimisation problems are specified by means of a Problem type.</br>

<b>Search space</b>: the representation and exploration of the search space of a
  problem rely on how solutions are characterised, generated and evaluated. The API
  assumes that the details regarding the components of a solution are not exposed,
  nor the details of how to create or modify a solution; instead, it provides
  abstract operations that allow generating and modifying solutions in a black-box
  manner, common to all algorithmic approaches covered. Constructive search algorithms
  work by starting from an initial state and sequentially applying actions or changes
  to it to attain new states until a goal is reached; local search algorithms work by
  maintaining a set of states and iterating through states reachable by applying small
  changes to the stored states. In both cases such states represent candidate solutions.
  The change that transforms a solution s into a neighbouring solution s\' is called a
  move. A candidate solution is an element of the decision space that is not necessarily
  feasible; it may be a partial solution, not yet containing all components of a feasible
  solution, or a complete solution, containing all components but possibly violating
   problem constraints and not necessarily optimal. Solutions are specified by means of a
   Solution type.<br>

<b>Neighbourhoods</b>: the exploration of the search space relies on the concept of
  neighbourhood structure. A neighbourhood structure is given by a neighbouring relation
  between solutions: <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>N</mi><mo stretchy="false">&#x00028;</mo><mi>s</mi><mo>&#x0002C;</mo><msup><mi>s</mi><mi>&#x02032;</mi></msup><mo stretchy="false">&#x00029;</mo></mrow></math>
  is a boolean indicating whether s\' can be obtained from s by applying a move. The set
  of solutions reachable this way from s forms the neighbourhood set N(s) of s, <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>N</mi><mo stretchy="false">&#x00028;</mo><mi>s</mi><mo stretchy="false">&#x00029;</mo><mo>&#x02286;</mo><mi>S</mi></mrow></math>.
  Neighbourhood structures can be defined for both complete and partial solutions. The
  neighbourhood structure is specified by means of a Move type and a Neighbourhood type,
  the latter implementing the generation of moves.\n\nSolution evaluation: the
  specification provides operations to query the feasibility and the objective value of
  candidate solutions. A black-box scenario is assumed: even if a mathematical
  description of the decision space is known, the feasibility and objective value of
  candidate solutions are assessed in an oracle manner, without exposing how these
  assessments have been computed. In ROAs the objective function is frequently replaced
  by an evaluation function that can account for the objective function but also for
  penalties due to violation of problem constraints.</br>

<b>Source</b>: ROAR-NET API Specification, https://github.com/roar-net/roar-net-api-spec.
  This specification is based upon work from COST Action Randomised Optimisation
  Algorithms Research Network (ROAR-NET), CA22137, supported by COST (European
  Cooperation in Science and Technology).
