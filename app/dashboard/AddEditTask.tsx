import { useForm } from "react-hook-form";
import { Task } from "./page";
import { Textbox } from "../components/form/TextBox";
import { saveTask } from "./taskApiCalls";

type AddEditTaskProps = {
  taskDetails: Task | null;
};

function AddEditTask({ taskDetails }: AddEditTaskProps) {
  const methods = useForm<Task>({
    defaultValues: taskDetails ?? {
      id: "",
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit =  handleSubmit((data:Task) => {
    saveTask(data);
  })

  return (
    <form onSubmit={onSubmit}>
      <Textbox
        id="title"
        type="text"
        label="Title"
        register={register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />
      <Textbox
        id="description"
        type="text"
        label="Description"
        register={register("description", { required: "Description is required" })}
        error={errors.description?.message}
      />
      <Textbox
        id="status"
        type="text"
        label="Status"
        register={register("status", { required: "Status is required" })}
        error={errors.status?.message}
      />
      <Textbox
        id="priority"
        type="text"
        label="Priority"
        register={register("priority", { required: "Priority is required" })}
        error={errors.priority?.message}
      />
      <button type="submit" className="button">
        Save
      </button>
    </form>
  );
}

export default AddEditTask;
