import { useContext } from "react";
// Bddel had l'import bach i-pointer 3la l'dossier s7i7
import { AuthContext } from "../contexts/AuthContext"; 

export const useAuth = () => useContext(AuthContext);