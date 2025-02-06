import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Product } from "./types";
import SuggestionsMenu from "./SuggestionsMenu";
import { useAutoCompleteContext } from "../providers/AutoCompleteProvider";

const AutoCompleteSearchBar = () => {
    const { productsList, isLoading, hoveredIndex, setHoveredIndex, updateHoverIndex } = useAutoCompleteContext();
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [searchedText, setSearchedText] = useState<string>('');

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
                console.log("Called");
            }
        }, 250);

        return () => clearTimeout(debounceTimer);
    }, [searchedText, productsList]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        updateHoverIndex(event.key, searchedProducts.length);
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