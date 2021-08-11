import React from "react";
import { shallow } from "enzyme";
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

  beforeEach(() => {
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

    expect(element).toHaveLength(3);
    expect(itemTxt).toHaveLength(3);
    expect(itemIcn).toHaveLength(3);
    expect(chkBox).toHaveLength(3);
    expect(item2Act).toHaveLength(3);
    expect(iconBtn).toHaveLength(3);
  });
});
