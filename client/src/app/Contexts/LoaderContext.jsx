import { createContext, useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../Components/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            {loading && (
                <Loader/>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
