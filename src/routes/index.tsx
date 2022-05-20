import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData, UserContext } from "../App";

export default function Index() {
  const navigate = useNavigate();

  const { user } = useContext<ContextData>(UserContext);

  if (!user) navigate("/landingpage");

  return (
    <div>
      <h2>Index</h2>
    </div>
  );
}
