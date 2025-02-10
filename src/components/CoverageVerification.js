import { LitElement, html, css, unsafeCSS } from 'lit';
import './PatientSearch.js';
import './InsuranceContractManager.js';
import nphiesLogo from '../styles/nphies.png';
import avatarImage from '../styles/avatar.png';
import avatarBarcode from '../styles/avatar-barcode.png';
import userIcon from '../styles/user.svg';
import shieldIcon from '../styles/shield.svg';
import { 
  BENEFIT_CATEGORIES, 
  SERVICE_TYPE_TO_CATEGORY_MAPPING,
  getCategoryName,
  getCategoryDescription,
  getSuggestedCategories,
  getIntelligentMapping
} from '../constants/benefitMappings.js';
import API_ENDPOINTS from '@config/api.js';

const componentStyles = css`
  :host {
    display: block;
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  .wrapper {
    background: white;
    border-radius: 0.75rem;
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .header {
    background: #463AA1;
    color: white;
    padding: 1.5rem 2rem;
    font-size: 1.75rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .close-button svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: currentColor;
    stroke-width: 2;
  }

  .nphies-logo {
    width: 140px;
    height: auto;
    content: url('${unsafeCSS(nphiesLogo)}');
  }

  .tabs {
    display: flex;
    background: #463AA1;
    padding: 0 2rem;
  }

  .tab {
    padding: 1rem 2.5rem;
    color: white;
    cursor: pointer;
    background: transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .tab.active {
    background: white;
    color: #463AA1;
  }

  .content {
    padding: 2rem 0;
    background: white;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    position: relative;
    width: 100%;
    overflow-x: hidden;
  }

  .search-wrapper {
    padding: 0 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .patient-info {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;
    width: 100%;
    box-sizing: border-box;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .images-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .info-field {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #E5E7EB;
  }

  .field-label {
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
  }

  .field-value {
    font-size: 0.875rem;
    color: #111827;
    font-weight: 600;
    text-transform: uppercase;
  }

  .avatar {
    width: 140px;
    height: 140px;
    border-radius: 0.5rem;
    content: url('${unsafeCSS(avatarImage)}');
    object-fit: cover;
  }

  .barcode {
    width: 140px;
    height: auto;
    content: url('${unsafeCSS(avatarBarcode)}');
    object-fit: contain;
  }

  .verify-button {
    margin: 2rem 2rem 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2.5rem;
    background: #463AA1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.2s ease;
    position: relative;
  }

  .verify-button:disabled {
    background: #6B7280;
    cursor: default;
  }

  .verify-button .loader {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .section-header {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    text-transform: uppercase;
    margin: 0;
  }

  .verified-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background-color: #DEF7EC;
    color: #03543F;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease;
    z-index: 1;
  }

  .verified-badge svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .company-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .company-icon {
    width: 1.5rem;
    height: 1.5rem;
    content: url('${unsafeCSS(shieldIcon)}');
  }

  .insurance-grid {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .coverage-details-grid {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-in {
    animation: slideIn 0.3s ease-out forwards;
  }

  .mapping-status {
    margin-left: 0.5rem;
  }

  .benefits-mapping-grid {
    padding: 0 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .mapping-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.5rem;
    padding: 1rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: white;
  }

  .service-type {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .benefit-selector select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    min-height: 100px;
  }

  .benefit-selector option {
    padding: 0.5rem;
    border-bottom: 1px solid #F3F4F6;
  }

  .total-allowed {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .total-allowed .field-value {
    font-size: 1.125rem;
    color: #059669;
  }

  .mapped-benefits-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mapped-benefit {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: #F9FAFB;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .mapped-benefit span:last-child {
    color: #059669;
    font-weight: 600;
  }

  .benefits-grid {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .primary-button {
    background: #059669;
  }

  .primary-button:hover {
    background: #047857;
  }

  .map-benefits-button {
    margin: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2.5rem;
    background: #059669;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }

  .map-benefits-button:hover {
    background: #047857;
  }

  .back-button {
    margin: 1rem 2rem;
    padding: 0.5rem 1rem;
    background: #F3F4F6;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .verification-form {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .form-section {
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    box-sizing: border-box;
  }

  .form-section:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08);
  }

  .form-section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-transform: uppercase;
  }

  .form-section-title::before {
    content: '';
    width: 4px;
    height: 1.25rem;
    background: #463AA1;
    border-radius: 2px;
    display: block;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .input-group input,
  .input-group select {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #111827;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .input-group input:hover,
  .input-group select:hover {
    background-color: #F3F4F6;
  }

  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
    background-color: #ffffff;
  }

  .secondary-button {
    background: #F3F4F6;
    color: #374151;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .secondary-button:hover {
    background: #E5E7EB;
  }

  /* Modern Form Styles */
  .form-container {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  .form-field-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #111827;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .form-input:hover {
    background-color: #F3F4F6;
  }

  .form-input:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
    background-color: #ffffff;
  }

  .form-label {
    position: absolute;
    top: -0.75rem;
    left: 0.75rem;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    color: #6B7280;
    background-color: #ffffff;
    transition: all 0.2s ease;
  }

  .form-input:focus + .form-label {
    color: #463AA1;
    font-weight: 500;
  }

  .form-select {
    appearance: none;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #111827;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    transition: all 0.2s ease;
  }

  .form-select:hover {
    background-color: #F3F4F6;
  }

  .form-select:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
    background-color: #ffffff;
  }

  .insurance-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .insurance-text {
    font-size: 0.875rem;
    color: #374151;
  }

  .toggle-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    background-color: #F3F4F6;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-button:hover {
    background-color: #E5E7EB;
    transform: translateY(-1px);
  }

  .toggle-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .action-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border: none;
  }

  .primary-action {
    background-color: #463AA1;
    color: #ffffff;
  }

  .primary-action:hover {
    background-color: #3c319c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(70, 58, 161, 0.2);
  }

  .primary-action:active {
    transform: translateY(0);
  }

  .secondary-action {
    background-color: #F3F4F6;
    color: #374151;
  }

  .secondary-action:hover {
    background-color: #E5E7EB;
    transform: translateY(-1px);
  }

  .button-loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .form-input.dirty, .form-select.dirty {
    border-color: #F59E0B;
    background-color: #FFFBEB;
  }

  .form-input.dirty:focus, .form-select.dirty:focus {
    border-color: #F59E0B;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }

  /* Grid Layout */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .insurance-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .insurance-text {
    font-size: 0.875rem;
    color: #374151;
  }

  .toggle-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    background-color: #F3F4F6;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-button:hover {
    background-color: #E5E7EB;
    transform: translateY(-1px);
  }

  .toggle-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E5E7EB;
  }

  .verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background-color: #DEF7EC;
    color: #03543F;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .verified-badge:hover {
    background-color: #BCF0DA;
  }

  /* Add box-sizing to all elements */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Ensure form inputs don't overflow */
  .form-input,
  .form-select,
  .input-group input,
  .input-group select {
    width: 100%;
    box-sizing: border-box;
  }

  /* Fix grid layouts for better responsiveness */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .insurance-grid,
    .coverage-details-grid,
    .benefits-grid {
      grid-template-columns: 1fr;
    }

    .patient-info {
      grid-template-columns: 1fr;
    }
  }

  @keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); background-color: #059669; }
    100% { transform: scale(1); }
  }

  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }

  .success-animation {
    animation: successPulse 0.5s ease-in-out;
    background-color: #059669 !important;
  }

  .error-animation {
    animation: errorShake 0.5s ease-in-out;
    background-color: #EF4444 !important;
  }

  .error-message {
    color: #EF4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    text-align: center;
    font-weight: 500;
    padding: 0.5rem;
    background-color: #FEE2E2;
    border-radius: 0.375rem;
    margin: 1rem 2rem;
  }

  .mapped-benefits-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .mapped-benefit {
    background: var(--surface-color, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .benefit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .benefit-name {
    font-weight: 600;
    color: var(--text-primary, #111827);
  }

  .benefit-amount {
    font-weight: 600;
    color: var(--text-success, #059669);
  }

  .benefit-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }

  .benefit-detail {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-label {
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
  }

  .detail-value {
    font-weight: 500;
    color: var(--text-primary, #111827);
  }

  .total-allowed {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
    font-weight: 600;
    color: var(--text-primary, #111827);
    text-align: right;
  }

  .benefit-selector select {
    width: 100%;
    min-height: 150px;
    padding: 0.5rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.375rem;
    background-color: var(--surface-color, #ffffff);
    color: var(--text-primary, #111827);
  }

  .benefit-selector select option {
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .benefit-selector select option:last-child {
    border-bottom: none;
  }

  .benefits-mapping-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .mapping-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
    align-items: start;
    padding: 1rem;
    background: var(--surface-color, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
  }

  .service-type {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .service-type .field-label {
    font-weight: 600;
    color: var(--text-primary, #111827);
  }

  .service-type .field-value {
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
  }

  .benefits-section {
    padding: 0 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .benefits-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .auto-map-all-button {
    position: relative;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #463AA1, #5B4FC7);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(70, 58, 161, 0.1);
    overflow: hidden;
  }

  .auto-map-all-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(45deg);
    animation: glowEffect 3s infinite;
  }

  .auto-map-all-button:hover {
    background: linear-gradient(135deg, #5B4FC7, #463AA1);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -2px rgba(70, 58, 161, 0.2);
  }

  .auto-map-all-button:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
    transform: none;
  }

  .auto-map-all-button .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.3s ease;
  }

  .mapping-status {
    font-size: 0.875rem;
    color: #6B7280;
    margin-top: 0.5rem;
    text-align: center;
  }

  .service-tabs {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #E5E7EB;
  }

  .service-tab {
    padding: 0.5rem 1rem;
    background: #F3F4F6;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .service-tab:hover {
    background: #E5E7EB;
  }

  .service-tab.active {
    background: #463AA1;
    color: white;
    border-color: #463AA1;
  }

  .benefits-table-container {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .benefits-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
  }

  .benefits-search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    width: 300px;
  }

  .benefits-search input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.875rem;
  }

  .benefits-table {
    width: 100%;
    border-collapse: collapse;
  }

  .benefits-table th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #6B7280;
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
  }

  .benefits-table td {
    padding: 1rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #E5E7EB;
  }

  .benefit-row {
    transition: background-color 0.2s ease;
  }

  .benefit-row:hover {
    background-color: #F9FAFB;
  }

  .benefit-row.mapped {
    background-color: #F0FDF4;
  }

  .benefit-name {
    font-weight: 500;
    color: #111827;
  }

  .benefit-description {
    color: #6B7280;
    font-size: 0.75rem;
  }

  .benefit-amount {
    font-weight: 600;
    color: #059669;
  }

  .benefit-action {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .map-button {
    padding: 0.5rem 1rem;
    background: #463AA1;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .map-button:hover {
    background-color: #3c319c;
  }

  .unmap-button {
    padding: 0.5rem 1rem;
    background: #FEE2E2;
    color: #991B1B;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .unmap-button:hover {
    background-color: #FEE2E2;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .summary-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .summary-label {
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
  }

  .summary-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }

  .summary-subtext {
    font-size: 0.75rem;
    color: #059669;
    margin-top: 0.25rem;
  }

  .contract-setup-section {
    padding: 0 2rem;
    margin-top: 2rem;
  }

  .contract-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }

  .primary-button {
    background: #463AA1;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .primary-button:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }

  .primary-button:hover:not(:disabled) {
    background: #3c319c;
    transform: translateY(-1px);
  }

  .auto-map-button {
    padding: 0.75rem 1.5rem;
    background: #059669;
    color: white;
    border: none;
    border-radius: 0.375rem;
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-weight: 600;
  }

  .auto-map-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(45deg);
    animation: glowEffect 3s infinite;
  }

  @keyframes glowEffect {
    0% {
      transform: rotate(45deg) translateX(-100%) translateY(-100%);
    }
    50% {
      transform: rotate(45deg) translateX(0%) translateY(0%);
    }
    100% {
      transform: rotate(45deg) translateX(100%) translateY(100%);
    }
  }

  .auto-map-button:hover {
    background: #047857;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.2);
  }

  .benefits-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .benefit-row.recommended {
    background-color: #F0FDF4;
  }

  .map-button.recommended {
    background-color: #059669;
  }

  .category-name {
    position: relative;
    cursor: help;
  }

  .category-name:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background: #374151;
    color: white;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
  }

  .overall-progress {
    grid-column: span 2;
    background: #F0F9FF;
    border: 1px solid #BAE6FD;
  }

  .progress-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }

  .progress-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .progress-label {
    color: #6B7280;
    min-width: 4rem;
  }

  .progress-value {
    font-weight: 600;
    color: #0369A1;
  }

  .progress-remaining {
    color: #6B7280;
    font-size: 0.75rem;
  }

  .progress-bar {
    height: 0.5rem;
    background: #E0F2FE;
    border-radius: 0.25rem;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: #0EA5E9;
    border-radius: 0.25rem;
    transition: width 0.3s ease;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #463AA1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    margin-top: 1rem;
    color: #463AA1;
    font-weight: 500;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export class CoverageVerification extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      selectedPatient: { type: Object },
      insuranceInfo: { type: Object },
      isVerifying: { type: Boolean },
      isVerified: { type: Boolean },
      coverageDetails: { type: Object },
      serviceTypes: { type: Array },
      mappedBenefits: { type: Object },
      availableBenefits: { type: Array },
      isMappingComplete: { type: Boolean },
      providerInfo: { type: Object },
      locationInfo: { type: Object },
      servicePeriod: { type: Object },
      facilities: { type: Array },
      insuranceCompanies: { type: Array },
      selectedFacility: { type: Object },
      selectedInsuranceCompany: { type: Object },
      isManualMode: { type: Boolean },
      manualFormData: { type: Object },
      dirtyFields: { type: Object },
      mappedBenefitIds: { type: Set },
      activeServiceTypeId: { type: Number },
      benefitSearchQuery: { type: String },
      selectedContract: { type: Object },
      selectedPlan: { type: Object },
      isLoading: { type: Boolean },
      isAutoMapping: { type: Boolean },
      autoMappingProgress: { type: Number },
      lastAutoMapResult: { type: String }
    };
  }

  static get styles() {
    return [
      componentStyles,
      css`
        @keyframes successPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); background-color: #059669; }
          100% { transform: scale(1); }
        }

        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .success-animation {
          animation: successPulse 0.5s ease-in-out;
          background-color: #059669 !important;
        }

        .error-animation {
          animation: errorShake 0.5s ease-in-out;
          background-color: #EF4444 !important;
        }

        .error-message {
          color: #EF4444;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          text-align: center;
          font-weight: 500;
          padding: 0.5rem;
          background-color: #FEE2E2;
          border-radius: 0.375rem;
          margin: 1rem 2rem;
        }

        .benefits-report {
          padding: 2rem;
          background: white;
        }

        .report-header {
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .report-header h2 {
          color: #1F2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .report-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-label {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .meta-value {
          color: #111827;
          font-weight: 500;
        }

        .report-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-box {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
        }

        .summary-title {
          color: #6B7280;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-value {
          color: #111827;
          font-size: 2rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        .summary-subtitle {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .service-type-breakdown {
          margin-top: 2rem;
        }

        .service-type-breakdown h3 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
          gap: 1.5rem;
        }

        .breakdown-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          padding: 1.5rem;
        }

        .breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .breakdown-header h4 {
          color: #111827;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .benefit-count {
          background: #EEF2FF;
          color: #4F46E5;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .breakdown-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .stat-value {
          color: #111827;
          font-weight: 500;
        }

        .high-utilization { color: #DC2626; }
        .medium-utilization { color: #D97706; }
        .low-utilization { color: #059669; }

        .benefits-detail-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .benefits-detail-table th {
          background: #F9FAFB;
          color: #374151;
          font-weight: 500;
          text-align: left;
          padding: 0.75rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .benefits-detail-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #E5E7EB;
          color: #111827;
        }

        .benefits-detail-table tr:last-child td {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .breakdown-grid {
            grid-template-columns: 1fr;
          }

          .breakdown-stats {
            grid-template-columns: 1fr;
          }

          .benefits-detail-table {
            display: block;
            overflow-x: auto;
          }
        }

        .contract-setup-section {
          padding: 0 2rem;
          margin-top: 2rem;
        }

        .contract-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        }

        .primary-button {
          background: #463AA1;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button:disabled {
          background: #9CA3AF;
          cursor: not-allowed;
        }

        .primary-button:hover:not(:disabled) {
          background: #3c319c;
          transform: translateY(-1px);
        }

        .overall-progress {
          grid-column: span 2;
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
        }

        .progress-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 0.5rem 0;
        }

        .progress-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .progress-label {
          color: #6B7280;
          min-width: 4rem;
        }

        .progress-value {
          font-weight: 600;
          color: #0369A1;
        }

        .progress-remaining {
          color: #6B7280;
          font-size: 0.75rem;
        }

        .progress-bar {
          height: 0.5rem;
          background: #E0F2FE;
          border-radius: 0.25rem;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: #0EA5E9;
          border-radius: 0.25rem;
          transition: width 0.3s ease;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .contract-mode-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: #F9FAFB;
          border-radius: 0.5rem;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: #059669;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .toggle-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .benefits-section {
          padding: 0 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .benefits-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #F9FAFB;
          border-bottom: 1px solid #E5E7EB;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .auto-map-all-button {
          position: relative;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #463AA1, #5B4FC7);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
          width: 100%;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(70, 58, 161, 0.1);
          overflow: hidden;
        }

        .auto-map-all-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
          transform: rotate(45deg);
          animation: glowEffect 3s infinite;
        }

        .auto-map-all-button:hover {
          background: linear-gradient(135deg, #5B4FC7, #463AA1);
          transform: translateY(-2px);
          box-shadow: 0 6px 8px -2px rgba(70, 58, 161, 0.2);
        }

        .auto-map-all-button:disabled {
          background: #9CA3AF;
          cursor: not-allowed;
          transform: none;
        }

        .auto-map-all-button .progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.5);
          transition: width 0.3s ease;
        }

        .mapping-status {
          font-size: 0.875rem;
          color: #6B7280;
          margin-top: 0.5rem;
          text-align: center;
        }
      `
    ];
  }

  constructor() {
    super();
    this.activeTab = 'coverage';
    this.selectedPatient = null;
    this.isVerifying = false;
    this.isVerified = false;
    this.isMappingComplete = false;
    this.serviceTypes = [
      { id: 1, name: 'E & M Codes', mapped: [] },
      { id: 2, name: 'CPT Services', mapped: [] },
      { id: 3, name: 'Laboratory', mapped: [] },
      { id: 4, name: 'Radiology', mapped: [] },
      { id: 5, name: 'Dental', mapped: [] },
      { id: 6, name: 'HCPCS', mapped: [] },
      { id: 7, name: 'Room & Board', mapped: [] },
      { id: 8, name: 'Pharmacy', mapped: [] },
      { id: 9, name: 'HA Service Codes', mapped: [] },
      { id: 10, name: 'DRG', mapped: [] },
      { id: 11, name: 'Kitchen Services', mapped: [] },
      { id: 12, name: 'Endoscopy', mapped: [] },
      { id: 13, name: 'Orthodontic', mapped: [] },
      { id: 14, name: 'Maternity', mapped: [] },
      { id: 15, name: 'Surgical Packages', mapped: [] }
    ];
    
    this.mappedBenefits = {};
    this.insuranceInfo = null;
    this.coverageDetails = null;

    // Initialize properties
    this.providerInfo = {
      licenseNumber: 'PR-FHIR',
      name: 'Saudi General Clinic',
      type: '5',
      active: true
    };
    
    this.locationInfo = {
      licenseNumber: 'GACH',
      name: 'Test Provider',
      active: true
    };

    this.servicePeriod = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString().split('T')[0] + 'T23:59:59'
    };

    // Initialize arrays and objects
    this.facilities = [];
    this.insuranceCompanies = [];
    this.selectedFacility = null;
    this.selectedInsuranceCompany = null;
    this.selectedContract = null;
    this.selectedPlan = null;
    this.isManualMode = false;
    this.manualFormData = {
      facilityLicense: '',
      orgLicense: '',
      organizationLicenseNumber: '',
      locationLicenseNumber: '',
      insuranceLicenseNumber: '',
      occupation: '',
      maritalStatus: ''
    };
    this.dirtyFields = {};
    this.mappedBenefitIds = new Set();
    this.activeServiceTypeId = 1;
    this.benefitSearchQuery = '';

    this.isLoading = false;
    this.isAutoMapping = false;
    this.autoMappingProgress = 0;
    this.lastAutoMapResult = '';

    // Load data
    this.loadFacilities();
    this.loadInsuranceCompanies();

    // Add event listener for switch-tab
    this.addEventListener('switch-tab', this.switchTab);
  }

  async loadFacilities() {
    try {
      const response = await fetch(API_ENDPOINTS.FACILITY.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: '',
          page: 1,
          pageSize: 10
        })
      });
      const result = await response.json();
      if (result.isSuccessfull) {
        this.facilities = result.dynamicResult;
        // Auto-select facility if patient has facilityId
        if (this.selectedPatient && this.selectedPatient.facilityId) {
          const autoFacility = this.facilities.find(f => f.id === this.selectedPatient.facilityId);
          if (autoFacility) {
            this.selectedFacility = autoFacility;
          }
        }
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
    }
  }

  async loadInsuranceCompanies() {
    try {
      const response = await fetch(API_ENDPOINTS.INSURANCE_COMPANY.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 100
        })
      });
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        this.insuranceCompanies = result.dynamicResult;
      }
    } catch (error) {
      console.error('Error fetching insurance companies:', error);
    }
  }

  handleFacilityChange(e) {
    const facilityId = e.target.value;
    this.selectedFacility = this.facilities.find(f => f.id === parseInt(facilityId));
    this.requestUpdate();
  }

  handleInsuranceCompanyChange(e) {
    const companyId = e.target.value;
    this.selectedInsuranceCompany = this.insuranceCompanies.find(c => c.id === parseInt(companyId));
    this.requestUpdate();
  }

  toggleManualMode() {
    this.isManualMode = !this.isManualMode;
    this.requestUpdate();
  }

  handleManualInputChange(e) {
    const { name, value } = e.target;
    this.manualFormData = { ...this.manualFormData, [name]: value };
    // Mark the field as dirty
    this.dirtyFields = { ...this.dirtyFields, [name]: true };
    this.requestUpdate();
  }

  async handlePatientSelected(e) {
    const selectedPatient = e.detail;
    this.selectedPatient = selectedPatient;
    
    // Reset states
    this.insuranceInfo = null;
    this.isVerified = false;
    this.availableBenefits = [];
    
    console.log('Patient selected:', {
      patientId: this.selectedPatient.id,
      hasInsuranceCoverages: Boolean(this.selectedPatient.insuranceCoverages),
      coveragesLength: this.selectedPatient.insuranceCoverages?.length,
      coverages: this.selectedPatient.insuranceCoverages,
      isNphiesVerified: this.selectedPatient.isNphiesVerified
    });

    // Check if patient has valid NPHIES verification
    if (this.selectedPatient.isNphiesVerified && this.selectedPatient.insuranceCoverages?.length > 0) {
      console.log('Patient has valid NPHIES verification');
      this.isVerified = true;
      
      // Transform and set available benefits from insurance coverage
      const coverage = this.selectedPatient.insuranceCoverages[0];
      if (coverage.benefits && Array.isArray(coverage.benefits)) {
        this.availableBenefits = coverage.benefits.map(benefit => ({
          id: benefit.id || benefit.benefitId,
          name: benefit.name || benefit.benefitName || 'Unnamed Benefit',
          description: benefit.description || benefit.benefitDescription || '',
          allowedMoney: benefit.allowedMoney || benefit.maxAmount || 0,
          allowedCurrency: benefit.currency || 'SAR',
          usedMoney: benefit.usedAmount || 0,
          usedCurrency: benefit.currency || 'SAR',
          categoryCode: benefit.categoryCode || benefit.category || 'GEN',
          networkCode: benefit.networkCode || benefit.network || 'IN'
        }));

        console.log('Transformed benefits:', this.availableBenefits);
      } else {
        console.warn('No benefits found in insurance coverage');
      }
      
      // Set insurance info
      this.insuranceInfo = {
        companyName: this.selectedPatient.insuranceInfo?.company || '',
        companyCode: '',  // Will be set when proceeding to contract setup
        memberId: this.selectedPatient.insuranceInfo?.memberID || '',
        policyNumber: this.selectedPatient.insuranceInfo?.policyNumber || '',
        startDate: this.selectedPatient.coverageDetails?.startDate || '',
        endDate: this.selectedPatient.coverageDetails?.endDate || '',
        isVerified: true,
        isNphiesVerified: true,
        coverageDetails: this.selectedPatient.coverageDetails || {}
      };
    } else {
      console.log('Patient is not NPHIES verified - requires verification');
      this.isVerified = false;
    }
    
    // Set facility if available
    if (this.selectedPatient.facilityId && this.facilities?.length > 0) {
      const autoFacility = this.facilities.find(f => f.id === this.selectedPatient.facilityId);
      if (autoFacility) {
        this.selectedFacility = autoFacility;
      }
    }
    
    this.requestUpdate();
  }

  async switchTab(tab) {
    if (typeof tab === 'object' && tab.detail) {
      // Handle event from floating button
      this.activeTab = tab.detail.tab;
    } else {
      // Handle direct tab switch
      this.activeTab = tab;
    }
    
    // Reset states when switching to coverage tab
    if (this.activeTab === 'coverage') {
      this.isVerified = false;
      this.isVerifying = false;
      this.selectedPatient = null;
      this.insuranceInfo = null;
      this.coverageDetails = null;
      
      // Request update to ensure PatientSearch is re-rendered
      this.requestUpdate();
    }
  }

  async handleVerify() {
    this.isVerifying = true;
    
    try {
      const payload = this.prepareVerificationPayload();
      console.log('Verification Payload:', payload);
      
      const response = await fetch(API_ENDPOINTS.ELIGIBILITY.VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('Verification Result:', result);

      if (result.isSuccessfull && result.dynamicResult && Array.isArray(result.dynamicResult) && result.dynamicResult.length > 0) {
        // Success case - only when we have actual benefits data
        this.isVerified = true;
        this.availableBenefits = result.dynamicResult.map(benefit => ({
          id: benefit.id,
          categoryCode: benefit.categoryCode,
          categorySystem: benefit.categorySystem,
          name: benefit.name || 'Health Benefit Plan Coverage',
          description: benefit.description || 'Policy Maximum Annual Limit and Approval limit',
          networkCode: benefit.networkCode,
          networkSystem: benefit.networkSystem,
          unitCode: benefit.unitCode,
          unitSystem: benefit.unitSystem,
          termCode: benefit.termCode,
          termSystem: benefit.termSystem,
          allowedMoney: benefit.allowedMoney || 0,
          allowedCurrency: benefit.allowedCurrency || 'SAR',
          usedMoney: benefit.usedMoney || 0,
          usedCurrency: benefit.usedCurrency || 'SAR',
          benefitTypeCode: benefit.benefitTypeCode,
          benefitTypeSystem: benefit.benefitTypeSystem
        }));

        // Add success animation class
        const verifyButton = this.shadowRoot.querySelector('.verify-button');
        verifyButton.classList.add('success-animation');

        // Transition to benefits tab after a short delay
        setTimeout(() => {
          this.activeTab = 'benefits';
          this.requestUpdate();
        }, 1500);

      } else {
        // Error case - includes empty dynamicResult case
        let errorMessage = 'Verification failed';
        if (result.isSuccessfull && (!result.dynamicResult || !result.dynamicResult.length)) {
          errorMessage = 'No benefits data found. The response was unidentified or incomplete.';
        } else if (result.errorMessage) {
          errorMessage = result.errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      
      // Show error message
      const verifyButton = this.shadowRoot.querySelector('.verify-button');
      verifyButton.classList.add('error-animation');
      
      // Add error message element with more prominent styling
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = error.message || 'Verification failed. Please try again.';
      verifyButton.parentNode.insertBefore(errorDiv, verifyButton.nextSibling);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        errorDiv.remove();
        verifyButton.classList.remove('error-animation');
      }, 5000);
      
    } finally {
      this.isVerifying = false;
    }
  }

  startBenefitMapping() {
    this.activeTab = 'benefits';
  }

  // Get available benefits for a service type (excluding already mapped benefits)
  getAvailableBenefitsForType(currentServiceTypeId) {
    if (!this.availableBenefits) return [];
    
    console.log('All available benefits:', this.availableBenefits);
    
    const filteredBenefits = this.availableBenefits.filter(benefit => {
      // A benefit is available if:
      // 1. It's not mapped to any service type OR
      // 2. It's only mapped to the current service type
      const isMappedToCurrentType = this.serviceTypes
        .find(type => type.id === currentServiceTypeId)?.mapped
        ?.some(mappedBenefit => mappedBenefit.id === benefit.id);

      const isMappedToOtherType = this.serviceTypes
        .filter(type => type.id !== currentServiceTypeId)
        .some(type => type.mapped?.some(mappedBenefit => mappedBenefit.id === benefit.id));

      console.log(`Benefit ${benefit.id} (${benefit.name}):`, {
        isMappedToCurrentType,
        isMappedToOtherType,
        isAvailable: !isMappedToOtherType || isMappedToCurrentType
      });

      return !isMappedToOtherType || isMappedToCurrentType;
    });

    console.log(`Available benefits for service type ${currentServiceTypeId}:`, filteredBenefits);
    return filteredBenefits;
  }

  handleBenefitMapping(serviceTypeId, selectedBenefits) {
    console.log('Handling benefit mapping:', {
      serviceTypeId,
      selectedBenefits,
      previousMappedBenefits: this.serviceTypes.find(type => type.id === serviceTypeId)?.mapped
    });

    // Get the current service type's previously mapped benefits
    const currentType = this.serviceTypes.find(type => type.id === serviceTypeId);
    const previouslyMapped = new Set(currentType.mapped?.map(benefit => benefit.id) || []);
    const newlyMapped = new Set(selectedBenefits.map(benefit => benefit.id));

    console.log('Mapping changes:', {
      previouslyMapped: Array.from(previouslyMapped),
      newlyMapped: Array.from(newlyMapped),
      unmappedBenefits: Array.from(previouslyMapped).filter(id => !newlyMapped.has(id)),
      newlyAddedBenefits: Array.from(newlyMapped).filter(id => !previouslyMapped.has(id))
    });

    // Update the service types with new mapping
    this.serviceTypes = this.serviceTypes.map(type => {
      if (type.id === serviceTypeId) {
        return {
          ...type,
          mapped: selectedBenefits
        };
      }
      return type;
    });

    // Update mappedBenefitIds
    this.mappedBenefitIds = new Set(
      this.serviceTypes.flatMap(type => type.mapped?.map(benefit => benefit.id) || [])
    );

    console.log('Updated state:', {
      serviceTypes: this.serviceTypes,
      mappedBenefitIds: Array.from(this.mappedBenefitIds),
      availableBenefits: this.availableBenefits
    });

    this.requestUpdate();
  }

  calculateTotalAllowed(mappedBenefits) {
    if (!mappedBenefits || !Array.isArray(mappedBenefits)) return 0;
    return mappedBenefits.reduce((sum, benefit) => sum + (benefit.allowedMoney || 0), 0);
  }

  handleBack() {
    this.selectedPatient = null;
    this.isVerified = false;
    this.isMappingComplete = false;
  }

  renderPatientInfo() {
    if (!this.selectedPatient) return null;
    const isValidIqamaId = this.validateNationalId(this.selectedPatient.nationalId);
    
    return html`
      <div class="form-container">
        <div class="form-section">
          <h4 class="form-section-title">Patient Information</h4>
          <div class="patient-info">
            <div class="info-grid">
              <div class="info-field">
                <div class="field-label">
                  <img src="${userIcon}" class="user-icon" alt="">
                  FULL NAME
                </div>
                <div class="field-value">${this.selectedPatient.name}</div>
              </div>
              <div class="info-field">
                <div class="field-label">
                  <img src="${userIcon}" class="user-icon" alt="">
                  PATIENT TYPE
                </div>
                <div class="field-value">${this.selectedPatient.patientType}</div>
              </div>
              <div class="info-field">
                <div class="field-label">
                  <img src="${userIcon}" class="user-icon" alt="">
                  NATIONAL ID / PASSPORT
                </div>
                ${isValidIqamaId ? html`
                  <div class="field-value">${this.selectedPatient.nationalId}</div>
                ` : html`
                  <div class="form-field-group">
                    <input 
                      type="text" 
                      name="nationalId" 
                      .value="${this.selectedPatient.nationalId || ''}"
                      @input="${this.handleNationalIdChange}"
                      class="form-input ${this.dirtyFields.nationalId ? (isValidIqamaId ? '' : 'dirty') : ''}"
                      placeholder="Enter valid ID"
                    />
                    ${this.dirtyFields.nationalId && !isValidIqamaId ? html`
                      <div class="error-message">Patient Identifier shall consist of 10 digits starting with 2 when Iqama ID used</div>
                    ` : ''}
                    <input 
                      type="text" 
                      name="passportNumber" 
                      .value="${this.selectedPatient.passportNumber || ''}"
                      @input="${(e) => this.handleManualInputChange(e)}"
                      class="form-input ${this.dirtyFields.passportNumber ? 'dirty' : ''}"
                      placeholder="Enter Passport Number"
                    />
                  </div>
                `}
              </div>
              <div class="info-field">
                <div class="field-label">
                  <img src="${userIcon}" class="user-icon" alt="">
                  MOBILE
                </div>
                <div class="field-value">${this.selectedPatient.mobile}</div>
              </div>
            </div>
            <div class="images-container">
              <img src="${avatarImage}" class="avatar" alt="Patient Photo">
              <img src="${avatarBarcode}" class="barcode" alt="Barcode">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderInsuranceInfo() {
    const insuranceInfo = this.selectedPatient?.insuranceInfo;
    const coverageDetails = this.selectedPatient?.coverageDetails;
    
    return html`
      <div class="form-container">
        <div class="form-section">
          <h4 class="form-section-title">Insurance Information</h4>
          <div class="section-header">
            ${this.isVerified ? html`
              <div class="verified-badge">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Verified
              </div>
            ` : null}
          </div>
          ${insuranceInfo ? html`
            <div class="insurance-grid">
              <div class="info-field">
                <div class="field-label">INSURANCE COMPANY</div>
                <div class="company-info">
                  <img class="company-icon" alt="">
                  <div class="field-value">${insuranceInfo.company}</div>
                </div>
              </div>
              <div class="info-field">
                <div class="field-label">CONTRACT#</div>
                <div class="field-value">${insuranceInfo.contractNumber}</div>
              </div>
              <div class="info-field">
                <div class="field-label">MEMBER ID</div>
                <div class="field-value">${insuranceInfo.memberID}</div>
              </div>
              <div class="info-field">
                <div class="field-label">POLICY#</div>
                <div class="field-value">${insuranceInfo.policyNumber}</div>
              </div>
              <div class="info-field">
                <div class="field-label">INSURANCE COVERAGE PLAN</div>
                <div class="field-value">${insuranceInfo.coveragePlan}</div>
              </div>
              ${insuranceInfo.planDetails ? html`
                <div class="info-field">
                  <div class="field-label">PLAN CATEGORY</div>
                  <div class="field-value">${insuranceInfo.planDetails.planCategory || 'N/A'}</div>
                </div>
                <div class="info-field">
                  <div class="field-label">PLAN CODE</div>
                  <div class="field-value">${insuranceInfo.planDetails.planCode || 'N/A'}</div>
                </div>
                <div class="info-field">
                  <div class="field-label">ANNUAL LIMIT</div>
                  <div class="field-value">${insuranceInfo.planDetails.annualLimit || 'N/A'}</div>
                </div>
              ` : null}
              ${insuranceInfo.contractDetails ? html`
                <div class="info-field">
                  <div class="field-label">CONTRACT NAME</div>
                  <div class="field-value">${insuranceInfo.contractDetails.contractName || 'N/A'}</div>
                </div>
                <div class="info-field">
                  <div class="field-label">CONTRACT DATE</div>
                  <div class="field-value">${insuranceInfo.contractDetails.contractDate || 'N/A'}</div>
                </div>
              ` : null}
            </div>
            ${coverageDetails ? html`
              <div class="form-section">
                <h4 class="form-section-title">Coverage Details</h4>
                <div class="insurance-grid">
                  <div class="info-field">
                    <div class="field-label">TYPE</div>
                    <div class="field-value">${coverageDetails.type}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">DEPENDENT</div>
                    <div class="field-value">${coverageDetails.dependent}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">RELATIONSHIP</div>
                    <div class="field-value">${coverageDetails.relationship}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">START DATE</div>
                    <div class="field-value">${new Date(coverageDetails.startDate).toLocaleDateString()}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">END DATE</div>
                    <div class="field-value">${new Date(coverageDetails.endDate).toLocaleDateString()}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">NETWORK</div>
                    <div class="field-value">${coverageDetails.network}</div>
                  </div>
                  <div class="info-field">
                    <div class="field-label">SUBROGATION</div>
                    <div class="field-value">${coverageDetails.subrogation}</div>
                  </div>
                  ${coverageDetails.lastEligibilityVerificationDate ? html`
                    <div class="info-field">
                      <div class="field-label">LAST ELIGIBILITY CHECK</div>
                      <div class="field-value">${new Date(coverageDetails.lastEligibilityVerificationDate).toLocaleDateString()}</div>
                    </div>
                  ` : null}
                </div>
              </div>
            ` : null}
          ` : html`
            <div class="insurance-grid">
              <div class="info-field">
                <div class="field-label">STATUS</div>
                <div class="field-value">SELF PAY</div>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  renderCoverageDetails() {
    if (!this.isVerified || !this.selectedPatient?.coverageDetails) return null;

    const coverageDetails = this.selectedPatient.coverageDetails;
    return html`
      <div class="section-header">
        <h3 class="section-title">COVERAGE DETAILS</h3>
      </div>
      <div class="coverage-details-grid">
        <div class="info-field">
          <div class="field-label">TYPE</div>
          <div class="field-value">${coverageDetails.type}</div>
        </div>
        <div class="info-field">
          <div class="field-label">DEPENDENT</div>
          <div class="field-value">${coverageDetails.dependent}</div>
        </div>
        <div class="info-field">
          <div class="field-label">RELATIONSHIP</div>
          <div class="field-value">${coverageDetails.relationship}</div>
        </div>
        <div class="info-field">
          <div class="field-label">START DATE</div>
          <div class="field-value">${coverageDetails.startDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">END DATE</div>
          <div class="field-value">${coverageDetails.endDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PAYOR REFERENCE</div>
          <div class="field-value">${coverageDetails.payorReference}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NUMBER</div>
          <div class="field-value">${coverageDetails.groupNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NAME</div>
          <div class="field-value">${coverageDetails.groupName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NUMBER</div>
          <div class="field-value">${coverageDetails.planNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NAME</div>
          <div class="field-value">${coverageDetails.planName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">NETWORK</div>
          <div class="field-value">${coverageDetails.network}</div>
        </div>
        <div class="info-field">
          <div class="field-label">SUBROGATION</div>
          <div class="field-value">${coverageDetails.subrogation}</div>
        </div>
        ${coverageDetails.lastEligibilityVerificationDate ? html`
          <div class="info-field">
            <div class="field-label">LAST ELIGIBILITY CHECK</div>
            <div class="field-value">${new Date(coverageDetails.lastEligibilityVerificationDate).toLocaleDateString()}</div>
          </div>
        ` : null}
      </div>
    `;
  }

  renderBenefitsMapping() {
    const activeServiceType = this.serviceTypes.find(type => type.id === this.activeServiceTypeId) || this.serviceTypes[0];
    const availableBenefits = this.getAvailableBenefitsForType(activeServiceType.id);
    const mappedBenefits = activeServiceType.mapped || [];
    const totalAllowed = this.calculateTotalAllowed(mappedBenefits);
    const suggestedCategories = getSuggestedCategories(activeServiceType.id);

    // Calculate overall mapping statistics
    const totalAvailableBenefits = this.availableBenefits.length;
    const totalMappedBenefits = this.serviceTypes.reduce((total, type) => total + (type.mapped?.length || 0), 0);
    const totalRemainingBenefits = totalAvailableBenefits - totalMappedBenefits;
    
    // Calculate total mapped and remaining amounts
    const totalMappedAmount = this.serviceTypes.reduce((total, type) => 
      total + this.calculateTotalAllowed(type.mapped || []), 0);
    const totalAvailableAmount = this.availableBenefits.reduce((total, benefit) => 
      total + (benefit.allowedMoney || 0), 0);
    const totalRemainingAmount = totalAvailableAmount - totalMappedAmount;

    return html`
      <div class="benefits-section">
        <button 
          class="auto-map-all-button"
          @click="${this.autoMapAllServiceTypes}"
          ?disabled="${this.isAutoMapping}"
        >
          ${this.isAutoMapping ? html`
            <div class="progress" style="width: ${this.autoMappingProgress}%"></div>
            Auto Mapping in Progress... ${this.autoMappingProgress}%
          ` : html`
            Auto Map All Service Types
          `}
        </button>
        ${this.lastAutoMapResult ? html`
          <div class="mapping-status">
            ${this.lastAutoMapResult}
          </div>
        ` : null}

        <div class="summary-cards">
          <div class="summary-card">
            <div class="summary-label">TOTAL MAPPED BENEFITS</div>
            <div class="summary-value">${mappedBenefits.length}</div>
            <div class="summary-subtext">Out of ${this.availableBenefits.length} available</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">TOTAL ALLOWED AMOUNT</div>
            <div class="summary-value">${totalAllowed} SAR</div>
            <div class="summary-subtext">For ${activeServiceType.name}</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">SUGGESTED CATEGORIES</div>
            <div class="summary-value">${suggestedCategories.length}</div>
            <div class="summary-subtext">
              ${suggestedCategories.map(code => getCategoryName(code)).join(', ')}
            </div>
          </div>
          <div class="summary-card overall-progress">
            <div class="summary-label">OVERALL MAPPING PROGRESS</div>
            <div class="progress-stats">
              <div class="progress-item">
                <span class="progress-label">Benefits:</span>
                <span class="progress-value">${totalMappedBenefits}/${totalAvailableBenefits}</span>
                <span class="progress-remaining">(${totalRemainingBenefits} remaining)</span>
              </div>
              <div class="progress-item">
                <span class="progress-label">Amount:</span>
                <span class="progress-value">${totalMappedAmount.toFixed(2)} SAR</span>
                <span class="progress-remaining">(${totalRemainingAmount.toFixed(2)} SAR remaining)</span>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(totalMappedBenefits/totalAvailableBenefits * 100).toFixed(1)}%"></div>
            </div>
          </div>
        </div>

        <div class="service-tabs">
          ${this.serviceTypes.map(type => html`
            <button 
              class="service-tab ${type.id === activeServiceType.id ? 'active' : ''}"
              @click="${() => this.setActiveServiceType(type.id)}"
            >
              ${type.name}
              ${type.mapped?.length ? html`
                <span class="badge">${type.mapped.length}</span>
              ` : ''}
            </button>
          `)}
        </div>

        <div class="benefits-table-container">
          <div class="benefits-header">
            <h3 class="section-title">${activeServiceType.name} Benefits</h3>
            <div class="benefits-actions">
              <button 
                class="auto-map-button"
                @click="${() => this.autoMapBenefits(activeServiceType.id)}"
              >
                Auto Recommended Mapping
              </button>
              <div class="benefits-search">
                <input 
                  type="text" 
                  placeholder="Search benefits..."
                  @input="${this.handleBenefitSearch}"
                >
              </div>
            </div>
          </div>

          <table class="benefits-table">
            <thead>
              <tr>
                <th>Benefit</th>
                <th>Category</th>
                <th>Network</th>
                <th>Allowed Amount</th>
                <th>Used Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${availableBenefits.map(benefit => {
                const isMapped = mappedBenefits.some(mapped => mapped.id === benefit.id);
                const categoryName = getCategoryName(benefit.categoryCode);
                const categoryDescription = getCategoryDescription(benefit.categoryCode);
                const isRecommended = !isMapped && getIntelligentMapping(benefit, activeServiceType.id);

                return html`
                  <tr class="benefit-row ${isMapped ? 'mapped' : ''} ${isRecommended ? 'recommended' : ''}">
                    <td>
                      <div class="benefit-name">${benefit.name}</div>
                      <div class="benefit-description">${benefit.description}</div>
                    </td>
                    <td>
                      <div 
                        class="category-name" 
                        title="${categoryDescription}"
                      >
                        ${categoryName}
                      </div>
                    </td>
                    <td>${benefit.networkCode}</td>
                    <td class="benefit-amount">${benefit.allowedMoney} ${benefit.allowedCurrency}</td>
                    <td class="benefit-amount">${benefit.usedMoney} ${benefit.usedCurrency}</td>
                    <td class="benefit-action">
                      ${isMapped ? html`
                        <button 
                          class="unmap-button"
                          @click="${() => this.unmapBenefit(activeServiceType.id, benefit.id)}"
                        >
                          Unmap
                        </button>
                      ` : html`
                        <button 
                          class="map-button ${isRecommended ? 'recommended' : ''}"
                          @click="${() => this.mapBenefit(activeServiceType.id, benefit)}"
                        >
                          ${isRecommended ? 'Map (Recommended)' : 'Map'}
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>

        ${!this.isMappingComplete ? html`
          <button 
            class="map-benefits-button"
            @click="${() => this.completeMappingAndProceed()}"
          >
            COMPLETE MAPPING
          </button>
        ` : null}
      </div>
    `;
  }

  async autoMapAllServiceTypes() {
    this.isAutoMapping = true;
    this.autoMappingProgress = 0;
    this.lastAutoMapResult = '';
    let totalMapped = 0;
    
    try {
      // Calculate total potential mappings for progress
      const totalPotentialMappings = this.serviceTypes.reduce((total, serviceType) => {
        const availableBenefits = this.getAvailableBenefitsForType(serviceType.id);
        return total + availableBenefits.filter(benefit => 
          getIntelligentMapping(benefit, serviceType.id)
        ).length;
      }, 0);

      // Process each service type
      for (let i = 0; i < this.serviceTypes.length; i++) {
        const serviceType = this.serviceTypes[i];
        const availableBenefits = this.getAvailableBenefitsForType(serviceType.id);
        let mappedForType = 0;

        if (!serviceType.mapped) {
          serviceType.mapped = [];
        }

        // Map benefits for this service type
        availableBenefits.forEach(benefit => {
          if (getIntelligentMapping(benefit, serviceType.id)) {
            if (!serviceType.mapped.some(mapped => mapped.id === benefit.id)) {
              serviceType.mapped.push(benefit);
              mappedForType++;
              totalMapped++;
            }
          }
        });

        // Update progress
        this.autoMappingProgress = Math.round((totalMapped / totalPotentialMappings) * 100);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for visual feedback
        this.requestUpdate();
      }

      this.lastAutoMapResult = `Successfully mapped ${totalMapped} benefits across all service types`;
    } catch (error) {
      console.error('Error during auto-mapping:', error);
      this.lastAutoMapResult = 'Error occurred during auto-mapping';
    } finally {
      this.isAutoMapping = false;
      this.requestUpdate();
    }
  }

  autoMapBenefits(serviceTypeId) {
    const availableBenefits = this.getAvailableBenefitsForType(serviceTypeId);
    const serviceType = this.serviceTypes.find(type => type.id === serviceTypeId);
    let mappedCount = 0;
    
    if (!serviceType.mapped) {
      serviceType.mapped = [];
    }

    availableBenefits.forEach(benefit => {
      if (getIntelligentMapping(benefit, serviceTypeId)) {
        // Only map if not already mapped
        if (!serviceType.mapped.some(mapped => mapped.id === benefit.id)) {
          serviceType.mapped.push(benefit);
          mappedCount++;
        }
      }
    });

    // Show success message if any benefits were mapped
    if (mappedCount > 0) {
      const button = this.shadowRoot.querySelector('.auto-map-button');
      button.style.background = '#059669';
      button.textContent = `${mappedCount} Benefits Mapped`;
      setTimeout(() => {
        button.style.background = '';
        button.textContent = 'Auto Recommended Mapping';
      }, 2000);
    }

    this.requestUpdate();
  }

  completeMappingAndProceed() {
    // Validate all recommended benefits are mapped
    let unmappedRecommended = false;
    this.serviceTypes.forEach(serviceType => {
      const availableBenefits = this.getAvailableBenefitsForType(serviceType.id);
      availableBenefits.forEach(benefit => {
        if (getIntelligentMapping(benefit, serviceType.id) && 
            !serviceType.mapped?.some(mapped => mapped.id === benefit.id)) {
          unmappedRecommended = true;
        }
      });
    });

    if (unmappedRecommended) {
      if (confirm('There are recommended benefits that have not been mapped. Do you want to auto-map them before proceeding?')) {
        this.serviceTypes.forEach(serviceType => {
          this.autoMapBenefits(serviceType.id);
        });
      }
    }

    this.isMappingComplete = true;
    this.requestUpdate();
  }

  renderMappedBenefits() {
    if (!this.isMappingComplete) return null;

    // Calculate totals for the summary
    const totalStats = {
      totalBenefits: 0,
      totalAmount: 0,
      totalUsed: 0
    };

    const mappedTypes = this.serviceTypes.filter(type => type.mapped?.length > 0);
    mappedTypes.forEach(type => {
      totalStats.totalBenefits += type.mapped.length;
      totalStats.totalAmount += this.calculateTotalAllowed(type.mapped);
      totalStats.totalUsed += type.mapped.reduce((sum, benefit) => sum + (benefit.usedMoney || 0), 0);
    });

    return html`
      <div class="benefits-report">
        <div class="report-header">
          <h2>Benefits Coverage Analysis Report</h2>
          <div class="report-meta">
            <div class="meta-item">
              <span class="meta-label">Report Generated:</span>
              <span class="meta-value">${new Date().toLocaleString()}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Patient:</span>
              <span class="meta-value">${this.selectedPatient?.name}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Insurance:</span>
              <span class="meta-value">${this.selectedPatient?.insuranceInfo?.company}</span>
            </div>
          </div>
        </div>

        <div class="report-summary">
          <div class="summary-box">
            <div class="summary-title">Total Benefits Mapped</div>
            <div class="summary-value">${totalStats.totalBenefits}</div>
            <div class="summary-subtitle">Across ${mappedTypes.length} Service Types</div>
          </div>
          <div class="summary-box">
            <div class="summary-title">Total Coverage Amount</div>
            <div class="summary-value">${totalStats.totalAmount.toLocaleString()} SAR</div>
            <div class="summary-subtitle">Maximum Available</div>
          </div>
          <div class="summary-box">
            <div class="summary-title">Total Amount Used</div>
            <div class="summary-value">${totalStats.totalUsed.toLocaleString()} SAR</div>
            <div class="summary-subtitle">Current Utilization</div>
          </div>
        </div>

        <div class="service-type-breakdown">
          <h3>Service Type Analysis</h3>
          <div class="breakdown-grid">
            ${mappedTypes.map(serviceType => {
              const totalAllowed = this.calculateTotalAllowed(serviceType.mapped);
              const totalUsed = serviceType.mapped.reduce((sum, benefit) => sum + (benefit.usedMoney || 0), 0);
              const utilizationRate = totalAllowed ? ((totalUsed / totalAllowed) * 100).toFixed(1) : 0;

              return html`
                <div class="breakdown-card">
                  <div class="breakdown-header">
                    <h4>${serviceType.name}</h4>
                    <span class="benefit-count">${serviceType.mapped.length} Benefits</span>
                  </div>
                  <div class="breakdown-stats">
                    <div class="stat-row">
                      <span class="stat-label">Total Coverage:</span>
                      <span class="stat-value">${totalAllowed.toLocaleString()} SAR</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Amount Used:</span>
                      <span class="stat-value">${totalUsed.toLocaleString()} SAR</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Utilization:</span>
                      <span class="stat-value ${utilizationRate > 75 ? 'high-utilization' : utilizationRate > 50 ? 'medium-utilization' : 'low-utilization'}">
                        ${utilizationRate}%
                      </span>
                    </div>
                  </div>
                  <div class="benefits-list">
                    <table class="benefits-detail-table">
                      <thead>
                        <tr>
                          <th>Benefit Name</th>
                          <th>Category</th>
                          <th>Network</th>
                          <th>Coverage</th>
                          <th>Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${serviceType.mapped.map(benefit => html`
                          <tr>
                            <td>${benefit.name}</td>
                            <td>${benefit.categoryCode}</td>
                            <td>${benefit.networkCode}</td>
                            <td>${benefit.allowedMoney.toLocaleString()} ${benefit.allowedCurrency}</td>
                            <td>${benefit.usedMoney.toLocaleString()} ${benefit.usedCurrency}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  renderFacilityLicenseFields(facility) {
    if (!facility) return null;

    return html`
      <div class="form-grid">
        ${(facility.lisenceNo === null || facility.lisenceNo === undefined || facility.lisenceNo) ? html`
          <div class="form-field-wrapper">
            <input 
              type="text" 
              name="facilityLicense" 
              id="facilityLicense"
              .value="${this.manualFormData.facilityLicense || facility.lisenceNo || ''}"
              @input="${(e) => this.handleManualInputChange(e)}"
              class="form-input ${this.dirtyFields.facilityLicense ? 'dirty' : ''}"
              placeholder=" "
            />
            <label 
              for="facilityLicense"
              class="form-label"
            >
              Facility Location License
            </label>
          </div>
        ` : null}

        ${(facility.facilityOrgLicenseNumber === null || facility.facilityOrgLicenseNumber === undefined || facility.facilityOrgLicenseNumber) ? html`
          <div class="form-field-wrapper">
            <input 
              type="text" 
              name="orgLicense" 
              id="orgLicense"
              .value="${this.manualFormData.orgLicense || facility.facilityOrgLicenseNumber || ''}"
              @input="${(e) => this.handleManualInputChange(e)}"
              class="form-input ${this.dirtyFields.orgLicense ? 'dirty' : ''}"
              placeholder=" "
            />
            <label 
              for="orgLicense"
              class="form-label"
            >
              Provider Organization License
            </label>
          </div>
        ` : null}
      </div>
    `;
  }

  renderVerificationForm() {
    const hasInsurance = this.selectedPatient?.insuranceInfo;
    const facility = this.selectedFacility;
    
    return html`
      <div class="form-container">
        <div class="form-section">
          <h4 class="form-section-title">Facility Information</h4>
          <div class="form-field-wrapper">
            <select 
              @change="${this.handleFacilityChange}"
              class="form-select"
            >
              <option value="">Select a facility...</option>
              ${this.facilities.map(f => html`
                <option value="${f.id}">${f.facilityName}</option>
              `)}
            </select>
            <label class="form-label">Select Facility</label>
          </div>

          ${facility ? this.renderFacilityLicenseFields(facility) : null}
        </div>

        <div class="form-section">
           <h4 class="form-section-title">Edit Insurance Information</h4>
          ${hasInsurance && !this.isManualMode ? html`
            <div class="insurance-toggle">
              <span class="insurance-text">Using existing insurance: ${this.selectedPatient.insuranceInfo.company}</span>
              <button @click="${this.toggleManualMode}" class="toggle-button">
                Use Different Insurance
              </button>
            </div>
          ` : html`
            <div class="form-field-wrapper">
              <select 
                @change="${this.handleInsuranceCompanyChange}"
                class="form-select"
              >
                <option value="">Select an insurance company...</option>
                ${this.insuranceCompanies.map(c => html`
                  <option value="${c.id}">${c.companyName}</option>
                `)}
              </select>
              <label class="form-label">Select Insurance Company</label>
            </div>
          `}

          ${(this.isManualMode || !hasInsurance) && this.selectedInsuranceCompany ? html`
            <div class="form-field-wrapper">
              <input 
                type="text" 
                name="insuranceLicense" 
                id="insuranceLicense"
                .value="${this.manualFormData.insuranceLicenseNumber}"
                @input="${this.handleManualInputChange}"
                class="form-input ${this.dirtyFields.insuranceLicense ? 'dirty' : ''}" 
                placeholder=" "
              />
              <label for="insuranceLicense" class="form-label">
                Insurance License Number
              </label>
            </div>
          ` : null}
        </div>

        <div class="form-section">
          <h4 class="form-section-title">Additional Patient Information</h4>
          <div class="form-grid">
            <div class="form-field-wrapper">
              <input 
                type="text" 
                name="occupation" 
                id="occupation"
                .value="${this.manualFormData.occupation}"
                @input="${this.handleManualInputChange}"
                class="form-input ${this.dirtyFields.occupation ? 'dirty' : ''}" 
                placeholder=" "
              />
              <label for="occupation" class="form-label">
                Occupation
              </label>
            </div>

            <div class="form-field-wrapper">
              <select 
                name="maritalStatus"
                .value="${this.manualFormData.maritalStatus}"
                @change="${this.handleManualInputChange}"
                class="form-select ${this.dirtyFields.maritalStatus ? 'dirty' : ''}"
              >
                <option value="">Select status...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              <label class="form-label">Marital Status</label>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h4 class="form-section-title">Service Period</h4>
          <div class="form-grid">
            <div class="form-field-wrapper">
              <input 
                type="datetime-local"
                .value="${this.servicePeriod.startDate.split('.')[0]}"
                @change="${(e) => this.updateServicePeriod(e.target.value, this.servicePeriod.endDate)}"
                class="form-input"
              />
              <label class="form-label">Start Date</label>
            </div>

            <div class="form-field-wrapper">
              <input 
                type="datetime-local"
                .value="${this.servicePeriod.endDate.split('.')[0]}"
                @change="${(e) => this.updateServicePeriod(this.servicePeriod.startDate, e.target.value)}"
                class="form-input"
              />
              <label class="form-label">End Date</label>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${this.renderLoadingOverlay()}
      <div class="wrapper">
        <div class="header">
          Coverage Eligibility Verification Center
          <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
          <button class="close-button" @click="${this.handleClose}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="tabs">
          <div class="tab ${this.activeTab === 'coverage' ? 'active' : ''}"
               @click="${() => this.switchTab('coverage')}">
            COVERAGE
          </div>
          <div class="tab ${this.activeTab === 'contract' ? 'active' : ''}"
               @click="${() => this.isVerified ? this.switchTab('contract') : null}"
               style="${!this.isVerified ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
            CONTRACT
          </div>
          <div class="tab ${this.activeTab === 'benefits' ? 'active' : ''}"
               @click="${() => this.switchTab('benefits')}"
               style="${!this.isVerified ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
            BENEFITS / PLAN COPAYS
          </div>
        </div>

        <div class="content">
          ${!this.selectedPatient ? html`
            <div class="search-wrapper">
              <patient-search @patient-selected="${this.handlePatientSelected}"></patient-search>
            </div>
          ` : html`
            <div class="animate-in">
              <button class="back-button" @click="${this.handleBack}">Back to Search</button>
              ${this.activeTab === 'coverage' ? html`
                ${this.renderPatientInfo()}
                ${this.renderInsuranceInfo()}
                ${!this.isVerified ? this.renderVerificationForm() : null}
                ${this.renderVerificationActions()}
              ` : this.activeTab === 'contract' ? html`
                <insurance-contract-manager
                  .insuranceCompanyId="${this.selectedInsuranceCompany?.id}"
                  @contract-selected="${this.handleContractSelected}"
                ></insurance-contract-manager>
              ` : html`
                ${this.isMappingComplete ? this.renderMappedBenefits() : this.renderBenefitsMapping()}
              `}
            </div>
          `}
        </div>
      </div>
    `;
  }

  handleClose() {
    const event = new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: { source: 'close-button' }
    });
    this.dispatchEvent(event);
  }

  prepareVerificationPayload() {
    if (!this.selectedPatient || !this.selectedFacility) return null;

    const patientData = this.selectedPatient.fullData;
    const names = this.selectedPatient.name.split(' ');
    const insuranceCompany = this.isManualMode ? this.selectedInsuranceCompany : 
                           (this.selectedPatient?.insuranceInfo ? { companyName: this.selectedPatient.insuranceInfo.company } : this.selectedInsuranceCompany);
    
    // Get the facility license numbers, prioritizing manual input if available
    const facilityLicenseNo = this.manualFormData.facilityLicense || this.selectedFacility.lisenceNo;
    const orgLicenseNo = this.manualFormData.orgLicense || this.selectedFacility.facilityOrgLicenseNumber;
    
    // Get PayerId from selected insurance company or patient's insurance
    const payerId = this.selectedPatient?.insuranceCoverages?.[0]?.payerId || 
                   this.selectedInsuranceCompany?.id || 
                   patientData.patientInsurances?.[0]?.payerId ||
                   patientData.patientInsurances?.[0]?.Payer?.Id;
    
    // Use the modified national ID if it exists and is valid, otherwise use the original
    const nationalId = this.dirtyFields.nationalId ? 
                      (this.validateNationalId(this.selectedPatient.nationalId) ? this.selectedPatient.nationalId : null) : 
                      patientData.nic;

    // If no valid national ID is available, use passport number
    const identifier = nationalId || this.selectedPatient.passportNumber;
    const identifierSystem = nationalId ? "http://nphies.sa/identifier/iqama" : "http://nphies.sa/identifier/passport";
    
    return {
      PatientInfo: {
        Id: patientData.id,
        IqamaId: identifier,
        IdentifierSystem: identifierSystem,
        FullName: this.selectedPatient.name,
        FamilyName: patientData.lastName || names[names.length - 1],
        GivenNames: [
          patientData.firstName || names[0],
          patientData.middleName || (names.length > 2 ? names.slice(1, -1).join(' ') : '')
        ].filter(Boolean),
        PhoneNumber: patientData.cellPhoneNo,
        Gender: patientData.gender?.genderName || 'Unknown',
        BirthDate: patientData.dateOfBirth,
        Occupation: this.manualFormData.occupation || 'Unknown',
        MaritalStatus: this.manualFormData.maritalStatus || patientData.maritalStatus?.status || 'Unknown'
      },
      ProviderInfo: {
        LicenseNumber: facilityLicenseNo || 'N/A',
        Name: this.selectedFacility.facilityName,
        Type: this.selectedFacility.facilityType.toString(),
        Active: true
      },
      InsurerInfo: {
        LicenseNumber: insuranceCompany?.licenseNumber || this.manualFormData.insuranceLicenseNumber || 'INS-FHIR',
        Name: insuranceCompany?.companyName || 'Unknown',
        Active: true,
        PayerId: payerId
      },
      LocationInfo: {
        LicenseNumber: orgLicenseNo || this.selectedFacility.dhausername || 'GACH',
        Name: this.selectedFacility.facilityName,
        Active: true
      },
      ServicePeriod: this.servicePeriod
    };
  }

  updateServicePeriod(startDate, endDate) {
    this.servicePeriod = {
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || new Date().toISOString().split('T')[0] + 'T23:59:59'
    };
  }

  setActiveServiceType(id) {
    this.activeServiceTypeId = id;
    this.requestUpdate();
  }

  getMappingProgress() {
    const totalMapped = this.serviceTypes.reduce((sum, type) => sum + (type.mapped?.length || 0), 0);
    const totalBenefits = this.availableBenefits.length;
    return `${totalMapped} of ${totalBenefits} benefits mapped`;
  }

  handleBenefitSearch(e) {
    this.benefitSearchQuery = e.target.value.toLowerCase();
    this.requestUpdate();
  }

  mapBenefit(serviceTypeId, benefit) {
    const serviceType = this.serviceTypes.find(type => type.id === serviceTypeId);
    if (!serviceType.mapped) serviceType.mapped = [];
    serviceType.mapped.push(benefit);
    this.mappedBenefitIds.add(benefit.id);
    this.requestUpdate();
  }

  unmapBenefit(serviceTypeId, benefitId) {
    const serviceType = this.serviceTypes.find(type => type.id === serviceTypeId);
    if (serviceType.mapped) {
      serviceType.mapped = serviceType.mapped.filter(b => b.id !== benefitId);
      this.mappedBenefitIds.delete(benefitId);
    }
    this.requestUpdate();
  }

  async loadPolicies() {
    try {
      const response = await fetch(API_ENDPOINTS.INSURANCE_POLICY.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 100
        })
      });
      const result = await response.json();
      if (result.isSuccessfull) {
        this.availablePolicies = result.dynamicResult;
        console.log('Loaded policies:', this.availablePolicies);
      }
    } catch (error) {
      console.error('Error loading policies:', error);
    }
  }

  generatePlanCode(insuranceCompanyName) {
    // Generate plan code using insurance company name letters and random numbers
    const companyInitials = insuranceCompanyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${companyInitials}-${randomNum}`;
  }

  calculateAnnualLimit(benefits) {
    return benefits.reduce((total, benefit) => {
      if (benefit.termCode?.toLowerCase().includes('annual')) {
        return total + (benefit.allowedMoney || 0);
      }
      return total;
    }, 0);
  }

  handleContractSetup() {
    if (this.selectedInsuranceCompany) {
      this.activeTab = 'contract';
      // Use the selected insurance company info for contract setup
      this.contractInfo = {
        insuranceCompany: this.selectedInsuranceCompany,
        companyName: this.selectedInsuranceCompany.companyName,
        companyCode: this.selectedInsuranceCompany.companyCode,
        // ... other contract fields
      };
    }
  }

  renderContractSetup() {
    return html`
      <div class="section-card">
        <div class="section-header">
          <div>
            <h3 class="section-title">Contract Setup</h3>
            <p class="section-subtitle">Set up insurance contract and plan details</p>
          </div>
        </div>

        <div class="contract-mode-toggle">
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              @change="${(e) => this.contractMode = e.target.checked ? 'new' : 'existing'}"
              .checked="${this.contractMode === 'new'}"
            >
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">${this.contractMode === 'new' ? 'Create New Contract' : 'Select Existing Contract'}</span>
        </div>

        ${this.contractMode === 'existing' ? html`
          <div class="form-section">
            <div class="form-field-wrapper">
              <select 
                class="form-select"
                @change="${this.handleExistingContractSelect}"
                .value="${this.selectedExistingContract?.id || ''}"
              >
                <option value="">Select Contract...</option>
                ${this.selectedInsuranceCompany?.contracts?.map(contract => html`
                  <option value="${contract.id}">${contract.contractName}</option>
                `)}
              </select>
              <label class="form-label">Select Contract</label>
            </div>

            ${this.selectedExistingContract ? html`
              <div class="form-field-wrapper">
                <select 
                  class="form-select"
                  @change="${this.handleExistingPlanSelect}"
                  .value="${this.selectedExistingPlan?.id || ''}"
                >
                  <option value="">Select Plan...</option>
                  ${this.selectedExistingContract.plans?.map(plan => html`
                    <option value="${plan.id}">${plan.planName}</option>
                  `)}
                </select>
                <label class="form-label">Select Plan</label>
              </div>
            ` : null}
          </div>
        ` : html`
          <div class="form-section">
            <div class="form-field-wrapper">
              <input 
                type="text" 
                class="form-input"
                .value="${this.contractName}"
                @input="${this.handleContractNameChange}"
                readonly
                placeholder=" "
              />
              <label class="form-label">Contract Name</label>
            </div>

            <div class="form-field-wrapper">
              <input 
                type="text" 
                class="form-input"
                .value="${this.planName}"
                @input="${this.handlePlanNameChange}"
                placeholder=" "
              />
              <label class="form-label">Plan Name</label>
            </div>

            <div class="form-field-wrapper">
              <select 
                class="form-select"
                @change="${this.handlePlanCategoryChange}"
                .value="${this.planCategory}"
              >
                <option value="">Select Category...</option>
                <option value="VIP">VIP</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              <label class="form-label">Plan Category</label>
            </div>

            <div class="form-field-wrapper">
              <input 
                type="number" 
                class="form-input"
                .value="${this.annualLimit}"
                @input="${this.handleAnnualLimitChange}"
                placeholder=" "
              />
              <label class="form-label">Annual Limit</label>
            </div>

            <div class="form-field-wrapper">
              <input 
                type="number" 
                class="form-input"
                .value="${this.maxDeductible}"
                @input="${this.handleMaxDeductibleChange}"
                placeholder=" "
              />
              <label class="form-label">Max Deductible</label>
            </div>

            <div class="form-field-wrapper">
              <input 
                type="number" 
                class="form-input"
                .value="${this.copayAmount}"
                @input="${this.handleCopayAmountChange}"
                placeholder=" "
              />
              <label class="form-label">Copay Amount</label>
            </div>

            <div class="form-field-wrapper">
              <label class="checkbox-wrapper">
                <input 
                  type="checkbox"
                  .checked="${this.copayOnGross}"
                  @change="${this.handleCopayOnGrossChange}"
                />
                <span class="checkbox-label">Copay on Gross</span>
              </label>
            </div>
          </div>
        `}

        <div class="action-buttons">
          <button class="secondary-button" @click="${this.handleBack}">
            Back
          </button>
          <button 
            class="primary-button" 
            @click="${this.handleContractSubmit}"
            ?disabled="${!this.isContractValid()}"
          >
            Continue
          </button>
        </div>
      </div>
    `;
  }

  handlePolicySelect(e) {
    const policyId = parseInt(e.target.value);
    const selectedPolicy = this.availablePolicies.find(p => p.id === policyId);
    
    if (selectedPolicy) {
      // Calculate maxDeductible from benefits with health coverage plan
      const maxDeductible = this.availableBenefits?.find(b => 
        b.name?.toLowerCase().includes('health benefit plan coverage'))?.allowedMoney || 0;

      // Create a new contract based on the selected policy
      this.selectedContract = {
        id: null,
        fkCompanyId: this.selectedInsuranceCompany?.id,
        contractName: `${selectedPolicy.policyName} Contract ${new Date().getFullYear()}`,
        insurancePlans: [{
          id: null,
          planName: `${selectedPolicy.policyName} Plan`,
          planCode: this.generatePlanCode(selectedPolicy.policyName),
          planCategory: selectedPolicy.policyCategory || '',
          fkContractId: 0, // Will be auto-populated
          fkPolicyId: selectedPolicy.id,
          copayAmount: selectedPolicy.copayAmount || 0,
          annualLimit: selectedPolicy.annualLimit || 100000,
          maxDeductable: maxDeductible,
          level: 1,
          createdBy: 81,
          copayOnGross: 0,
          startDate: selectedPolicy.startDate,
          endDate: selectedPolicy.endDate,
          policyNumber: selectedPolicy.policyNumber,
          insurancePlanservicelists: [], // Will be filled via backend
          insuranceSlabs: this.generateInsuranceSlabs()
        }]
      };
    } else {
      this.selectedContract = null;
    }
    
    this.requestUpdate();
  }

  generateInsuranceSlabs() {
    // Map benefits to service types and create slabs
    const slabs = [];
    
    this.serviceTypes.forEach(serviceType => {
      if (serviceType.mapped && serviceType.mapped.length > 0) {
        serviceType.mapped.forEach(benefit => {
          slabs.push({
            id: null,
            fkPlanId: 0, // Will be populated when plan is added
            fkServiceTypeId: serviceType.id,
            fkSlabStatus: 2, // 2 for mapped services
            amountLimit: benefit.allowedMoney || 0,
            patientShare: 0, // Default to 0, can be updated through UI
            maxDeductale: benefit.allowedMoney || 0,
            outDet: benefit.allowedMoney || 0,
            noofUnits: 1,
            fkUnitTypeId: 1,
            remarks: benefit.description || ''
          });
        });
      }
    });
    
    return slabs;
  }

  handleContractNameChange(e) {
    if (this.selectedContract) {
      this.selectedContract.name = e.target.value;
      this.requestUpdate();
    }
  }

  handlePlanNameChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].name = e.target.value;
      this.selectedContract.insurancePlans[0].code = this.generatePlanCode(e.target.value);
      this.requestUpdate();
    }
  }

  handlePlanCategoryChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].category = e.target.value;
      this.requestUpdate();
    }
  }

  handleAnnualLimitChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].annualLimit = parseFloat(e.target.value) || 0;
      this.requestUpdate();
    }
  }

  handleMaxDeductibleChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].maxDeductable = parseFloat(e.target.value) || 0;
      this.requestUpdate();
    }
  }

  handleCopayAmountChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].copayAmount = parseFloat(e.target.value) || 0;
      this.requestUpdate();
    }
  }

  handleCopayOnGrossChange(e) {
    if (this.selectedContract?.insurancePlans?.[0]) {
      this.selectedContract.insurancePlans[0].copayOnGross = parseInt(e.target.value);
      this.requestUpdate();
    }
  }

  handleContractSubmit() {
    // Here you would typically save the contract data
    console.log('Contract submitted:', this.selectedContract);
    this.switchTab('benefits');
  }

  renderVerificationActions() {
    return html`
      ${!this.isVerified ? html`
        <button 
          class="verify-button" 
          @click="${this.handleVerify}"
          ?disabled="${this.isVerifying || !this.selectedFacility}"
        >
          ${this.isVerifying ? html`
            <div class="loader"></div>
            VERIFYING...
          ` : 'VERIFY'}
        </button>
      ` : html`
        <button class="verify-button" disabled>VERIFIED</button>
        <button 
          class="map-benefits-button primary-button" 
          @click="${() => this.switchTab('contract')}"
        >
          PROCEED TO CONTRACT SETUP
        </button>
      `}
    `;
  }

  /* Add validation method and update renderPatientInfo() */
  validateNationalId(value) {
    return value && value.length === 10 && value.startsWith('2');
  }

  handleNationalIdChange(e) {
    const value = e.target.value;
    this.selectedPatient = {
      ...this.selectedPatient,
      nationalId: value
    };
    this.dirtyFields = {
      ...this.dirtyFields,
      nationalId: true
    };
    this.requestUpdate();
  }

  async saveContract() {
    try {
      const currentDate = new Date().toISOString();
      const contractPayload = {
        id: this.selectedContract?.id, // Include ID only for updates
        fkCompanyId: this.selectedInsuranceCompany.id,
        contractName: this.selectedContract.contractName,
        creationDate: currentDate,
        contractDate: this.selectedContract.contractDate || currentDate,
        rowStatus: 1,
        createdby: 81, // Using the default user ID from the example
        filePath: this.selectedContract.filePath || "", // Optional file path
        
        insurancePlans: [{
          id: this.selectedContract.insurancePlans[0].id, // Include if updating existing plan
          planName: this.selectedContract.insurancePlans[0].planName,
          planCode: this.selectedContract.insurancePlans[0].planCode,
          planCategory: this.selectedContract.insurancePlans[0].planCategory || "",
          startDate: this.selectedContract.insurancePlans[0].startDate || currentDate,
          endDate: this.selectedContract.insurancePlans[0].endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          createdby: 81,
          rowStatus: 1,
          maxDeductable: this.selectedContract.insurancePlans[0].maxDeductable || 0,
          level: this.selectedContract.insurancePlans[0].level || 1,
          copayOnGross: this.selectedContract.insurancePlans[0].copayOnGross || 0,
          copayAmount: this.selectedContract.insurancePlans[0].copayAmount || 0,
          annualLimit: this.selectedContract.insurancePlans[0].annualLimit || 0,
          fkPolicyId: this.selectedContract.insurancePlans[0].fkPolicyId,
          insuranceSlabs: this.selectedContract.insurancePlans[0].insuranceSlabs || []
        }]
      };

      const endpoint = API_ENDPOINTS.INSURANCE_CONTRACT.BASE;
      const method = this.selectedContract.id ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `${endpoint}/${this.selectedContract.id}` : endpoint;

      console.log('Saving contract with payload:', contractPayload);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contractPayload)
      });

      const result = await response.json();

      if (result.isSuccessfull) {
        // Update the local contract with the saved data
        this.selectedContract = result.dynamicResult;
        console.log('Contract saved successfully:', result.dynamicResult);
        
        // Move to benefit mapping tab
        this.activeTab = 'benefits';
      } else {
        throw new Error(result.errorMessage || 'Failed to save contract');
      }
    } catch (error) {
      console.error('Error saving contract:', error);
      // Show error to user
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = error.message || 'Failed to save contract';
      this.shadowRoot.querySelector('.contract-setup-section').appendChild(errorDiv);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
  }

  handleExistingContractSelect(e) {
    const contractId = e.target.value;
    this.selectedExistingContract = this.selectedInsuranceCompany.contracts?.find(
      c => c.id.toString() === contractId
    );
    this.selectedExistingPlan = null;
  }

  handleExistingPlanSelect(e) {
    const planId = e.target.value;
    this.selectedExistingPlan = this.selectedExistingContract.plans?.find(
      p => p.id.toString() === planId
    );
  }

  isContractValid() {
    if (this.contractMode === 'existing') {
      return this.selectedExistingContract && this.selectedExistingPlan;
    }
    return this.contractName && this.planName && this.planCategory && 
           this.annualLimit && this.maxDeductible && this.copayAmount !== undefined;
  }

  renderLoadingOverlay() {
    if (!this.isLoading) return null;
    
    return html`
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>
    `;
  }

  handleContractSelected(e) {
    const { contract, plan } = e.detail;
    this.selectedContract = contract;
    if (plan) {
      this.selectedPlan = plan;
      // Enable benefits tab when both contract and plan are selected
      this.switchTab('benefits');
    }
  }
}

if (!customElements.get('coverage-verification')) {
  customElements.define('coverage-verification', CoverageVerification);
} 