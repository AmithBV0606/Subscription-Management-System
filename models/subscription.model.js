import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required."],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required."],
      min: [0, "Price must be greater than 0."],
    },
    currency: {
      type: String,
      enum: ["USD", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "Sports",
        "News",
        "Entertainment",
        "Lifestyle",
        "Technology",
        "Finance",
        "Politics",
        "Others",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date must be in the past.",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal Date must be after the start date.",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto calculate renewal date if missing : Runs before the document is created
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    // Setting the renewalDate to startDate :
    this.renewalDate = new Date(this.startDate);

    // Adding the dates to the renewalDate according to the frequency :
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );

    // Example : StartDate = Jan 1st, frequency = monthly(30days), renewalDate = Jan 31st
  }

  // Auto update the status if renewal date has passed :
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
