import React from "react";
import Userfront from "@userfront/react";
import { useAuth } from "hooks/useAuth";
Userfront.init(process.env.GATSBY_USERFRONT_AUTH);
const LoginForm = Userfront.build({toolId: process.env.GATSBY_USERFRONT_AUTH_LOGIN_ID});
function App() {
  const { user } = useAuth();
  return <LoginForm />;
}

export default App;