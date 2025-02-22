export const AMOUNT_PATTERNS = {
  PATTERN: /^(0(?!\.00)|[1-9]\d{0,6})(?:\.\d{1,2})?$/,
  PARSER: /\$\s?|(,*)/g,
  FORMATTER: /\B(?=(\d{3})+(?!\d))/g,
};
export const LOCAL_STORAGE = {
  TOKEN: "auth_token",
};

export const MESSAGES = {
  LOGIN: {
    ERROR: {
      EMAIL:
        "The email address you entered doesn't match our records. Please double-check your spelling or create an account if you don't already have one.",
      PASSWORD:
        "The password you entered is incorrect. Please try again or reset your password if you've forgotten it.",
    },
  },
};

export const REGISTER_FORM_STEPS = {
  GENERAL_INFO: "GENERAL_INFO",
  VERIFICATION: "VERIFICATION",
  PASSWORD: "PASSWORD",
};
export const REGISTER_FORM_CONFIG = {
  GENERAL_INFO: {
    title: "Tell us more about you.",
    fields: [
      {
        label: "First Names",
        name: "firstnames",
        type: "input",
        rules: [
          {
            required: true,
            message: "Please enter your first names",
          },
        ],
        input: {
          placeholder: "Your First Names",
        },
      },
      {
        label: "Last Names",
        name: "lastnames",
        type: "input",
        rules: [
          {
            required: true,
            message: "Please enter your last names",
          },
        ],
        input: {
          placeholder: "Your Last Names",
        },
      },
      {
        label: "Email",
        name: "email",
        type: "input",
        rules: [
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ],
        input: {
          placeholder: "Your Email",
        },
      },
    ],
  },
  VERIFICATION: {
    title: "Email Verification",
    description:
      "We have sent to you a verification code to your email. Please enter the code to continue.",
    fields: [
      {
        label: "Verification Code",
        name: "code",
        type: "input",
        rules: [
          {
            required: true,
            pattern: /^\d{5}$/,
            message: "Please enter a valid code",
          },
        ],
        input: {
          placeholder: "00000",
        },
      },
      {
        label: "Send again?",
        type: "button",
        button: {
          type: "link",
          style: { marginTop: 12 },
          onClick: () => {
            console.log("Code resent!");
          },
        },
      },
    ],
  },
  PASSWORD: {
    title: "Set a new password.",
    fields: [
      {
        label: "Password",
        name: "password",
        type: "input",
        rules: [
          {
            required: true,
            message: "Please enter a password",
          },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          },
        ],
        input: {
          placeholder: "Your Password",
          type: "password",
        },
      },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        dependencies: ["password"],
        type: "input",
        rules: [
          {
            required: true,
            message: "Please confirm your password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password not matching"));
            },
          }),
        ],
        input: {
          placeholder: "Confirm Password",
          type: "password",
        },
      },
    ],
  },
};
