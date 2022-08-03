import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

test("Login component test", () => {
  render(<Login />);
  const textElement = screen.getByText("Login");
  expect(textElement).toBeInTheDocument();
});
