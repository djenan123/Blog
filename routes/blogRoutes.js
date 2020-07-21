const express = require("express");
const blogController = require("../controllers/blogController");
const { model } = require("mongoose");

const router = new express.Router();

router.get("/create", blogController.blog_create_get);
router.get("/", blogController.blog_index);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);
router.post("/", blogController.blog_create_post);

module.exports = router;
