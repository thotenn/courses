import useAuth from "../../auth/useAuth";
import env from "../../env";
import { getFetchJsonDict } from "../server/ApiCommons";


export default class PublicController {
    constructor (isMounted=true) {
        this.auth = useAuth();
        this.isMounted = isMounted;
    }
}