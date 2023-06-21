import React from "react";
import Userfront from "@userfront/react";

Userfront.init("7n8j878n");

const LoginForm = Userfront.build({
  toolId: "mlnabnd"
});

function App() {
  return <LoginForm />;
}

export default App;