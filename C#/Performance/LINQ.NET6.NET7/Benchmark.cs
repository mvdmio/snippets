using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Jobs;

namespace LINQ.NET6.NET7;

[SimpleJob(RuntimeMoniker.Net60)]
[SimpleJob(RuntimeMoniker.Net70)]
[MemoryDiagnoser(false)]
public class Benchmark
{
    [Params(100)]
    public int Size { get; set; }

    private IEnumerable<int> _array;
    private IEnumerable<int> _list;

    [GlobalSetup]
    public void Setup()
    {
        _array = Enumerable.Range(1, Size).ToArray();
        _list = Enumerable.Range(1, Size).ToList();
    }

    [Benchmark]
    public int ArrayMin() => _array.Min();
    
    [Benchmark]
    public int ArrayMax() => _array.Max();
    
    [Benchmark]
    public double ArrayAverage() => _array.Average();
    
    [Benchmark]
    public int ArraySum() => _array.Sum();
    
    [Benchmark]
    public int ListMin() => _list.Min();
    
    [Benchmark]
    public int ListMax() => _list.Max();
    
    [Benchmark]
    public double ListAverage() => _list.Average();
    
    [Benchmark]
    public int ListSum() => _list.Sum();
}