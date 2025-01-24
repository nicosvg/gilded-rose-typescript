export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured Mana Cake";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItemQuality(item);
      this.updateSellInDate(item);
      this.checkQuality(item);
    }

    return this.items;
  }

  checkQuality(item: Item) {
    if (item.name !== SULFURAS && item.quality > 50) {
      item.quality = 50;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }

  private updateItemQuality(item: Item) {
    switch (item.name) {
      case SULFURAS:
        break;
      case AGED_BRIE:
        item.quality++;
        if (item.sellIn <= 0) {
          item.quality += 1;
        }
        break;
      case BACKSTAGE_PASS:
        if (item.sellIn <= 0) {
          // Oudated backstage pass has no value
          item.quality = 0;
          return;
        }
        item.quality++;
        if (item.sellIn <= 5) {
          item.quality += 1;
        }
        if (item.sellIn <= 10) {
          item.quality += 1;
        }
        break;
      case CONJURED:
        item.quality = item.quality - 2;
        if (item.sellIn <= 0) {
          item.quality = item.quality - 2;
        }
        break;
      default:
        item.quality = item.quality - 1;

        if (item.sellIn <= 0) {
          item.quality = item.quality - 1;
        }
        break;
    }
  }

  private updateSellInDate(item: Item) {
    if (item.name != SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }
  }
}
