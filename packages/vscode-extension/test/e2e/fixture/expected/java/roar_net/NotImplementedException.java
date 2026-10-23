package roar_net;

/**
 * Thrown by an operation that the problem instance has to provide, but whose
 * implementation is still missing.
 */
public class NotImplementedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NotImplementedException(final String message) {
        super(message);
    }
}
