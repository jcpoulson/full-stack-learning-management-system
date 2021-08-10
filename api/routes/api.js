const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Middle Ware
const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/auth-user');


// Models
const User = require('../models').User
const Course = require('../models').Course


// root route
router.get('/', (req, res) => {
    res.send("Welcome to the API root route")
})


/* User Routes */


// Get Users Route
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser

    if (currentUser) {
        const user = await User.findByPk(currentUser.id);
            delete user.dataValues.createdAt;
            delete user.dataValues.updatedAt;
            delete user.dataValues.password;
        res.json(user)
        res.status(200).end()
    } else {
        res.status(401)
        res.json({
            "Error": "Access Denied"
        }).end()
    }
}))

// Create New User Route
router.post('/users', asyncHandler(async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        res.location('/')
        res.status(201).end()
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === "Error") {
            if (error.name === "Error") {
                error.message = "One or more required fields is missing"
            }
            res.json({ error: error.message });
            res.status(400);
          }
    }
}))


/* Course Routes */


// Get All Courses Route
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    courses.map(course => console.log(course));
    res.json(courses)
    res.status(200).end()
}))


// Get Specific Course Route
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);

    if (course === null) {
        res.json({
            "Error": "Course not found"
        })
    } else {
        delete course.dataValues.createdAt;
        delete course.dataValues.updatedAt;
        res.json(course);
        res.status(200).end()
    }
}))


// Create Course Route
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser;

    if (currentUser) {
        try {
            const newCourse = await Course.create({
                title: req.body.title,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                materialsNeeded: req.body.materialsNeeded,
                userId: currentUser.id
            })
            res.location(`/courses/${newCourse.id}`)
            res.status(201).end()
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => err.message);
                res.json({ errors });
                res.status(400);
              }
        }
    } else {
        res.status(401)
        res.json({
            "Error": "Access Denied"
        }).end()
    }
}))


// Update Course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser;

    if (currentUser) {
        try {
            const course = await Course.findByPk(req.params.id);
            course.title = req.body.title;
            course.description = req.body.description
            course.estimatedTime = req.body.estimatedTime
            course.materialsNeeded = req.body.materialsNeeded
            if (currentUser.id === course.userId) {
                await course.save()
                res.location(`/courses/${course.id}`)
                res.status(204).end()
            } else {
                // Only lets course owners edit their courses
                res.json({
                    "Error": "You are not allowed to edit this course"
                })
                res.status(403).end()
            }
            
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => err.message);
                res.json({ errors })
                res.status(400);
              }
        }
    } else {
        res.status(401)
        res.json({
            "Error": "Access Denied"
        }).end()
    }
}))


// Delete Course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser;

    if (currentUser) {
        const course = await Course.findByPk(req.params.id);
        course.destroy();
        res.status(204).end()
    } else {
        res.status(401)
        res.json({
            "Error": "Access Denied"
        }).end()
    }
}))

module.exports = router