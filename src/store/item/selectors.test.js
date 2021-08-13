import {
  selectItems,
  selectTickedItems,
  selectRemovedItems,
} from "./selectors";

describe("item selectors", () => {
  const posState = {
    item: {
      items: ["test 1", "test 2"],
      tickedItems: ["test 1"],
      removedItems: ["test 2"],
    },
  };
  const negState = { item: { items: [], tickedItems: [], removedItems: [] } };

  it("should return the items", () => {
    const is = selectItems(posState);
    const not = selectItems(negState);

    expect(is).toEqual(posState.item.items);
    expect(not).toEqual(negState.item.items);
  });

  it("should return the ticked items", () => {
    const is = selectTickedItems(posState);
    const not = selectTickedItems(negState);

    expect(is).toEqual(posState.item.tickedItems);
    expect(not).toEqual(negState.item.tickedItems);
  });

  it("should return the removed items", () => {
    const is = selectRemovedItems(posState);
    const not = selectRemovedItems(negState);

    expect(is).toEqual(posState.item.removedItems);
    expect(not).toEqual(negState.item.removedItems);
  });
});
