import { describe } from "vitest";
import { GildedRose, Item } from "../app/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    // Arrange
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].name).toBe("bar");
  });
});
