const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Prodcut",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      {
        _id: productId,
      },
      {
        averageRating: (result[0]?.averageRating || 999).toFixed(1),
        numOfReviews: result[0]?.numOfReviews || 999,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// //make averageRating update when save or delete a review
// // calculateAverageRating needs schema to work = ReviewSchema.calculateAverageRating
// // this.product means const review = awiat Review.create = review.product

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.constructor.calculateAverageRating(this.product);
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
