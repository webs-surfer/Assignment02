import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../services/task.service.js";

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json({ success: true, message: "Task created successfully", data: newTask });
  } catch (error) { next(error); }
};

const getAllTasks = async (req, res, next) => {
  try {
    const result = await getAllTasksService(req.query);
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: result.tasks,
      meta: { total: result.total, limit: result.limit, offset: result.offset },
    });
  } catch (error) { next(error); }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdService(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task retrieved successfully", data: task });
  } catch (error) { next(error); }
};

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await updateTaskService(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task updated successfully", data: updatedTask });
  } catch (error) { next(error); }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await deleteTaskService(req.params.id);
    if (!deletedTask) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) { next(error); }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };