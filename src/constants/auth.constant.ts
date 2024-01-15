export const errorAuth = {
  login: {
    alreadyExist: {
      //given credentials not exist
      detail: {
        msg: "User with given email already exists",
        status: 401
      }
    }
  }
};

export const successAuth = {
  login: {
    msg: "Loggedin successfully.",
    status: 200
  },
  register: {
    msg: "Registration completed.",
    status: 200
  }
};

export const tokenError = {
  invalid: {
    msg: "Invalid token type",
    status: 401
  },
  notFound: {
    msg: "Signed user not found. Please login again.",
    status: 401
  }
};
