import { FilterButton } from "./FilterButton";

const statuses = ["NOT STARTED", "IN PROGRESS", "COMPLETED"];

const Filter: React.FC = () => {
  return (
    <div className="filter">
      {statuses.map((status) => (
        <FilterButton key={status} status={status} />
      ))}
    </div>
  );
};

export default Filter;
