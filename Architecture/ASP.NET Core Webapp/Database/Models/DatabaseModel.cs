namespace Database.Models
{
    public class DatabaseModel
    {
        public int DatabaseId { get; set; }
        public string Property { get; set; }
        public byte[] ConcurrencyColumn { get; set; }
    }
}