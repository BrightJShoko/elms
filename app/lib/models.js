import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniquie: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Leave" }],
  },
  { timestamps: true }
);

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    leaveType: {
      type: String,
      enum: [
        "Ordinary",
        "Unpaid",
        "Duty",
        "Special",
        "Compasionate",
        "Matenity",
        "CILL",
        "Study",
        "Time Off Incase of Overtime",
      ],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    approvedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export const Leave =
  mongoose.models.Leave || mongoose.model("Leave", leaveSchema);
