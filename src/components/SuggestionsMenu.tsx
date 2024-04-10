import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Product } from "./types";
import styles from "./SuggestionsMenu.module.css";
import { useCallback, useEffect } from "react";

type MenuProps = {
    products: Product[];
    hoveredIndex: number;
}

const SuggestionsMenu = ({ products, hoveredIndex }: MenuProps) => {
    const scrollActiveProductIntoView = useCallback(() => {
        const activeProduct = document.getElementById(`product-${hoveredIndex}`);
        if(activeProduct) {
            activeProduct.scrollIntoView({
                block: 'nearest', 
                inline: 'start', 
                behavior:'smooth'
            });
        }
    }, [hoveredIndex]);

    useEffect(() => {
        if(hoveredIndex !== -1) {
            scrollActiveProductIntoView();
        }
    }, [scrollActiveProductIntoView]);

    return (
        <List
            sx={{ border: '1px solid grey', maxHeight: '300px', overflowY: 'auto' }}
        >
            {products.map((p, index) => (
                <ListItemButton 
                    key={p.id}
                    sx={{ cursor: 'pointer' }}
                    className={index === hoveredIndex ? styles.hoverItem : ''}
                    id={`product-${index}`}
                >
                    <ListItemAvatar>
                        <Avatar src={p.image} />
                    </ListItemAvatar>
                    <ListItemText>{p.title}</ListItemText>
                </ListItemButton>
            ))}
        </List>
    );
};

export default SuggestionsMenu;