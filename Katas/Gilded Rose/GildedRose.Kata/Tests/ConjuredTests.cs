using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class ConjuredTests : GildedRoseTestBase
    {
        private static Item CreateConjuredItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Conjured", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void ShouldDecreaseQualityByTwoEveryDay()
        {
            var item = CreateConjuredItem(10, 5);
            RunTestFor(item);

            Assert.AreEqual(8, item.Quality, "Wrong quality value");
            Assert.AreEqual(4, item.SellIn, "Wrong SellIn value");
        }

        [TestMethod]
        public void ShouldNotDecreaseQualityBelowZero()
        {
            var item = CreateConjuredItem(1, 5);
            RunTestFor(item);

            Assert.AreEqual(0, item.Quality, "Wrong quality value");
            Assert.AreEqual(4, item.SellIn, "Wrong SellIn value");
        }
    }
}