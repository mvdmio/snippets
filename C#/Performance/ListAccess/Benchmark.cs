using System.Runtime.InteropServices;
using BenchmarkDotNet.Attributes;

namespace ListAccess;

[MemoryDiagnoser(false)]
public class Benchmark
{
   [Params(100, 100_000, 100_000_000)]
   public int Size { get; set; }

   private List<int> _list;

   [GlobalSetup]
   public void Setup()
   {
      _list = Enumerable.Range(1, Size).ToList();
   }

   [Benchmark]
   public void ForLoop()
   {
      for (var i = 0; i < _list.Count; i++)
      {
         var item = _list[i];
      }
   }

   [Benchmark]
   public void ForeachLoop()
   {
      foreach (var item in _list) {}
   }

   [Benchmark]
   public void ParallelFor()
   {
      Parallel.For(0, _list.Count, i => {
         var item = _list[i];
      });
   }
   
   [Benchmark]
   public void ParallelForEach()
   {
      Parallel.ForEach(_list, item => { });
   }

   [Benchmark]
   public void LinqForEach()
   {
      _list.ForEach(item => {});
   }

   [Benchmark]
   public void SpanFor()
   {
      var span = CollectionsMarshal.AsSpan(_list);
      for (var i = 0; i < span.Length; i++)
      {
         var item = span[i];
      }
   }

   [Benchmark]
   public void SpanForEach()
   {
      var span = CollectionsMarshal.AsSpan(_list);
      foreach (var item in span) {}
   }
}