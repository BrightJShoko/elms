"use server";
import { revalidatePath } from "next/cache";
import { Admin, Employee, Leave } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysupersecretkey";

export const fetchAdminLeaveStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminauthtoken")?.value;
  if (!token) {
    return { error: "Unauthorized. Please log in." };
  }

  try {
    connectToDB();

    const totalLeaves = await Leave.countDocuments();
    const approvedLeaves = await Leave.countDocuments({ status: "approved" });
    const pendingLeaves = await Leave.countDocuments({ status: "pending" });
    const declinedLeaves = await Leave.countDocuments({ status: "declined" });

    return { totalLeaves, approvedLeaves, pendingLeaves, declinedLeaves };
  } catch (error) {
    console.error("Error fetching admin leave stats:", error);
    return {
      totalLeaves: 0,
      approvedLeaves: 0,
      pendingLeaves: 0,
      declinedLeaves: 0,
    };
  }
};

export const fetchEmployeeLeaveStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("employeeauthtoken")?.value;
  if (!token) {
    return { error: "Unauthorized. Please log in." };
  }

  try {
    connectToDB();
    const decoded = jwt.verify(token, SECRET_KEY);
    const employeeId = decoded.id;

    const totalLeaves = await Leave.countDocuments({ employeeId });
    const approvedLeaves = await Leave.countDocuments({
      employeeId,
      status: "approved",
    });
    const pendingLeaves = await Leave.countDocuments({
      employeeId,
      status: "pending",
    });
    const declinedLeaves = await Leave.countDocuments({
      employeeId,
      status: "declined",
    });

    return { totalLeaves, approvedLeaves, pendingLeaves, declinedLeaves };
  } catch (error) {
    console.error("Error fetching employee leave stats:", error);
    return {
      totalLeaves: 0,
      approvedLeaves: 0,
      pendingLeaves: 0,
      declinedLeaves: 0,
    };
  }
};

export async function updateLeaveStatus(leaveId, newStatus) {
  // Get admin token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("adminauthtoken")?.value;
  if (!token) {
    return { error: "Unauthorized. Please log in." };
  }

  try {
    connectToDB();
    const decoded = jwt.verify(token, SECRET_KEY);
    const adminId = decoded.id;

    // Find admin details
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return { error: "Admin not found." };
    }

    // Find leave request and update status
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return { error: "Leave request not found." };
    }

    leave.status = newStatus;
    leave.approvedBy = `${admin.firstname} ${admin.lastname}`; // Store the full name of the admin
    await leave.save();

    return { success: `Leave request ${newStatus} by ${admin.firstname}.` };
  } catch (error) {
    console.error("Error updating leave status:", error.message);
    return { error: "Failed to update leave status." };
  }
}

export async function fetchForCalender() {
  try {
    connectToDB();
    // Fetch leaves with employee details
    const leaves = await Leave.find({ status: "approved" })
      .populate("employeeId", "firstname lastname department") // Populate only necessary fields
      .select("employeeId leaveType startDate endDate reason status") // Select required fields
      .lean(); // Convert Mongoose documents to plain JS objects

    return JSON.parse(JSON.stringify(leaves));
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return { error: "Failed to fetch leaves" };
  }
}

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminauthtoken")?.value;
  const employeToken = cookieStore.get("employeeauthtoken")?.value;

  if (!adminToken && !employeToken) {
    return null;
  }

  try {
    let decoded, user;

    if (adminToken) {
      decoded = jwt.verify(adminToken, SECRET_KEY);
      user = await Admin.findById(decoded.id).select("firstname");
    } else if (employeToken) {
      decoded = jwt.verify(employeToken, SECRET_KEY);
      user = await Employee.findById(decoded.id).select("firstname");
    }
    return user ? { name: user.firstname || `${user.firstname} ` } : null;
  } catch (error) {
    console.error("Error fetching logged-in user:", error.message);
    return null;
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("adminauthtoken");
  redirect("/adminlogin");
}

export async function employeeLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("employeeauthtoken");
  redirect("/employeelogin");
}

