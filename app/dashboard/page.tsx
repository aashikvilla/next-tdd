"use client";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Table from "../components/Table";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllTasks } from "./taskApiCalls";
import { useModal } from "../hooks/useModal";
import CustomModal from "../components/CustomModal";
import AddEditTask from "./AddEditTask";
import Filter from "./filter/Filter";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

type DashboardContextType = {
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};
const defaultDashboardContextValue: DashboardContextType = {
  selectedStatus: "",
  setSelectedStatus: () => {}, // Empty function, you might want to provide an actual implementation
};
export const DashboardContext = createContext<DashboardContextType>(
  defaultDashboardContextValue
);

function Dashboard() {
  const TaskColumns: GridColDef[] = [
    { field: "id", headerName: "Id" },
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    { field: "status", headerName: "Status" },
    { field: "priority", headerName: "Priority" },
    {
      field: "ss",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {params.row.id}
          <button onClick={() => handleEdit(params.row)}>Edit</button>
          <button>Delete</button>
        </>
      ),
    },
  ];

  const columns = TaskColumns;

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [rows, setRows] = useState<Task[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        //console.log(data);
        setRows(data);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.error(error);
      });
  }, []);

  const handleEdit = (data: Task) => {
    setTaskDetails(data);
    openModal();
  };

  return (
    <DashboardContext.Provider value={{ selectedStatus, setSelectedStatus }}>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div>Dashboard</div>
          <Filter />
          <div style={{display:'flex', justifyContent:'right', padding:'10px'}}>
          <button className="button"
            onClick={() => {
              setTaskDetails(null);
              openModal();
            }}
          >
            Add Task
          </button>

          </div>
         
          <Table rows={rows.filter(r=>r.status.includes(selectedStatus))} columns={columns} />
          <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            header="Task Modal"
          >
            <AddEditTask taskDetails={taskDetails} />
          </CustomModal>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
