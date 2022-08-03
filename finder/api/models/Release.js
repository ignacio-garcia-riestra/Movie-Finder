const { Schema, model } = require("mongoose");

const releaseSchema = new Schema(
  {
    tmdb_id: {
      type: Number,
    },
    original_title: {
      type: String,
    },
    overview: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    media_type: {
      type: String,
    },
    release_date: {
      type: String,
    },
    vote_average: {
      type: Number,
    },
    poster_path: {
      type: String,
    },
    /* backdrops: {
      type: String,
      maxlength: 1,
    }, */
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Release", releaseSchema);