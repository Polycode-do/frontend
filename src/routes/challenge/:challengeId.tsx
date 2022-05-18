import { Link, Outlet, useParams } from "react-router-dom";

export default function Challenge() {
  const { challengeId } = useParams();

  return (
    <div>
      <h1>Challenge {challengeId}</h1>
      <Link to={`/challenge/${challengeId}/exercise/1`}>Exercise 1</Link>
      <Outlet />
    </div>
  );
}
