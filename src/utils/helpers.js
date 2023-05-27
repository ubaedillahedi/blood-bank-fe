export const getAntdInputValidation = () => {
  return [
    {
      required: true,
      message: "Required",
    },
  ];
};

export const getLoggedInUserName = (user) => {
  if (user.userType === "donar") {
    return user.name;
  } else if (user.userType === "hospital") {
    return user.hospitalName;
  } else if (user.userType === "organization") {
    return user.organizationName;
  }
};
