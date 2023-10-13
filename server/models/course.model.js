import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [8, "Title must be at least 8 characters"],
      maxLength: [59, "Title Should be less than 60 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [8, "Title must be at least 8 characters"],
      maxLength: [200, "Title Should be less than 200 characters"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    createdBy: {
      type: String,
      required: [true, "CreatedBy Name is Required"],
    },

    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },

    lectures: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
            required: true,
          },
        },
      },
    ],

    numberofLectures: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("course", courseSchema);

export default Course;
