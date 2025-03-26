export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm mt-2">
      {"success" in message && (
        <div className="text-green-600 bg-green-50 rounded-md p-3 border border-green-200">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-600 bg-red-50 rounded-md p-3 border border-red-200">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground bg-gray-50 rounded-md p-3 border border-gray-200">
          {message.message}
        </div>
      )}
    </div>
  );
}
