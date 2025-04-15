import { redirect } from "next/navigation";

type MessageType = "success" | "error" | "info" | "warning";

export const createRedirectUrl = (
  type: MessageType,
  path: string,
  message: string
) => {
  const searchParams = new URLSearchParams();
  searchParams.set("type", type);
  searchParams.set("message", message);
  return `${path}?${searchParams.toString()}`;
};

export const encodedRedirect = (
  type: MessageType,
  path: string,
  message: string
) => {
  const url = createRedirectUrl(type, path, message);
  throw redirect(url);
};
