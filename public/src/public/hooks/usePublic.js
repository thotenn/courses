import { useContext } from "react"
import PublicContext from "../providers/PublicContext";

export default function usePublic(params) {
    return useContext(PublicContext);
}