import { selectItems, selectTickedItems } from "./selectors";

describe("item selectors", () => {
  const posState = {
    item: {
      items: ["test 1", "test 2"],
      tickedItems: ["test 1"],
    },
  };
  const negState = { item: { items: [], tickedItems: [] } };

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
});
