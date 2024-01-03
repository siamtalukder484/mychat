import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Login from "./pages/login/Login";
import Registraion from "./pages/registration/Registraion";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login/>}/>
        <Route path="/registration" element={<Registraion/>}/>
      </>
    )
  )

  return (
    <>
      <RouterProvider
      router={router}
      />
    </>
  )
}

export default App
