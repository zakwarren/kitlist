import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import {
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
    item: { items: [{ name: "Test", category: "test 1" }], tickedItems: [] },
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

  it("should render an <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render a <ListItem /> element", () => {
    const element = wrapper.find(ListItem);
    const itemTxt = wrapper.find(ListItemText);
    const itemIcn = wrapper.find(ListItemIcon);
    const chkBox = wrapper.find(Checkbox);
    const item2Act = wrapper.find(ListItemSecondaryAction);
    const iconBtn = wrapper.find(IconButton);

    expect(element).toHaveLength(1);
    expect(itemTxt).toHaveLength(1);
    expect(itemIcn).toHaveLength(1);
    expect(chkBox).toHaveLength(1);
    expect(item2Act).toHaveLength(1);
    expect(iconBtn).toHaveLength(1);
  });
});
