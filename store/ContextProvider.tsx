import {createContext, FC, ReactNode} from "react";

interface ContextType {
    sampleContextValue: number;
}

export const Context = createContext<ContextType | undefined>({
    sampleContextValue: 0,
});

interface Props {
    children: ReactNode;
}

export const ContextProvider: FC<Props> = ({children}) => {
    const value = {
        sampleContextValue: 1
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};