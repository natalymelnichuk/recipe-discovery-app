
import { useContext, createContext } from "react";

export interface FavoritesContextType {
    favorites: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavs() {
    const context = useContext(FavoritesContext);
    

    if (!context) {
        throw new Error("useFavs must be used within a FavoritesProvider");
    }
    
    return context;
}