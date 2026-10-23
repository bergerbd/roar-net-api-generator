package roar_net;

public interface API {

    /**
     * Provided by every implementation.
     */
    public default Problem create() {
        throw new NotImplementedException("This function is not yet implemented.");
    }
}
