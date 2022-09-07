namespace BowlingGame
{
    public class Game
    {
        private readonly int[] _rolls;

        private int _currentRollIndex;

        public Game()
        {
            _rolls = new int[21];
            _currentRollIndex = 0;
        }

        public void Roll(int currentRoll)
        {
            _rolls[_currentRollIndex++] = currentRoll;
        }

        public int Score()
        {
            var score = 0;
            int rollIndex = 0;
            for (int frameIndex = 0; frameIndex < 10; frameIndex++)
            {
                var firstRoll = _rolls[rollIndex];

                score += firstRoll;
                if (firstRoll == 10) //Strike
                {
                    score += _rolls[rollIndex + 1];
                    score += _rolls[rollIndex + 2];

                    rollIndex += 1;
                }
                else
                {
                    var secondRoll = _rolls[rollIndex + 1];
                    score += secondRoll;

                    if (firstRoll + secondRoll == 10)
                    {
                        score += _rolls[rollIndex + 2];
                    }

                    rollIndex += 2;
                }
            }

            return score;
        }
    }
}