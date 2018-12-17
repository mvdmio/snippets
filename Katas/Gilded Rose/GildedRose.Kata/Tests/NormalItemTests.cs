using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class NormalItemTests : GildedRoseTestBase
    {
        private Item CreateNormalItem(int quality, int sellIn)
        {
            var item = new Item {
                Name = "Normal", 
                Quality = quality, 
                SellIn = sellIn
            };

            return item;
        }

        [TestMethod]
        public void NormalItemsShouldDecreaseInQualityEveryDay()
        {
            var item = CreateNormalItem(10, 2);
            RunTestFor(item);

            Assert.AreEqual(9, item.Quality);
            Assert.AreEqual(9, item.SellIn);
        }
    }
}