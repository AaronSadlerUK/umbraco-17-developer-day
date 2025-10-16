using Umbraco.Cms.Core.Services.Navigation;
using Umbraco.Cms.Infrastructure.HybridCache;

namespace Demo.Web.HybridCache;

public class BlogSeedKeyProvider : IDocumentSeedKeyProvider
{
    private readonly IDocumentNavigationQueryService _navigationService;

    public BlogSeedKeyProvider(IDocumentNavigationQueryService navigationService)
    {
        _navigationService = navigationService;
    }
 
    public ISet<Guid> GetSeedKeys()
    {
        _navigationService.TryGetDescendantsKeys(new("31523089-f648-4883-9087-ef9a0b83129f"), out var keys);

        return new HashSet<Guid>(keys);
    }
}