import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { IconButton } from "@material-ui/core";

import { DownloadButton } from "./Download";

describe("<DownloadButton />", () => {
  let wrapper;
  const state = {
    category: {
      categories: [{ name: "test 1" }, { name: "test 2" }],
      tickedCategories: ["test 1"],
    },
    item: {
      items: [{ name: "Test", category: "test 1" }],
      tickedItems: [],
      removedItems: [],
    },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<DownloadButton />);
  });

  it("should render a <IconButton /> component", () => {
    const element = wrapper.find(IconButton);

    expect(element).toHaveLength(1);
  });
});
