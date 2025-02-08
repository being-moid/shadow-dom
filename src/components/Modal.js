import { LitElement, html, css } from 'lit';
import './ServiceTable.js';

const componentStyles = css`
  :host {
    display: block;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-header {
    padding: 1rem;
    border-bottom: 1px solid #E5E7EB;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #6B7280;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
  }

  .close-button:hover {
    color: #374151;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem;
    border-top: 1px solid #E5E7EB;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
  }

  .button-primary {
    background-color: #4F46E5;
    color: white;
  }

  .button-primary:hover {
    background-color: #4338CA;
  }

  .button-secondary {
    background-color: white;
    border-color: #D1D5DB;
    color: #374151;
  }

  .button-secondary:hover {
    background-color: #F9FAFB;
  }
`;

export class Modal extends LitElement {
  static get properties() {
    return {
      isOpen: { type: Boolean },
      title: { type: String }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.isOpen = false;
    this.title = 'Plan Details';
  }

  close() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  save() {
    // Handle save logic here
    console.log('Saving...');
    this.close();
  }

  render() {
    if (!this.isOpen) return null;

    return html`
      <div class="modal-backdrop" @click="${this.handleBackdropClick}">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">${this.title}</h2>
            <button class="close-button" @click="${this.close}">&times;</button>
          </div>
          
          <div class="modal-body">
            <service-table></service-table>
          </div>
          
          <div class="modal-footer">
            <button class="button button-secondary" @click="${this.close}">Cancel</button>
            <button class="button button-primary" @click="${this.save}">Save Changes</button>
          </div>
        </div>
      </div>
    `;
  }
}

// Prevent double registration
if (!customElements.get('plan-modal')) {
  customElements.define('plan-modal', Modal);
} 