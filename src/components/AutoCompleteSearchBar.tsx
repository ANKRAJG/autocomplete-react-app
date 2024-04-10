import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useGetProductsList } from "../hooks/useGetDataAPI";
import { Product } from "./types";
import SuggestionsMenu from "./SuggestionsMenu";

const AutoCompleteSearchBar = () => {
    const { data: productsList, isLoading } = useGetProductsList();
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [searchedText, setSearchedText] = useState<string>('');
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedText(event.target.value);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if(searchedText) {
                const filteredProducts = productsList.filter(p => p.title.toLowerCase().includes(searchedText.toLowerCase()));
                setSearchedProducts(filteredProducts);
                console.log('filteredProducts', filteredProducts);
                setHoveredIndex(-1);
            }
        }, 250);

        return () => clearTimeout(debounceTimer);
    }, [searchedText, productsList]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'ArrowDown') {
            setHoveredIndex(prevIndex => (
                 prevIndex===searchedProducts.length-1 ? -1 : prevIndex+1
            ));
        } else if(event.key === 'ArrowUp') {
            setHoveredIndex(prevIndex => (
                prevIndex===-1 ? searchedProducts.length-1 : prevIndex-1
            ));
        }
        console.log(hoveredIndex);
    };

    return (
        <Grid container my={12}>
            <Grid item sm={12} my={2} mx={60}>
                <Box>
                    <TextField 
                        type="text" 
                        fullWidth 
                        placeholder="Search Products" 
                        label="Search Products" 
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                    />
                </Box>
                {searchedText !== '' && searchedProducts.length>0 && 
                    <SuggestionsMenu products={searchedProducts} hoveredIndex={hoveredIndex} />}
            </Grid>
        </Grid>
    );
};

export default AutoCompleteSearchBar;