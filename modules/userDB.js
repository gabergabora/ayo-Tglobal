const mongoose = require("mongoose");
require("dotenv").config();
// for some reason node v17 needs 127.0.0.1 in the connection instead of localhost
let online = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@firstclauster.npogo.mongodb.net/temenosG`;
let localhost = "mongodb://127.0.0.1:27017/temenosG";
mongoose.connect(localhost, function (req, res) {
  console.log("DB connected successfully");
});

// transactions are for withdrawal, deposit & loan
const transaction = mongoose.Schema(
  {
    // i added the email and Id incase a user decides to change their email
    user: String,
    email: String,
    title: String,
    amount: Number,
    imageurl: String,
    means: { type: String, default: "USDT" },
    status: { type: String, default: "pending" },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// this is for normal investments by users
const shortInvestment = mongoose.Schema({
  user: String,
  email: String,
  title: String,
  roi: Number,
  duration: Number,
  expiry: Number,
  amount: Number,
  paid: { type: Boolean, default: false },
  profit: Number,
});

const activity = mongoose.Schema(
  {
    type: String,
    from: String,
    to: String,
    amount: Number,
    created_At: Date,
  },
  { timestamps: true }
);
// this is for cyclesinvs.
// the idea is that the max the get upto is 5,
// every time they renew thism it reduces the days2run by 5
// during initial inv. it starts at zero but stops at five during payment in the node-cron

const cyclesInvestment = mongoose.Schema({
  // pay_day => pay/day
  title: String,
  user: String,
  email: String,
  pay_day: Number,
  accumulatedSum: Number,
  amount_inv: Number,
  days2run: Number,
  cycle: Number,
  min_cycle_b4_with: Number,
  days_cycle: Number,
  active: { type: Boolean, default: true },
});

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "make sure all inputs are filled"],
    },
    password: {
      type: String,
      required: [true, "make sure all inputs are filled"],
    },
    firstName: {
      type: String,
      required: [true, "make sure all inputs are filled"],
    },
    lastName: {
      type: String,
      required: [true, "make sure all inputs are filled"],
    },
    fundingBallance: { type: Number, default: 0 },
    shortBallance: { type: Number, default: 0 },
    cyclesBallance: { type: Number, default: 0 },
    client: { type: Boolean, default: false },
    activities: [activity],
    referrals: [String],
    disallowedPlans: [String],
    walletAddress: String,
    lastLoggedIn: Date,
  },
  {
    minimize: false,
    timestamps: true,
  }
);

require("./adminDB");

USER = mongoose.model("user", userSchema);
TRANSACTION = mongoose.model("transactions", transaction);
SHORTINVS = mongoose.model("shortInvestments", shortInvestment);
CYCLESINVS = mongoose.model("cyclesInvestments", cyclesInvestment);

module.exports.USER = USER;
module.exports.TRANSACTION = TRANSACTION;
module.exports.SHORTINVS = SHORTINVS;
module.exports.CYCLESINVS = CYCLESINVS;
