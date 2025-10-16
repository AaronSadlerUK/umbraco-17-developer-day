import {
  LitElement,
  html,
  customElement,
  state,
  repeat
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';

export class UserActivity {
  key?: string
  auditType?: string
  entityType?: string
  comment?: string
  createDate?: Date
}

@customElement("example-workspace-view")
export class ExampleWorkspaceViewElement extends UmbElementMixin(LitElement) {

  @state()
  private _userActivity!: UserActivity[];

  constructor() {
      super();
  
      this.#getData();
  }

  async #getData() {
    const { data } = await umbHttpClient.get<UserActivity[]>(
      {
        security: [
          {
              type: "http",
              scheme: "bearer"
          }
        ],
        url: "/umbraco/management/api/v1/user-activity/1e70f841-c261-413b-abb2-2d68cdb96094"
      }
    );

    if (data) {
      this._userActivity = data;
    }
  }

  renderTable() {
    return html`<uui-table>
      <uui-table-head>
        <uui-table-head-cell>Action</uui-table-head-cell>
        <uui-table-head-cell>Entity Type</uui-table-head-cell>
        <uui-table-head-cell>Date</uui-table-head-cell>
      </uui-table-head>
      ${repeat(
        this._userActivity,
        (item) => item.key,
        (item) => html`<uui-table-row>
            <uui-table-cell>${item.auditType}</uui-table-cell>
            <uui-table-cell>${item.entityType}</uui-table-cell>
            <uui-table-cell>${new Date(item.createDate!).toLocaleDateString()}</uui-table-cell>
          </uui-table-row>`
      )}
    </uui-table>`;
  }

  render() {
    return html`
      <uui-box headline="User Activity">
        ${this._userActivity.length ? this.renderTable() : 'No activity to show'}
      </uui-box>
    `;
  }
}

export default ExampleWorkspaceViewElement;

declare global {
  interface HTMLElementTagNameMap {
    "example-workspace-view": ExampleWorkspaceViewElement;
  }
}