const specialChars = "༴༎👻༎";

function isUserAllowed(memberName) {
  return memberName && memberName.includes(specialChars);
}
