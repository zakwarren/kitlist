import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { Typography } from "@material-ui/core";

import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: jest.fn }),
}));

describe("<Menu />", () => {
  let wrapper;
  const state = {
    category: { categories: [], tickedCategories: [] },
    item: { items: [], tickedItems: [], removedItems: [] },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<Menu />);
  });

  it("should render a <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Main Menu");
  });

  it("should render a <section /> element", () => {
    const element = wrapper.find("section");

    expect(element).toHaveLength(1);
  });

  it("should render multiple <MenuItem /> components", () => {
    const element = wrapper.find(MenuItem);

    expect(element).toHaveLength(2);
  });
});
