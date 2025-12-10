import type { ReactNode } from "react";
import { useParams } from "react-router";

export default function Segment(): ReactNode {
  const segmentId: string = useParams().segmentId || "";

  return <div>{segmentId}</div>;
}
