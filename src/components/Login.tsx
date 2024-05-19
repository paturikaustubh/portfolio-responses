import { useLayoutEffect, useState } from "react";
import { LoginController } from "../Controllers/LoginController";
import Loading from "./LoadingScreen";
import Alert from "./Alert";

export default function Login({
  setAuthenticated,
}: {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const controller = new LoginController(setAuthenticated);

  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    Loading(true, "Setting up things...");
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true") setAuthenticated(true);
    Loading(false);
  });

  return (
    <main className="flex justify-center items-center h-[100dvh] p-4 overflow-auto">
      <section className="flex md:flex-row flex-col lg:items-start lg:justify-between bg-neutral-800 rounded-md lg:p-8 p-4 gap-8 lg:w-3/4 w-full">
        <div className="flex flex-col gap-3 grow">
          <p className="text-5xl font-semibold">Welcome Back!</p>
          <p className="text-xl text-neutral-400">Login to continue</p>
        </div>
        <div className="flex flex-col gap-4 grow">
          <p className="text-3xl font-semibold text-center">Login</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const authenticated = controller.handleLogin();
              setAuthenticated(authenticated);
              if (authenticated) {
                Alert("Welcome back!", "success");
                sessionStorage.setItem("authenticated", "true");
              } else Alert("Invalid Credentials", "warning");
            }}
            className="flex flex-col gap-4"
          >
            <span className="input-label" data-label="Username">
              <input
                required
                autoFocus
                type="text"
                placeholder=""
                onChange={({ target: { value } }) =>
                  controller.handleUsernameChange(value)
                }
              />
            </span>
            <span className="input-label" data-label="Password">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder=""
                onChange={({ target: { value } }) =>
                  controller.handlePasswordChange(value)
                }
              />
            </span>
            <div className="flex items-center justify-between">
              <button
                className="text-blue-500 underline text-sm w-fit"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 duration-200 rounded-md px-4 py-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
