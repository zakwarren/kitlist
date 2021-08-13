import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

import { Categories } from "./Categories";

describe("<Categories />", () => {
  let wrapper;
  const state = {
    category: { categories: [{ name: "Test" }], tickedCategories: [] },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<Categories />);
  });

  it("should render a <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render a <ListItem /> element", () => {
    const element = wrapper.find(ListItem);
    const itemTxt = wrapper.find(ListItemText);
    const itemIcon = wrapper.find(ListItemIcon);

    expect(element).toHaveLength(1);
    expect(itemTxt).toHaveLength(1);
    expect(itemIcon).toHaveLength(1);
  });
});
