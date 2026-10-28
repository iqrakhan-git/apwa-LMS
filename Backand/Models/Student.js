
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: [true, "Student ID is required"],
            unique: true,
            trim: true,
        },

        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            sparse: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false,
        },

        course: {
            type: String,
            default: "Web Development",
        },

        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            default: "student",
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
