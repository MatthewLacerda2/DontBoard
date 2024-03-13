using System.Collections.Concurrent;

public class RateLimit {

    private readonly RequestDelegate _next;
    private readonly ConcurrentDictionary<string, (DateTime LastRequestTime, int RequestCount)> _requestTracker;
    private readonly TimeSpan _interval;
    private readonly int _limit;

    public RateLimit(RequestDelegate next, int limit, TimeSpan interval) {
        _next = next;
        _requestTracker = new ConcurrentDictionary<string, (DateTime, int)>();
        _limit = limit;
        _interval = interval;
    }

    public async Task Invoke(HttpContext context) {
        // Check if RemoteIpAddress is not null before calling ToString()
        var ipAddress = context.Connection.RemoteIpAddress?.ToString();

        if (ipAddress == null) {
            // Handle the case where RemoteIpAddress is null
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("Unable to determine client IP address.");
            return;
        }

        var currentTime = DateTime.Now;

        if (_requestTracker.TryGetValue(ipAddress, out var requestInfo)) {
            var (lastRequestTime, requestCount) = requestInfo;
            if (currentTime - lastRequestTime < _interval) {
                // Check if the request count exceeds the limit
                if (requestCount >= _limit) {
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    await context.Response.WriteAsync("Rate limit exceeded. Please try again later.");
                    return;
                }
                // Increment the request count
                _requestTracker[ipAddress] = (currentTime, requestCount + 1);
            } else {
                // Reset the request count if the interval has passed
                _requestTracker[ipAddress] = (currentTime, 1);
            }
        } else {
            // Add the IP address with the initial request count
            _requestTracker.TryAdd(ipAddress, (currentTime, 1));
        }

        await _next(context);
    }
}
