using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GildedRose.Kata.Tests
{
    [TestClass]
    public class GildedRoseTestBase
    {
        protected void RunTestFor(params Item[] items)
        {
            var gildedRose = new GildedRose(items);
            gildedRose.UpdateQuality();
        }
    }
}
