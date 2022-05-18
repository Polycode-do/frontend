import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/challenge/1">Challenge 1</Link>
      <Link to="/exercise/1/playground">Exercise 1 playground</Link>
    </nav>
  );
}
