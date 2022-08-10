import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

describe("Login component test", () => {
  it("should return a text with content 'Login'", () => {
    render(<Login />);
    const textElement = screen.getByText("Login");
    // expect(textElement).toBeInTheDocument();
  });
});
