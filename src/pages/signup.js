import React from "react";
import Userfront from "@userfront/react";

Userfront.init(process.env.GATSBY_USERFRONT_AUTH);
const SignupForm = Userfront.build({toolId: process.env.GATSBY_USERFRONT_AUTH_SIGNUP_ID});

function App() {
  return <SignupForm />;
}

export default App;