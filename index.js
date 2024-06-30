import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadTasks, addTask, findTask, updateTask, deleteTask } from './utils/task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const tasks = loadTasks();
  res.render('index', { tasks });
});

app.get('/add', (req, res) => {
  res.render('add-task');
});

app.post('/add', (req, res) => {
  addTask(req.body);
  res.redirect('/');
});

app.get('/edit/:title', (req, res) => {
  const task = findTask(req.params.title);
  res.render('edit', { task });
});

app.post('/edit/:title', (req, res) => {
  updateTask(req.params.title, req.body);
  res.redirect('/');
});

app.get('/delete/:title', (req, res) => {
  deleteTask(req.params.title);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
