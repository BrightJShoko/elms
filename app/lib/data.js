import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Employee, Leave } from "./models";
import { connectToDB } from "./utils";
const SECRET_KEY = process.env.JWT_SECRET || "mysupersecretkey";

export async function fetchPendingLeavesNav(q, page) {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  try {
    await connectToDB();
    const pendingLeaves = await Leave.find({
      status: "pending",
      leaveType: { $regex: regex },
    })
      .populate("employeeId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return JSON.parse(
      JSON.stringify({ count: pendingLeaves.length, leaves: pendingLeaves })
    );
  } catch (error) {
    console.error("Error fetching  leaves:", error);
    return { count: 0, leaves: [] };
  }
}

export async function fetchExpiredLeaves(q, page) {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  try {
    const today = new Date(); // Get today's date
    await connectToDB();
    const expiredLeaves = await Leave.find({
      endDate: { $lt: today },
      leaveType: { $regex: regex },
    })
      .populate("employeeId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return JSON.parse(
      JSON.stringify({ count: expiredLeaves.length, expired: expiredLeaves })
    );
  } catch (error) {
    console.error("Error fetching expired leaves:", error);
    return { count: 0, expired: [] };
  }
}

export async function fetchPendingLeaves(q, page) {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  try {
    await connectToDB();
    const pendingLeaves = await Leave.find({
      status: "pending",
      leaveType: { $regex: regex },
    })
      .populate("employeeId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return {
      count: pendingLeaves.length,
      leaves: pendingLeaves,
    };
  } catch (error) {
    console.error("Error fetching pending leaves:", error);
    return { count: 0, leaves: [] };
  }
}

export const fetchAllEmployeeLeaves = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  try {
    connectToDB();
    const count = await Leave.find({
      leaveType: { $regex: regex },
    }).countDocuments();

    const leaves = await Leave.find({
      leaveType: { $regex: regex },
    })
      .populate({ path: "employeeId", select: "firstname lastname code " })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return { count, leaves };
  } catch (error) {
    console.log("Error fetching leaves:", error);
    throw new Error("Failed to fetch employee leaves");
  }
};

export const fetchEmployeeLeaves = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 6;
  try {
    connectToDB();
    const cookieStore = await cookies();
    const employeToken = cookieStore.get("employeeauthtoken")?.value;

    if (!employeToken) {
      return { error: "Unauthorized. Please log in." };
    }
    const decoded = jwt.verify(employeToken, SECRET_KEY);
    const employeeId = decoded.id;

    const count = await Leave.find({
      employeeId,
      leaveType: { $regex: regex },
    }).countDocuments();

    const leaves = await Leave.find({
      employeeId,
      leaveType: { $regex: regex },
    })
      .populate({ path: "employeeId", select: "firstname lastname code " })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return { count, leaves };
  } catch (error) {
    console.log("Error fetching leaves:", error);
    throw new Error("Failed to fetch employee leaves");
  }
};

export const fetchEmployees = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    connectToDB();
    const count = await Employee.find({
      firstname: { $regex: regex },
    }).countDocuments();

    const employees = await Employee.find({ firstname: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    return { count, employees };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch employees");
  }
};

export const fetchEmployee = async (id) => {
  try {
    connectToDB();
    const employee = await Employee.findById(id);
    return employee;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch employee");
  }
};
