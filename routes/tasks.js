//  const express = require("express")

// const Task = require("../models/Task")
// const auth = require("../middleware/auth")

// const router = express.Router()

// // Create a task
// router.post("/", auth, async (req, res) => {
//   try {
//     const task = new Task({
//       ...req.body,
//       user: req.user._id,
//     })
//     await task.save()
//     res.status(201).send(task)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// // Get all tasks for a user
// router.get("/", auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user._id }).sort({ order: 1 })
//     res.send(tasks)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

// // Get a specific task
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
//     if (!task) {
//       return res.status(404).send()
//     }
//     res.send(task)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

// // Update a task
// router.patch("/:id", auth, async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ["title", "description", "completed", "priority", "order"]
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" })
//   }

//   try {
//     const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
//     if (!task) {
//       return res.status(404).send()
//     }

//     updates.forEach((update) => (task[update] = req.body[update]))
//     await task.save()
//     res.send(task)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// // Update task order (for drag and drop)
// router.post("/reorder", auth, async (req, res) => {
//   try {
//     const { tasks } = req.body

//     // Use Promise.all to wait for all updates to complete
//     await Promise.all(
//       tasks.map((task) =>
//         Task.findOneAndUpdate({ _id: task.id, user: req.user._id }, { order: task.order }, { new: true }),
//       ),
//     )

//     res.send({ success: true })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// // Delete a task
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
//     if (!task) {
//       return res.status(404).send()
//     }
//     res.send(task)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

// module.exports = router




import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";
import cors from "cors";

const router = express.Router();

router.use(cors());
router.use(express.json());


// Create a task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ order: 1 });
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// Get a specific task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// Update a task
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed", "priority", "order"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update task order (for drag and drop)
router.post("/reorder", auth, async (req, res) => {
  try {
    const { tasks } = req.body;

    // Use Promise.all to wait for all updates to complete
    await Promise.all(
      tasks.map((task) =>
        Task.findOneAndUpdate({ _id: task.id, user: req.user._id }, { order: task.order }, { new: true })
      )
    );

    res.send({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
