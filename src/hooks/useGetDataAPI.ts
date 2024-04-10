import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../components/types";

export const useGetProductsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://fakestoreapi.com/products');
                setData(data);
            } catch (err: any) {
                setError(err.message ?? 'Failed to get data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        data, 
        isLoading,
        error
    }
};