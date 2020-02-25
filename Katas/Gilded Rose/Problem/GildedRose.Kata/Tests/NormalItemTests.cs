using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class NormalItemTests : GildedRoseTestBase
    {
        private static Item CreateNormalItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Normal", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void WhenSellDateIsNotExpired_ShouldDecreaseQualityByOne()
        {
            var item = CreateNormalItem(10, 2);
            RunTestFor(item);

            Assert.AreEqual(9, item.Quality, "Wrong quality value");
            Assert.AreEqual(1, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void WhenSellDateIsExpired_ShouldDecreaseInQualityByTwo()
        {
            var item = CreateNormalItem(9, 0);
            RunTestFor(item);

            Assert.AreEqual(7, item.Quality, "Wrong quality value");
            Assert.AreEqual(-1, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void ShouldNotDecreaseQualityBelowZero()
        {
            var item = CreateNormalItem(1, 0);
            RunTestFor(item);

            Assert.AreEqual(0, item.Quality, "Wrong quality value");
            Assert.AreEqual(-1, item.SellIn, "Wrong SellIn value");
        }
    }
}