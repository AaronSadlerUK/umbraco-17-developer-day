using Microsoft.Extensions.Caching.Hybrid;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Infrastructure.HybridCache;

namespace Demo.Web.HybridCache;

public class Composer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<IDocumentSeedKeyProvider, BlogSeedKeyProvider>();

        builder.Services.AddOptions<HybridCacheOptions>().Configure(x =>
        {
            x.MaximumPayloadBytes = 1024 * 1024 * 10;
        });

        builder.Services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = builder.Config.GetConnectionString("RedisCache");
        });
    }
}