export const changeEmployeepass = async (formData) => {
  const { code, current, newpassword, confirm } = Object.fromEntries(formData);

  try {
    connectToDB();
    if (newpassword !== confirm) {
      return { error: "New password and confirm password do not match" };
    }

    const emp = await Employee.findOne({ code });
    if (!emp) {
      return { error: "Employee not found" };
    }

    const isMatch = await bcrypt.compare(current, emp.password);
    if (!isMatch) {
      return { error: "Old password is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    emp.password = hashedPassword;
    await emp.save();

    return {
      success: "Password updated successfully",
      redirectTo: "/employeedashboard",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, please try again" };
  }
};

export const changeAdminpass = async (formData) => {
  const { username, current, newpassword, confirm } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    if (newpassword !== confirm) {
      return { error: "New password and confirm password do not match" };
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return { error: "Admin not found" };
    }

    const isMatch = await bcrypt.compare(current, admin.password);
    if (!isMatch) {
      return { error: "Old password is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    admin.password = hashedPassword;
    await admin.save();

    return {
      success: "Password updated successfully",
      redirectTo: "/admindashboard",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, please try again" };
  }
};

export const employeeSignin = async (formData) => {
  const { password, code } = Object.fromEntries(formData);

  try {
    connectToDB();
    const cookieStore = await cookies();
    const empl = await Employee.findOne({ code });
    if (!empl) return { error: "Employee not found" };

    const isMatch = await bcrypt.compare(password, empl.password);
    if (!isMatch) return { error: "Password missmatched" };
    const token = jwt.sign({ id: empl.id }, SECRET_KEY, { expiresIn: "25h" });
    cookieStore.set("employeeauthtoken", token, { httpOnly: true });
    return { success: true, redirectTo: "/employeedashboard" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, please try again" };
  }
};

export const adminSignin = async (formData) => {
  const { password, username } = Object.fromEntries(formData);

  try {
    connectToDB();
    const cookieStore = await cookies();
    const admin = await Admin.findOne({ username });
    if (!admin) return { error: "Invalid username or password" };

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return { error: "Invalid username or password" };
    const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: "24h" });
    cookieStore.set("adminauthtoken", token, { httpOnly: true });
    return { success: true, redirectTo: "/admindashboard" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong, please try again" };
  }
};

export const adminSignup = async (formData) => {
  const { firstname, lastname, password, email, username } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) throw new Error("Admin alredy exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      firstname,
      lastname,
      password: hashedPassword,
      email,
      username,
    });
    await newAdmin.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Register admin");
  }

  redirect("/adminlogin");
};

export async function applyLeave(formData) {
  const cookieStore = await cookies();
  const employeToken = cookieStore.get("employeeauthtoken")?.value;

  if (!employeToken) {
    return { error: "Unauthorized. Please log in." };
  }

  try {
    connectToDB();
    const decoded = jwt.verify(employeToken, SECRET_KEY);
    const employeeId = decoded.id;

    const newLeave = new Leave({
      employeeId,
      leaveType: formData.leaveType,
      startDate: new Date(formData.startDate), // Ensure correct date format
      endDate: new Date(formData.endDate), // Ensure correct date format
      reason: formData.reason,
      status: "pending",
    });

    await newLeave.save();
    return { success: "Leave request submitted successfully!" };
  } catch (error) {
    console.error("Error applying for leave:", error.message);
    return { error: "Failed to submit leave request." };
  }
}

export const addEmployee = async (formData) => {
  const {
    firstname,
    lastname,
    password,
    email,
    dob,
    gender,
    department,
    address,
    code,
    mobile,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newEmployee = new Employee({
      firstname,
      lastname,
      password: hashedPassword,
      email,
      dob,
      gender,
      department,
      address,
      code,
      mobile,
    });
    await newEmployee.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create new Employee");
  }
  revalidatePath("/admindashboard/employees");
  redirect("/admindashboard/employees");
};

export const deleteEmployee = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Employee.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete employee");
  }
  revalidatePath("/admindashboard/employees");
};

export const updateEmployee = async (formData) => {
  const {
    id,
    firstname,
    lastname,
    email,
    password,
    dob,
    gender,
    department,
    address,
    code,
    mobile,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateFields = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      dob,
      gender,
      department,
      address,
      code,
      mobile,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Employee.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update new Employee");
  }
  revalidatePath("/admindashboard/employees");
  redirect("/admindashboard/employees");
};
