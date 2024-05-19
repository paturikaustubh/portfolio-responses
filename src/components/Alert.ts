export default function Alert(
  message: string,
  severity: "info" | "error" | "success" | "warning",
  open: boolean = true
) {
  const alertContainer = document.getElementById("alert-container");

  if (open) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `px-4 py-2 flex items-center md:text-base text-sm w-fit min-h-fit rounded-md ${
      severity === "info"
        ? "bg-blue-100 text-blue-900"
        : severity === "error"
        ? "bg-red-100 text-red-900"
        : severity === "success"
        ? "bg-green-100 text-green-900"
        : "bg-yellow-100 text-yellow-700"
    }`;
    alertDiv.style.animation =
      "show-alert 350ms ease-out, hide-alert 350ms 3500ms ease-in forwards";
    alertDiv.innerHTML = message;
    (alertContainer as HTMLDivElement).appendChild(alertDiv);

    setTimeout(() => {
      (alertContainer as HTMLDivElement).removeChild(alertDiv);
    }, 4000);
  }
}
