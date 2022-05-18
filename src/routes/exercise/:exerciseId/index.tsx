import { useParams } from "react-router-dom";

export default function Exercise() {
  const { exerciseId } = useParams();

  return (
    <div>
      <h1>Exercise {exerciseId}</h1>
    </div>
  );
}
