import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Protectedroutes = ({children}) => {

    console.log("protected")
    //bhagwan haa ~-~
    const {user} = useSelector((store)=>store.user);

  if(!user){
    return <Navigate to='/landing'/>
  }
  return children;
}
export default Protectedroutes