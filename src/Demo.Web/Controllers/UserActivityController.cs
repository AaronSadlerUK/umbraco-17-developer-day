using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Services;

namespace Demo.Backoffice.Controllers;

[VersionedApiBackOfficeRoute("user-activity")]
[ApiExplorerSettings(GroupName = "User Activity API")]
public class UserActivityController : ManagementApiControllerBase
{
    private readonly IAuditService _auditService;

    public UserActivityController(IAuditService auditService)
    {
        _auditService = auditService;
    }

    [HttpGet("{userKey:guid}")]
    [ProducesResponseType<string>(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetActivity(Guid userKey)
    {
        var result = await _auditService.GetPagedItemsByUserAsync(userKey, 0, int.MaxValue);

        return Ok(result.Items ?? []);
    }
}