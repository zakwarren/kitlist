import React from "react";
import { shallow } from "enzyme";
import { Card, CardHeader } from "@material-ui/core";

import { MenuItem } from "./MenuItem";

describe("<MenuItem />", () => {
  let wrapper;
  const props = {
    title: "Test",
    action: jest.fn,
  };

  beforeEach(() => {
    wrapper = shallow(<MenuItem {...props} />);
  });

  it("should render a <Card /> component", () => {
    const element = wrapper.find(Card);

    expect(element).toHaveLength(1);
  });

  it("should render a <CardHeader /> component", () => {
    const element = wrapper.find(CardHeader);

    expect(element).toHaveLength(1);
  });
});
