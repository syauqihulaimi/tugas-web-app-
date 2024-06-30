import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/task.json');

export const loadTasks = () => {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]');
  }
  const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
  const tasks = JSON.parse(fileBuffer);
  return tasks;
};

export const saveTasks = (tasks) => {
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
};

export const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const findTask = (title) => {
  const tasks = loadTasks();
  return tasks.find(task => task.title === title);
};

export const updateTask = (title, newTask) => {
  const tasks = loadTasks();
  const index = tasks.findIndex(task => task.title === title);
  tasks[index] = { ...tasks[index], ...newTask };
  saveTasks(tasks);
};

export const deleteTask = (title) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(task => task.title !== title);
  saveTasks(filteredTasks);
};
