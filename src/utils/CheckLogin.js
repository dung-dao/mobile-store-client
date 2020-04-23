import jwt from "jsonwebtoken";

/// Return login status
export const CheckLogin = () => {
  //Check if store has user, found => return

  //if not try to
  try {
    const token = localStorage.getItem("token");
    var decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken.exp < new Date().getTime()) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
