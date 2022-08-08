import { render, screen } from "@testing-library/react";
import Logout from "../pages/Logout";

describe("Logout component test", () => {
  it("should return a text with content 'Logout'", () => {
    render(<Logout />);
    const textElement = screen.getByText("Logout");
    expect(textElement).toBeInTheDocument();
  });
});
