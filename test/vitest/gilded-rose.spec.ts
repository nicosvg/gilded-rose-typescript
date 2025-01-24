import { Item, GildedRose } from "@/gilded-rose";
import { describe } from "vitest";

describe.skip("Gilded Rose", () => {
  it("should foo", () => {
    // Arrange
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].name).toBe("foo");
  });

  it("Quality should stay positive", () => {
    // Arrange
    const gildedRose = new GildedRose([
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Conjured Mana Cake", 3, 6),
    ]);
    // Act
    for (let index = 0; index < 15; index++) {
      gildedRose.updateQuality();
    }
    const items = gildedRose.updateQuality();
    // Assert
    for (const item of items) {
      expect(item.quality).toBeGreaterThanOrEqual(0);
    }
  });

  it("Quality degrades twice as fast after sell by date", () => {
    // Arrange
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 20)]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].quality).toBe(18);
  });

  it("Quality degrades twice as fast after sell by date", () => {
    // Arrange
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 20)]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].quality).toBe(18);
  });

  it("Max quality is 50", () => {
    // Arrange
    const gildedRose = new GildedRose([new Item("Aged Brie", -2, 50)]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].quality).toBe(50);
  });
  describe("Conjured items", () => {
    it("Degrades twice as fast when > 0", () => {
      // Arrange
      const gildedRose = new GildedRose([
        new Item("Conjured Mana Cake", 2, 10),
      ]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(8);
    });
    it("Degrades twice as fast when < 0", () => {
      // Arrange
      const gildedRose = new GildedRose([
        new Item("Conjured Mana Cake", -2, 10),
      ]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(6);
    });
  });

  describe("Backstage passes", () => {
    it("Quality increases by 1 when there are more than 10 days ", () => {
      // Arrange
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
      ]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(21);
      expect(items[0].sellIn).toBe(10);
    });

    it("Quality increases by 2 when there are 10 days or less", () => {
      // Arrange
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(22);
      expect(items[0].sellIn).toBe(9);
    });

    it.skip("Quality drops to 0 when outdated", () => {
      // Arrange
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(0);
    });
  });

  it("Quality increases by 3 when there are 5 days or less", () => {
    // Arrange
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    // Act
    const items = gildedRose.updateQuality();
    // Assert
    expect(items[0].quality).toBe(23);
  });

  describe("Sulfuras", () => {
    const SULFURAS = "Sulfuras, Hand of Ragnaros";
    it("should stay at 80 quality", () => {
      // Arrange
      const gildedRose = new GildedRose([new Item(SULFURAS, 10, 80)]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(10);
    });
  });

  describe("Aged brie", () => {
    const AGED_BRIE = "Aged Brie";
    it("quality should improve overtime", () => {
      // Arrange
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 10, 10)]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(11);
      expect(items[0].sellIn).toBe(9);
    });
    it("outdated brie increases twice as fast", () => {
      // Arrange
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 10)]);
      // Act
      const items = gildedRose.updateQuality();
      // Assert
      expect(items[0].quality).toBe(12);
      expect(items[0].sellIn).toBe(-1);
    });
  });
});
