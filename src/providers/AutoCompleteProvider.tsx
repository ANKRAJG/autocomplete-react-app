import { ReactNode, createContext, useContext, useState } from "react";
import { useGetProductsList } from "../hooks/useGetProductsList";
import { Product } from "../components/types";

type ContextProps = {
    productsList: Product[];
    isLoading: boolean;
    hoveredIndex: number;
    updateHoverIndex: (key: string, searchedProductsLength: number) => void;
    setHoveredIndex: (val: number) => void;
}

const AutoCompleteContext = createContext<ContextProps>({
    productsList: [],
    isLoading: false,
    hoveredIndex: -1,
    updateHoverIndex: () => {},
    setHoveredIndex: () => {}
});

type WithChildren = {
    children: ReactNode;
}

export const AutoCompleteProvider = ({ children }: WithChildren) => {
    const { data: productsList, isLoading } = useGetProductsList();
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const updateHoverIndex = (key: string, searchedProductsLength: number) => {
        if(key === 'ArrowDown') {
            setHoveredIndex(prevIndex => (
                 prevIndex===searchedProductsLength-1 ? -1 : prevIndex+1
            ));
        } else if(key === 'ArrowUp') {
            setHoveredIndex(prevIndex => (
                prevIndex===-1 ? searchedProductsLength-1 : prevIndex-1
            ));
        }
    };

    return (
        <AutoCompleteContext.Provider value={{ productsList, isLoading, hoveredIndex, setHoveredIndex, updateHoverIndex }}>
            {children}
        </AutoCompleteContext.Provider>
    );
};

export const useAutoCompleteContext = () => {
    const context = useContext(AutoCompleteContext);

    if(context === undefined) {
        throw new Error("useAutoCompleteContext must be within AutoCompleteProvider");
    }

    return context;
}