import { Item, GildedRose } from "../app/gilded-rose";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Elixir of the Mongoose", 5, 7), //
];

const gildedRose = new GildedRose(items);

export function runTest(days: number) {
  const logs: string[] = [];
  for (let i = 0; i < days; i++) {
    logs.push("-------- day " + i + " --------");
    logs.push("name, sellIn, quality");
    items.forEach((element) => {
      logs.push(element.name + ", " + element.sellIn + ", " + element.quality);
    });
    logs.push();
    gildedRose.updateQuality();
  }
  return logs;
}
