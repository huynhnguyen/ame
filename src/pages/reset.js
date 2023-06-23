import React from "react";
import Userfront from "@userfront/react";

Userfront.init(process.env.GATSBY_USERFRONT_AUTH);

const PasswordResetForm = Userfront.build({
  toolId: process.env.GATSBY_USERFRONT_AUTH_RESET_ID
});

function App() {
  return <PasswordResetForm />;
}

export default App;