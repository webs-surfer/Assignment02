import Task from "../models/Task.js";

const priorityRank = { high: 3, medium: 2, low: 1 };

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createTaskService = async (taskData) => {
  const newTask = new Task(taskData);
  await newTask.save();
  return newTask;
};

export const getAllTasksService = async (taskQuery) => {
  const allowedSortFields = [
    "dueDate",
    "createdAt",
    "updatedAt",
    "priority",
    "progress",
    "title",
    "category",
  ];
  const filter = {};
  const sortField = taskQuery.sort?.replace("-", "") || "dueDate";
  const sortDirection = taskQuery.sort?.startsWith("-") ? -1 : 1;
  const limit = Math.min(Math.max(Number(taskQuery.limit) || 10, 1), 500);
  const offset = Math.max(Number(taskQuery.offset) || 0, 0);
  if (taskQuery.search?.trim()) {
    const search = escapeRegex(taskQuery.search.trim());

    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (!allowedSortFields.includes(sortField)) {
    throw new Error(
      `Invalid sort field. Allowed fields are: ${allowedSortFields.join(", ")}`,
    );
  }

  if (taskQuery.status) filter.status = taskQuery.status;
  if (taskQuery.priority) filter.priority = taskQuery.priority;
  if (taskQuery.category)
    filter.category = new RegExp(
      `^${escapeRegex(taskQuery.category.trim())}$`,
      "i",
    );

  const total = await Task.countDocuments(filter);

  if (sortField === "priority") {
    const allTasks = await Task.find(filter);
    const sortedTasks = allTasks.sort((a, b) => {
      const aRank = priorityRank[a.priority] ?? 0;
      const bRank = priorityRank[b.priority] ?? 0;
      return (aRank - bRank) * sortDirection;
    });
    return {
      tasks: sortedTasks.slice(offset, offset + limit),
      total,
      limit,
      offset,
    };
  }

  const tasks = await Task.find(filter)
    .sort({ [sortField]: sortDirection, createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return { tasks, total, limit, offset };
};

export const getTaskByIdService = async (taskId) => {
  return await Task.findById(taskId);
};

export const updateTaskService = async (taskId, updatedData) => {
  return await Task.findByIdAndUpdate(taskId, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const deleteTaskService = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};
