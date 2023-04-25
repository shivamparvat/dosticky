import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VarifyEmailAddress } from "../../redux/actions/user";
import { AlertContext } from "../../component/alert/AlertProvider";

function Varifyemail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Alert = useContext(AlertContext);


  const user = useSelector(state=>state.user)
  const {token} = useParams()
  useEffect(() => {
    dispatch(VarifyEmailAddress(token))
  }, [dispatch])
  
  
  useEffect(() => {
    dispatch(VarifyEmailAddress(token))
  }, [dispatch])
  
  useEffect(() => {
    if(user?.isAuthenticated)navigate("/");
    Alert.setError({ error: "success", msg: "email verifyed" });
  }, [user?.isAuthenticated])
  
  return (
    <div>
      {user.isAuthenticated?<Link to="/"><div className="button">Go back to home</div></Link>:<>somthing is wrong</>}
      
    </div>
  )
}

export default Varifyemail