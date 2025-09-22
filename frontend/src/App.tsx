import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Routes/Home/Home"
import Login from "./Routes/Login/Login"
import PrivateRoute from "./Routes/PrivateRoute"
import SignUp from "./Routes/SignUp/SignUp"
import { ThemeProvider } from "./components/Theme-provider"


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <h1>Dashboard</h1>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
