
import type { ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FavoritesContext } from "../hooks/useFavs";



export const FavoritesProvider: React.FC<{ children: ReactNode}> = ({children}) => {

    //Initialize state from localStorage
    const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);


    const addFavorite = (id: string) => {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id]);
        } 
    }

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((favId) => favId !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.includes(id);
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}    





