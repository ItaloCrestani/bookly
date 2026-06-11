import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";


interface PublicProps{
  children: ReactNode;
}

export function Public({ children }: PublicProps): any {
  const { signed, loadingAuth } = useContext(AuthContext)

  if(loadingAuth) {
    return null
  }

  if(signed) {
    return <Navigate to="/" replace/>
  }

  return children;

}