export const errorAuth = {
  login: {
    alreadyExist: {
      //given credentials not exist
      detail: {
        msg: "Invalid sign up",
        status: 409
      }
    },
    invalid: {
      //given credentials not exist
      detail: {
        msg: "Invalid email or password credentials",
        status: 409
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
    msg: "Invalid or missing token type",
    status: 401
  },
  notFound: {
    msg: "Signed user not found. Please login again.",
    status: 401
  }
};
