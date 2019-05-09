# Async JSON handling

As found on [https://www.strathweb.com/2019/02/be-careful-when-manually-handling-json-requests-in-asp-net-core/](https://www.strathweb.com/2019/02/be-careful-when-manually-handling-json-requests-in-asp-net-core/).

The following code prevents excessive memory consumption while handling JSON:

```
try
    {
        using (var streamReader = new HttpRequestStreamReader(request.Body, Encoding.UTF8))
        using (var jsonReader = new JsonTextReader(streamReader))
        {
            var json = await JObject.LoadAsync(jsonReader);       
            // process JSON
        }
    }
    catch (Exception e)
    {
        // handle exception        
    }
```