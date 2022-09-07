using FluentAssertions;

namespace BowlingGame.Tests
{
    [TestClass]
    public class GameTests
    {
        private Game _game;

        [TestInitialize]
        public void SetUp()
        {
            _game = new Game();
        }

        [TestMethod]
        public void ScoreShouldBeZeroWhenNoRollsAreDone()
        {
            AssertScore(0);
        }

        [TestMethod]
        public void ScoreShouldBeOneWhenFirstRollKnockedOverOnePin()
        {
            _game.Roll(1);
            AssertScore(1);
        }

        [TestMethod]
        public void ScoreShouldBeTwoWhenFirstAndSecondRollKnockedOverOnePin()
        {
            _game.Roll(1);
            _game.Roll(1);

            AssertScore(2);
        }

        [TestMethod]
        public void ScoreShouldAddNextRollAsBonusPointsAfterSpare()
        {
            _game.Roll(5);
            _game.Roll(5);
            _game.Roll(3);

            AssertScore(16);
        }

        [TestMethod]
        public void ScoreShouldAddNextTwoRollsAsBonusPointsAfterStrike()
        {
            _game.Roll(10);

            _game.Roll(5);
            _game.Roll(3);

            AssertScore(26);
        }

        [TestMethod]
        public void ScoreShouldCorrectlyAddTwoStrikesAfterEachOther()
        {
            _game.Roll(10); // Counts 1 time

            _game.Roll(10); // Counts 2 times

            _game.Roll(5); // Counts 3 times (two strikes, frame 1 and 2)
            _game.Roll(3); // Counts 2 times (one strike, frame 2)

            AssertScore(51);
        }

        [TestMethod]
        public void ScoreShouldCorrectlyAddTwoSparesAfterEachOther()
        {
            _game.Roll(5); // Counts 1 time
            _game.Roll(5); // Counts 1 times

            _game.Roll(5); // Counts 2 time (spare in previous frame)
            _game.Roll(5); // Counts 1 times

            _game.Roll(5); // Counts 2 times (spare in previous frame)
            _game.Roll(3); // Counts 1 times

            AssertScore(38);
        }

        [TestMethod]
        public void ScoreShouldBeZeroWhenRollingAllZeros()
        {
            RollMany(20, 0);
            AssertScore(0);
        }

        [TestMethod]
        public void ScoreShouldBe20WhenRollingAllOnes()
        {
            RollMany(20, 1);
            AssertScore(20);
        }

        [TestMethod]
        public void ScoreShouldBe150WhenRollingAllFives()
        {
            RollMany(21, 5);
            AssertScore(150);
        }

        [TestMethod]
        public void ScoreShouldBeXXXWhenRollingAllStrikes()
        {
            RollMany(12, 10);
            AssertScore(300);
        }

        private void RollMany(int count, int amount)
        {
            for (int i = 0; i < count; i++)
            {
                _game.Roll(amount);
            }
        }

        private void AssertScore(int expectedScore)
        {
            Assert.AreEqual(expectedScore, _game.Score());
        }
    }
}