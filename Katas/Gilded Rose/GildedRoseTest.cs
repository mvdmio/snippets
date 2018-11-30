using NUnit.Framework;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace csharp
{
    [TestClass]
    public class GildedRoseTest
    {
        [SetUp]
        public 

        [TestFixture]
        public class NormalItemTests : GildedRoseTest
        {

        }

        [TestFixture]
        public class AgedBrieTests : GildedRoseTest
        {
        }

        [TestFixture]
        public class SulfarasTests : GildedRoseTest
        {

        }

        [TestFixture, Ignore("This must be implemented")]
        public class ConjuredTests : GildedRoseTest
        {

        }

        [Test]
        public void foo()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "foo", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.AreEqual("fixme", Items[0].Name);
        }
    }
}
