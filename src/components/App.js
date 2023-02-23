import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 컴포넌트가 mount 될 때
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  return (
    <>
      { init ? 
      <AppRouter isLoggedIn={isLoggedIn} />
      : "Initializing..." }
      <footer>&copy; STAR SNS {new Date().getFullYear()}</footer>
    </>
  );
}
export default App;
