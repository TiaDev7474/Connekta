import { Authcontext } from "../../../Context/AuthProvider"
const {  useContext } = require("react")

export const useAuthContext = () =>  useContext(Authcontext);

    

