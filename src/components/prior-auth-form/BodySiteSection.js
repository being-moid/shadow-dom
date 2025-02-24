import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from './shared-styles';

@customElement('body-site-section')
export class BodySiteSection extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        margin-top: 1rem;
      }
      .section-container {
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 12px;
        padding: 1.25rem;
      }
      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--gray-900);
      }
      .form-group {
        margin-bottom: 1rem;
      }
      label {
        display: block;
        font-size: 0.875rem;
        color: var(--gray-600);
        margin-bottom: 0.5rem;
      }
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--gray-200);
        border-radius: 8px;
        font-size: 1rem;
        color: var(--gray-900);
      }
    `
  ];

  @property({ type: String }) selectedBodySite = '';
  @property({ type: String }) selectedSubSite = '';

  // Static list of Body Sites
  bodySiteOptions = [
    { value: 'oral', label: 'Oral Cavity' },
    { value: 'pharynx', label: 'Pharynx' },
    { value: 'larynx', label: 'Larynx' }
  ];

  // Static subsite options mapped per body site
  subSiteOptions = {
    oral: [
      { value: 'upper-left', label: 'Upper Left' },
      { value: 'upper-right', label: 'Upper Right' },
      { value: 'lower-left', label: 'Lower Left' },
      { value: 'lower-right', label: 'Lower Right' }
    ],
    pharynx: [
      { value: 'nasopharynx', label: 'Nasopharynx' },
      { value: 'oropharynx', label: 'Oropharynx' },
      { value: 'hypopharynx', label: 'Hypopharynx' }
    ],
    larynx: [
      { value: 'supraglottic', label: 'Supraglottic' },
      { value: 'glottic', label: 'Glottic' },
      { value: 'subglottic', label: 'Subglottic' }
    ]
  };

  render() {
    return html`
      <div class="section-container">
        <div class="section-title">Body Site & Subsite</div>
        <div class="form-group">
          <label for="bodySite">Select Body Site</label>
          <select id="bodySite" @change=${this.handleBodySiteChange}>
            <option value="">-- Select Body Site --</option>
            ${this.bodySiteOptions.map(site => html`
              <option value="${site.value}" ?selected=${this.selectedBodySite === site.value}>
                ${site.label}
              </option>
            `)}
          </select>
        </div>
        <div class="form-group">
          <label for="subSite">Select Subsite</label>
          <select id="subSite" @change=${this.handleSubSiteChange}>
            <option value="">-- Select Subsite --</option>
            ${this.selectedBodySite && this.subSiteOptions[this.selectedBodySite] ? this.subSiteOptions[this.selectedBodySite].map(sub => html`
              <option value="${sub.value}" ?selected=${this.selectedSubSite === sub.value}>
                ${sub.label}
              </option>
            `) : html`<option value="">No subsite available</option>`}
          </select>
        </div>
      </div>
    `;
  }

  handleBodySiteChange(e) {
    this.selectedBodySite = e.target.value;
    // Reset subsite on body site change
    this.selectedSubSite = '';
    this.dispatchBodySiteChanged();
  }

  handleSubSiteChange(e) {
    this.selectedSubSite = e.target.value;
    this.dispatchBodySiteChanged();
  }

  dispatchBodySiteChanged() {
    this.dispatchEvent(new CustomEvent('body-site-changed', {
      detail: { bodySite: this.selectedBodySite, subSite: this.selectedSubSite },
      bubbles: true,
      composed: true
    }));
  }
} 