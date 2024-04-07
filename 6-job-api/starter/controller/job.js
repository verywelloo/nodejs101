const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

// The getAllJobs will show jobs that associate wiht the current user(createdBy).
const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ job, count: job.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req; // object destructuring

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId, // find a job with belong to us.
  });

  if (!job) {
    throw new NotFound(`No job id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({job})
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // The createdBy will point to the owner user. For make others user not to see, creat delete and update.
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequest("Company or Position fields cannot be empty");
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  ); // runValidtors for updating doc. It's copy the validatoion from old doc to the new updating one.
  if (!job) {
    throw new NotFound(`No job wiht id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // findByIdAndRemove same as findByIdAndDelete. findOneandDelete : (_id:id), findByIdAndDelete : (id). I quite not sure about code below.
  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if(!job) {
    throw new NotFound(`No job wiht id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
