import { useContext } from "react";
import { DashboardContext } from "../page";

type FilterButtonProps = {
  status: string;
};

export function FilterButton({ status }: FilterButtonProps) {
  const { selectedStatus, setSelectedStatus } = useContext(DashboardContext);

  const selected = status === selectedStatus;

  return (
    <button
      className={`filter-button ${selected ? "selected" : ""}`}
      onClick={() => setSelectedStatus(selected ? "" :status)}
    >
      {status}
    </button>
  );
}
