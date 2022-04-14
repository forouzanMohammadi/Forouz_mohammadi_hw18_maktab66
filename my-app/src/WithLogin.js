import { useContext} from "react";
import { Button } from "react-bootstrap";
import { Authentication } from "./components/Authentication";

const WithLogin = (Component) => {
  return function WithLoginComponent({ ...props }) {
    const { user, setUser, islogin, setIslogin } = useContext(Authentication);
    const handleLogOut = () => {
      setUser("");
      setIslogin(false);
    };

    return (
      <>
        {islogin ? (
          <>
            <h1>Hello {user.firstName}</h1>
            <Button className="btn btn-success w-100 mt-3" onClick={handleLogOut }>log out</Button>
            
          </>
        ) : (
          <Component
            user={user}
            setUser={setUser}
            isLogin={islogin}
            setIslogin={setIslogin}
          />
        )}
      </>
    );
  };
};
export default WithLogin;
