import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

import Task from "../src/models/Task.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const statuses = ["pending", "in-progress", "completed"];
const priorities = ["low", "medium", "high"];

const tasks = [];

for (let i = 0; i < 100; i++) {
  tasks.push({
    title: faker.company.buzzPhrase(),
    description: faker.lorem.sentences(2),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    dueDate: faker.date.soon({ days: 30 }),
  });
}

await Task.deleteMany();

await Task.insertMany(tasks);

console.log("✅ 100 Tasks Seeded");

await mongoose.disconnect();