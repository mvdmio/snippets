using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class SulfarasTests : GildedRoseTestBase
    {
        private static Item CreateSulfarasItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Sulfuras, Hand of Ragnaros", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void ShouldNeverChangeQualityOrSellBy()
        {
            var item = CreateSulfarasItem(10, 10);
            RunTestFor(item);

            Assert.AreEqual(10, item.Quality, "Wrong quality value");
            Assert.AreEqual(10, item.SellIn, "Wrong SellIn value");
        }
    }
}