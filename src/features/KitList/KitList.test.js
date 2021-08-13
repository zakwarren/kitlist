import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from "@material-ui/core";

import { KitList } from "./KitList";

describe("<KitList />", () => {
  let wrapper;
  const state = {
    category: { tickedCategories: ["test 1"] },
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

    wrapper = shallow(<KitList />);
  });

  it("should render a <Typography /> component if no ticked categories", () => {
    const untickedState = {
      category: { tickedCategories: [] },
      item: { items: [{ name: "Test", category: "test 1" }], tickedItems: [] },
    };
    jest
      .spyOn(redux, "useSelector")
      .mockImplementation((cb) => cb(untickedState));
    const wrapper = shallow(<KitList />);
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Select a category to begin");
  });

  it("should render a <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Check items off as you pack");
  });

  it("should render multiple <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Check items off as you pack");
  });

  it("should render multiple <IconButton /> components", () => {
    const element = wrapper.find(IconButton);

    expect(element).toHaveLength(3);
  });

  it("should render a <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render a <ListItem /> element", () => {
    const element = wrapper.find(ListItem);
    const itemTxt = wrapper.find(ListItemText);
    const itemIcn = wrapper.find(ListItemIcon);
    const chkBox = wrapper.find(Checkbox);
    const item2Act = wrapper.find(ListItemSecondaryAction);

    expect(element).toHaveLength(1);
    expect(itemTxt).toHaveLength(1);
    expect(itemIcn).toHaveLength(1);
    expect(chkBox).toHaveLength(1);
    expect(item2Act).toHaveLength(1);
  });
});
