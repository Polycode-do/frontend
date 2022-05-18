import { useParams } from "react-router-dom";

export default function ExercisePlayground() {
  const { exerciseId } = useParams();

  return (
    <div>
      <h1>Exercise {exerciseId} playground</h1>
    </div>
  );
}
