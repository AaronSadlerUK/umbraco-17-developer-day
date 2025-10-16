export const manifests: Array<UmbExtensionManifest> = [
    {
        name: "Demo Backoffice Dashboard",
        alias: "Demo.Backoffice.Dashboard",
        type: "dashboard",
        js: () => import("./elements/example-dashboard"),
        meta: {
            label: "Example Dashboard",
            pathname: "example-dashboard"
        },
        conditions: [
            {
                alias: "Umb.Condition.SectionAlias",
                match: "Umb.Section.Content"
            }
        ]
    },
    {
        name: "Demo Backoffice Workspace View",
        alias: "Demo.Backoffice.WorkspaceView",
        type: "workspaceView",
        js: () => import("./elements/example-workspace-view"),
        meta: {
            label: "Demo",
            icon: "icon-users",
            pathname: "demo"
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: "Umb.Workspace.User"
            }
        ]
    }
];