import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";

describe("Register component test", () => {
  it("should return a text with content 'Register'", () => {
    render(<Register />);
    const textElement = screen.getByText("Register");
    expect(textElement).toBeInTheDocument();
  });
});
