var _0xe8b3=["\x6D\x6F\x6E\x67\x6F\x6F\x73\x65"];const {Schema,model}=require(_0xe8b3[0])

module.exports = model("Database Users", Schema({
  id: { type: String, required: true },
  coins: { type: String, default: 0},
  withdraw_amount: {type: Number, default: 0},
  status_playing: { type: String, default: "no"},
  withdrawmessages: {type: [String], default: []}
}));