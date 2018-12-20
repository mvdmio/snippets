using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class AgedBrieTests : GildedRoseTestBase
    {
        private static Item CreateAgedBrieItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Aged Brie", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void ShouldIncreaseInQualityRegardlessOfSellIn()
        {
            var item = CreateAgedBrieItem(1, 5);
            RunTestFor(item);

            Assert.AreEqual(2, item.Quality, "Wrong quality value");
            Assert.AreEqual(4, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void ShouldNotIncreaseInQualityAbove50()
        {
            var item = CreateAgedBrieItem(50, -10);
            RunTestFor(item);

            Assert.AreEqual(50, item.Quality, "Wrong quality value");
            Assert.AreEqual(-11, item.SellIn, "Wrong SellIn value");
        }
    }
}