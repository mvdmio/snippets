using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class BackstagePassTests : GildedRoseTestBase
    {
        private static Item CreateBackstagePassItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Backstage passes to a TAFKAL80ETC concert", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void WhenSellInIsGreaterThan10_ShouldIncreaseQualityBy1()
        {
            var item = CreateBackstagePassItem(5, 11);
            RunTestFor(item);

            Assert.AreEqual(6, item.Quality, "Wrong quality value");
            Assert.AreEqual(10, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void WhenSellInIsGreaterThan5_ShouldIncreaseQualityBy2()
        {
            var item = CreateBackstagePassItem(5, 10);
            RunTestFor(item);

            Assert.AreEqual(7, item.Quality, "Wrong quality value");
            Assert.AreEqual(9, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void WhenSellInIsGreaterThan0_ShouldIncreaseQualityBy3()
        {
            var item = CreateBackstagePassItem(5, 1);
            RunTestFor(item);

            Assert.AreEqual(8, item.Quality, "Wrong quality value");
            Assert.AreEqual(0, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void WhenSellInIsNegative_ShouldSetQualityToZero()
        {
            var item = CreateBackstagePassItem(5, 0);
            RunTestFor(item);

            Assert.AreEqual(0, item.Quality, "Wrong quality value");
            Assert.AreEqual(-1, item.SellIn, "Wrong SellIn value");
        }
    }
}