import { CardProvider } from "@/context/CardContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CardProvider>
      <Stack />
    </CardProvider>
  );
}
