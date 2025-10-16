import {
  LitElement,
  css,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";

@customElement("example-dashboard")
export class ExampleDashboardElement extends UmbElementMixin(LitElement) {

  @state()
  private _currentUser?: UmbCurrentUserModel;

  constructor() {
    super();

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (currentUserContext) => {
      // When we have the current user context
      // We can observe properties from it, such as the current user or perhaps just individual properties
      // When the currentUser object changes we will get notified and can reset the @state property
      this.observe(
        currentUserContext?.currentUser,
        (currentUser) => {
          this._currentUser = currentUser;
        }
      );
    });
  }

  render() {
    return html`
      <uui-box headline="Ahoy, ${this._currentUser?.name}!">
        <p>
          <uui-icon name="icon-message"></uui-icon> ${this._currentUser?.userName}
        </p>
        <p>
          <uui-icon name="icon-globe"></uui-icon> ${this._currentUser?.languageIsoCode}
        </p>
      </uui-box>
    `;
  }

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--uui-size-layout-1);
        padding: var(--uui-size-layout-1);
      }

      uui-box {
        margin-bottom: var(--uui-size-layout-1);
      }

      h2 {
        margin-top: 0;
      }
    `,
  ];
}

export default ExampleDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    "example-dashboard": ExampleDashboardElement;
  }
}
