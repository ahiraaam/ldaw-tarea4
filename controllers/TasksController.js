const Task = require("../models/Task");

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log("Task created with id: ", id);
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect("/");
    }
  });
};

exports.changeStatus = (req, res) => {
  let taskId = req.params.id;
  console.log(taskId);
  Task.changeStatus(taskId).then((id) => {
    console.log("Task updated with id: ", taskId);
    res.redirect("/");
    /*if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      
    }*/
  });
};

exports.changeStatusAjax = (req, res) => {
  let id = req.body.id;
  console.log("taskid", id);
  Task.changeStatus(id).then((task) => {
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json({ id: id });
    } else {
      res.redirect("/");
    }
  });
};

exports.deleteTask = (req, res) => {
  let id = req.body.id;
  Task.delete(id).then((id) => {
    console.log("Task deleted with id: ", id);
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json(id);
    } else {
      res.redirect("/");
    }
  });
};
