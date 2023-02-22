import { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  //console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; STAR SNS {new Date().getFullYear()}</footer>
    </>
  );
}
export default App;
