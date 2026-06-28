import api from "@/api/axios";

const TASK_ENDPOINT = "/task";

const normalizeTask = (task) => ({
  ...task,
  id: task._id ?? task.id,
  category: task.category || "General",
  dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
  progress:
    task.progress ??
    (task.status === "completed"
      ? 100
      : task.status === "in-progress"
        ? 50
        : 0),
});

const unwrapTask = (response) => normalizeTask(response.data.data);
const unwrapTasks = (response) => ({
  tasks: response.data.data.map(normalizeTask),
  total: response.data.meta?.total ?? response.data.data.length,
  limit: response.data.meta?.limit ?? response.data.data.length,
  offset: response.data.meta?.offset ?? 0,
});

export const getTaskErrorMessage = (
  error,
  fallback = "Something went wrong.",
) => {
  if (error.code === "ERR_NETWORK") {
    return "Cannot connect to the server. Start the backend on port 5000 and try again.";
  }

  const validationMessage = error.response?.data?.errors?.[0]?.msg;
  return validationMessage ?? error.response?.data?.message ?? fallback;
};

export const getAllTasks = async (params) => {
  const response = await api.get(TASK_ENDPOINT, { params: { ...params, limit: 500 } });
  return unwrapTasks(response);
};

// For task page — uses pagination
export const getTasks = async (params) => {
  const response = await api.get(TASK_ENDPOINT, { params });
  return unwrapTasks(response);
};
export const createTask = async (task) => {
  const response = await api.post(TASK_ENDPOINT, task);
  return unwrapTask(response);
};

export const updateTask = async (id, task) => {
  const response = await api.put(`${TASK_ENDPOINT}/${id}`, task);
  return unwrapTask(response);
};

export const deleteTask = async (id) => {
  await api.delete(`${TASK_ENDPOINT}/${id}`);
  return id;
};
