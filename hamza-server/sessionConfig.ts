// sessionConfig.ts
export const sessionOptions = {
  password: process.env.SESSION_PASSWORD, // Ensure this is at least 32 characters long
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
