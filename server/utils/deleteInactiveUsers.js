import { User } from "../models/User.js";

async function deleteInactiveUsers() {
  try {
    // Get the current date and subtract one year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Find and delete users older than one year
    const result = await User.deleteMany({ createdAt: { $lt: oneYearAgo } });

    // Use correct string interpolation syntax
    console.log(`${result.deletedCount} inactive users deleted`);
  } catch (error) {
    console.error("Error deleting inactive users:", error);
  }
}

// Use default export
export default deleteInactiveUsers;
