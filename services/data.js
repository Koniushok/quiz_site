const { User } = require("./models/user");
const { Test } = require("./models/test");
const { Task } = require("./models/task");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");

const user = new User({
  login: "maindata",
  name: "maindata",
  email: "maindata@gmail.com",
  password: "maindata",
  surname: "maindata"
});
const tasks = [
  new Task({
    question: "В какую из этих игр играют не клюшкой?",
    answer1: "Хоккей",
    answer2: "Гольф",
    answer3: "Поло",
    answer4: "Бильярд",
    correctAnswer: "4"
  }),
  new Task({
    question: "Кто первым доказал периодичность появления комет?",
    answer1: "Галилей",
    answer2: "Коперник",
    answer3: "Галлей",
    answer4: "Кеплер",
    correctAnswer: "3"
  }),
  new Task({
    question: "Как называется комедия В. В. Маяковского?",
    answer1: "Пена",
    answer2: "Жук",
    answer3: "Паук",
    answer4: "Клоп",
    correctAnswer: "4"
  }),
  new Task({
    question: "Кто считается основоположником кубизма?",
    answer1: "В. Кандинский",
    answer2: "Ф. Леже",
    answer3: "П. Пикассо",
    answer4: "К. Малевич",
    correctAnswer: "3"
  }),
  new Task({
    question: "Какая из этих кислот является витамином?",
    answer1: "Молочная",
    answer2: "Никотиновая",
    answer3: "Яблочная",
    answer4: "Янтарная",
    correctAnswer: "2"
  })
];

const test = new Test({ tasks: tasks, name: "Main Test" });
const connect = async () => {
  await mongoose
    .connect(config.get("db"))
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB"));

  Save(user, test);
};
connect();

async function Save(user, test) {
  tasks.map(async task => {
    await task.save();
  });
  await test.save();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.tests = [test._id];
  await user.save();
  console.log("DATA SAVE");
}
