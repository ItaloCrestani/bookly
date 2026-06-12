import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


interface PublicProps{
  children: ReactNode;
}

export function Private({ children }: PublicProps): any {
  const { signed, loadingAuth } = useContext(AuthContext)

  if(loadingAuth) {
    return null;
  }

  if(!signed) {
    toast.error("Usuário não logado")
    return <Navigate to="/login" replace/>
  }

  return children;

}