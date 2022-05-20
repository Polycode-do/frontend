import { Link, Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData, UserContext } from "../../App";

export default function Challenge() {
  const { challengeId } = useParams();

  const navigate = useNavigate();

  const { user } = useContext<ContextData>(UserContext);

  if (!user) navigate("/landingpage");

  return (
    <div>
      <h1>Challenge {challengeId}</h1>
      <Link to={`/challenge/${challengeId}/exercise/1`}>Exercise 1</Link>
      <Outlet />
    </div>
  );
}
