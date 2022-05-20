import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData, UserContext } from "../../../App";

export default function ExercisePlayground() {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const { user } = useContext<ContextData>(UserContext);

  if (!user) navigate("/landingpage");

  return (
    <div>
      <h1>Exercise {exerciseId} playground</h1>
    </div>
  );
}
