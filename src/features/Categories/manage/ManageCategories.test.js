import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";

import { ManageCategories } from "./ManageCategories";

describe("<ManageCategories />", () => {
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

    wrapper = shallow(<ManageCategories />);
  });

  it("should render a <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render a <ListItem /> element", () => {
    const element = wrapper.find(ListItem);
    const itemTxt = wrapper.find(ListItemText);

    expect(element).toHaveLength(1);
    expect(itemTxt).toHaveLength(1);
  });
});
