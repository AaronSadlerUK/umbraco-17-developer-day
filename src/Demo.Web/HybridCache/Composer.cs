using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Infrastructure.HybridCache;

namespace Demo.Web.HybridCache;

public class Composer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<IDocumentSeedKeyProvider, BlogSeedKeyProvider>();
    }
}