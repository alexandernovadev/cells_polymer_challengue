import { LitElement, html } from "lit-element";
import "@bbva-web-components/bbva-core-generic-dp/bbva-core-generic-dp";

export class GiphyDm extends LitElement {
  static get is() {
    return "giphy-dm";
  }

  static get properties() {
    return {
      _host: { type: String },
      _path: { type: String },
      _method: { type: String },
    };
  }

  async firstUpdated() {
    try {
      let resApi = this.shadowRoot.querySelector("#giphyDm");
      let data = await resApi.generateRequest();
      const event = new CustomEvent("success-response-api", {
        detail: {
          data: data.response.data,
        },
      });
      console.log({ data: data.response.data });
      this.dispatchEvent(event);
    } catch (error) {
      console.log("error", error);
      const event = new CustomEvent("error-response-api", {
        detail: {
          error: error.response,
        },
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
      <bbva-core-generic-dp
        id="giphyDm"
        host="${this._host}"
        path="${this._path}"
        method="${this._method}"
      >
      </bbva-core-generic-dp>
    `;
  }
}

customElements.define(GiphyDm.is, GiphyDm);
