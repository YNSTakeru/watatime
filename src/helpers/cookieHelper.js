function getExpiryDate(duration) {
  return new Date(Number(new Date()) + duration);
}

function setCookie(res, name, value, expiryTime) {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: getExpiryDate(expiryTime),
  });
}

module.exports = {
  setCookie,
};
