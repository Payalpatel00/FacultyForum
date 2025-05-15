import '../Model/connection.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import url from 'url';
import sendMail from './email.controller.js';
import UserSchemaModel from '../Model/userModel.js';

export const save = async (req, res) => {
  var userList = await UserSchemaModel.find();
  var l = userList.length;
  var _id = l == 0 ? 1 : userList[l - 1]._id + 1;

  var userdetails = { ...req.body, "_id": _id, "role": "user", "status": 0, "info": Date() };
  try {
    var users = await UserSchemaModel.create(userdetails);
    sendMail(users.email, users.password);
    res.status(201).json({ "status": true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "status": false });
  }
};

export const login = async (req, res) => {
  var condition_obj = { ...req.body, "status": 1 };
  var userList = await UserSchemaModel.find(condition_obj);
  if (userList.length != 0) {
    const payload = { "subject": userList[0].email };
    const key = rs.generate();
    const token = jwt.sign(payload, key);
    res.status(200).json({ "token": token, "userlist": userList[0] });
  } else {
    res.status(500).json({ "token": "error" });
  }
};

export const fetch = async (req, res) => {
  var condition_obj = url.parse(req.url, true).query;
  var user = await UserSchemaModel.find(condition_obj);
  if (user.length != 0) {
    res.status(201).json(user);
  } else {
    res.status(404).json({ "msg": "resource not found" });
  }
};

export const update = async (req, res) => {
  var userDetail = await UserSchemaModel.findOne(req.body.condition_obj);
  if (userDetail) {
    var users = await UserSchemaModel.updateOne(req.body.condition_obj, { $set: (req.body.content_obj) });
    if (users) {
      res.status(200).json({ "msg": "data update successfully" });
    } else {
      res.status(500).json({ "msg": "error" });
    }
  } else {
    res.status(404).json({ "msg": "resource not found" });
  }
};

export const deleteUser = async (req, res) => {
  var userDetail = await UserSchemaModel.findOne(req.body.condition_obj);
  if (userDetail) {
    var users = await UserSchemaModel.deleteOne(req.body.condition_obj);
    if (users) {
      res.status(200).json({ "msg": "data deleted successfully" });
    } else {
      res.status(500).json({ "msg": "error" });
    }
  } else {
    res.status(404).json({ "msg": "resource not found" });
  }
};

// Get all faculty members (users with role: 'faculty')
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await UserSchemaModel.find({ role: 'faculty' }).select('name _id');
    res.status(200).json({ faculty });
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};