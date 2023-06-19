"use client"
import {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Table from "../components/Table";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { getAllTasks } from "./taskApiCalls";
//import CustomModal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import CustomModal from "../components/CustomModal";



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
  const {isOpen, openModal , closeModal} =useModal();

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


  const handleAddEditClick=()=>{

  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div>Dashboard</div>
        <button onClick={openModal}>Add Task</button>
        <Table rows={rows} columns={columns} />
        <CustomModal isOpen={isOpen} closeModal={closeModal} header="Task Modal">
        {/* Render your add/edit form here */}
        <button onClick={handleAddEditClick}>Add/Edit Task</button>
      </CustomModal>
      </div>
    </div>
  );
}

export default Dashboard;
