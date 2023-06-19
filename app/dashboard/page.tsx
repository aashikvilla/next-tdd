"use client"
import {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Table from "../components/Table";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { getAllTasks } from "./taskApiCalls";



export type Task = {
  id: string,
  title: string,
  description: string,
  status: string,
  priority: string 
}


export const TaskColumns: GridColDef[] = [
  { field: "id", headerName: "Id"},
  { field: "title", headerName: "Title"},
  { field: "description", headerName: "Description" },
  { field: "status", headerName: "Status" },
  { field: "priority", headerName: "Priority"},
  {
    field: "ss",
    headerName: "Action",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams) => (
      <>
      {params.row.id}
        <button>Edit</button>
        <button>Delete</button>
      </>
    ),
  },
];



function Dashboard() {

  const columns = TaskColumns;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        console.log(data);
        setRows(data);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.error(error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div>Dashboard</div>
        <Table rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Dashboard;
