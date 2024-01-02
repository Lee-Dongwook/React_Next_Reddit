import { render } from "@testing-library/react";
import Home from "@/src/pages/index";

test("시작 페이지 렌더링 테스트", () => {
  render(<Home />);
});
