const express = require("express");
const router = express.Router();

const MemberController = require("../controllers/memberController");
const { checkMemberToken } = require("../middlewares/checkTokens");

router.get("/member", checkMemberToken, MemberController.member);
router.get("/member/members", checkMemberToken, MemberController.members);
router.post(
  "/member/update-member",
  checkMemberToken,
  MemberController.updateMember
);
router.post(
  "/member/delete-account",
  checkMemberToken,
  MemberController.deleteAccount
);

module.exports = router;
