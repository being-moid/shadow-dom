import { LitElement, html, css } from 'lit';
import './Claim.js';
import { createFloatingButton } from '../utils/componentFactory.js';

const componentStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--sw-background-color, #f8fafc);
    color: var(--sw-text-color, #1e293b);
    font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
    --medical-primary: #8500d8;
    --healthcare-green: #10B981;
    --healthcare-bg: #F3F4F6;
    --primary: var(--medical-primary);
    --primary-dark: #8500d8;
    --primary-light:rgb(180, 59, 255);
    --success: var(--healthcare-green);
    --warning: #F59E0B;
    --error: #EF4444;
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
  }

  /* Typography */
  h1, .h1 {
    font-size: 24px;
    line-height: 1.2;
  }

  h2, .h2 {
    font-size: 20px;
    line-height: 1.3;
  }

  h3, .h3 {
    font-size: 18px;
    line-height: 1.4;
  }

  p, .body-text {
    font-size: 16px;
    line-height: 1.5;
  }

  .small-text {
    font-size: 14px;
    line-height: 1.5;
  }

  /* Update header styles */
  .header {
    background: var(--primary);
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    position: relative;
  }

  .header-title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    line-height: 1.2;
    color: white;
  }

  /* Update tabs */
  .tabs {
    display: flex;
    background: var(--primary);
    padding: 0 2rem;
  }

  .tab {
    padding: 0.5rem 2rem;
    color: white;
    cursor: pointer;
    background: transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .tab.active {
    background: white;
    color: var(--primary);
  }

  /* Update section titles */
  .section-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-800);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Update form labels and inputs */
  .form-label {
    font-size: 14px;
    color: var(--gray-500);
  }

  .form-input {
    font-size: 16px;
  }

  /* Update table text */
  .table-container {
    font-size: 14px;
  }

  th {
    font-size: 14px;
    font-weight: 600;
  }

  td {
    font-size: 14px;
  }

  /* Update buttons */
  button {
    font-size: 14px;
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .close-button svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
  }

  /* Update progress bar */
  .progress-bar {
    height: 100%;
    background: var(--healthcare-green);
    transition: width 0.3s ease;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  }

  /* Update other button styles */
  .btn-primary {
    background: var(--primary) !important;
  }

  .btn-primary:hover {
    background: var(--primary-dark) !important;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--gray-50);
  }

  .sticky-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .nphies-logo {
    width: 140px;
    height: auto;
    object-fit: contain;
  }

  .progress-indicator {
    width: 100%;
    height: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    overflow: hidden;
    margin-top: 0.75rem;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .prior-auth-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .section {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--gray-200);
  }

  .section.collapsed .section-content {
    display: none;
  }

  .section-header {
    padding: 1.25rem 1.5rem;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s;
  }

  .section-header:hover {
    background: var(--gray-50);
  }

  .section-title svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--primary);
  }

  .section-content {
    padding: 1.5rem;
    border-top: 1px solid var(--gray-200);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .form-field {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-input:hover {
    border-color: var(--gray-400);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .form-input:not(:placeholder-shown) + .form-label,
  .form-input:focus + .form-label {
    transform: translateY(-1.4rem) scale(0.85);
    color: var(--primary);
  }

  textarea.form-input {
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
  }

  .character-counter {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  .file-upload-container {
    border: 2px dashed var(--gray-300);
    border-radius: 0.75rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--gray-50);
  }

  .file-upload-container:hover {
    border-color: var(--primary);
    background: white;
  }

  .file-upload-container input[type="file"] {
    display: none;
  }

  .tooltip {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.875rem;
    background: var(--gray-100);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray-700);
    transition: all 0.2s;
  }

  .tooltip[data-status="complete"] {
    background: var(--success);
    color: white;
  }

  .tooltip[data-status="pending"] {
    background: var(--warning);
    color: white;
  }

  .tooltip[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 0.75rem;
    background: var(--gray-900);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    margin-bottom: 0.5rem;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 100;
    background: white;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--gray-200);
    width: auto;
    min-width: 200px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
  }

  .btn-primary {
    background: var(--primary) !important;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--primary-dark) !important;
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: white;
    border: 1.5px solid var(--gray-300);
    color: var(--gray-700);
  }

  .btn-secondary:hover:not(:disabled) {
    border-color: var(--gray-400);
    color: var(--gray-900);
    transform: translateY(-1px);
  }

  .btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    .action-buttons {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      width: calc(100% - 2rem);
    }
  }

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-200);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: var(--gray-50);
    padding: 0.875rem 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--gray-700);
    border-bottom: 1px solid var(--gray-200);
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid var(--gray-200);
    color: var(--gray-800);
  }

  tr:hover td {
    background: var(--gray-50);
  }

  /* Patient Info Styles */
  .patient-info {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid var(--gray-200);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .info-label {
    font-size: 0.75rem;
    color: var(--gray-500);
    font-weight: 500;
  }

  .info-value {
    font-size: 0.875rem;
    color: var(--gray-900);
    font-weight: 500;
  }

  /* Animations */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: slideIn 0.3s ease-out;
  }

  /* Loading States */
  .loading-overlay {
   
  }

  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--gray-200);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Dropdown Styles */
  .dropdown-container {
    position: relative;
  }

  .dropdown-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-height: 15rem;
    overflow-y: auto;
    z-index: 30;
    margin-top: 0.25rem;
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown-item:hover {
    background: var(--gray-50);
  }

  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  .dropdown-item-title {
    font-weight: 500;
    color: var(--gray-900);
  }

  .dropdown-item-subtitle {
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  .dropdown-empty {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .dropdown-loading {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
  }

  .dropdown-loading .loading-spinner {
    width: 1rem;
    height: 1rem;
    border-width: 2px;
  }

  .visit-table-container {
    overflow-x: auto;
    margin: 1rem 0;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-200);
  }

  .visit-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    white-space: nowrap;
  }

  .visit-table th {
    background: var(--gray-50);
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 500;
    color: var(--gray-600);
    border-bottom: 1px solid var(--gray-200);
  }

  .visit-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--gray-200);
    color: var(--gray-700);
  }

  .visit-table tr:last-child td {
    border-bottom: none;
  }

  .visit-table tr.selected {
    background: var(--primary-50);
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-scheduled {
    background: var(--gray-100);
    color: var(--gray-700);
  }

  .status-in-progress {
    background: #FEF3C7;
    color: #92400E;
  }

  .status-completed {
    background: #D1FAE5;
    color: #065F46;
  }

  .status-cancelled {
    background: #FEE2E2;
    color: #991B1B;
  }

  .btn-select {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--primary);
    background: transparent;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-select:hover:not(:disabled) {
    background: var(--primary);
    color: white;
  }

  .btn-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--primary);
    color: white;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--gray-500);
  }

  .healthcare-search {
    position: relative;
    margin-bottom: 1rem;
  }

  .healthcare-search input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid var(--medical-primary);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;
    background-color: var(--healthcare-bg);
  }

  .healthcare-search input:focus {
    outline: none;
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background-color: white;
  }

  .healthcare-search svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: var(--medical-primary);
    pointer-events: none;
  }

  .healthcare-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    max-height: 15rem;
    overflow-y: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    margin-top: 0.25rem;
  }

  .healthcare-result-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid var(--gray-200);
    transition: all 0.2s;
  }

  .healthcare-result-item:hover {
    background: var(--healthcare-bg);
  }

  .healthcare-result-item h4 {
    color: var(--medical-primary);
    font-weight: 600;
    margin: 0;
    font-size: 0.875rem;
  }

  .healthcare-result-item p {
    color: var(--gray-600);
    font-size: 0.75rem;
    margin: 0.25rem 0;
  }

  .healthcare-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .healthcare-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .badge-type {
    background: var(--healthcare-green);
    color: white;
  }

  .badge-code {
    background: var(--medical-primary);
    color: white;
  }

  .badge-price {
    background: var(--gray-100);
    color: var(--gray-700);
  }

  .dropdown-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
    color: var(--gray-500);
  }

  .dropdown-empty {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--gray-200);
    border-top-color: var(--medical-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Update existing table styles */
  .table-container {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: var(--gray-50);
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: uppercase;
  }

  td {
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--gray-200);
    font-size: 0.875rem;
    color: var(--gray-800);
  }

  tr:hover td {
    background: var(--gray-50);
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--gray-500);
  }

  .empty-state p:first-child {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  /* Notification styles */
  .notification {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    animation: slideIn 0.2s ease-out;
    z-index: 100;
  }

  .notification.success {
    background: var(--healthcare-green);
    color: white;
  }

  .notification.error {
    background: var(--error);
    color: white;
  }

  .notification.warning {
    background: var(--warning);
    color: white;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .dropdown-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-badge {
    background: var(--primary);
    color: white;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .dropdown-item-short-desc {
    display: block;
    color: var(--primary);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-description {
    display: block;
    color: var(--gray-700);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-category {
    display: block;
    color: var(--gray-500);
    font-size: 0.75rem;
    font-style: italic;
  }

  .vital-input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vital-input-group input {
    width: 100px;
    padding: 4px 8px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
  }

  .bp-input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bp-input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
  }

  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    font-size: 14px;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-light);
  }

  textarea.form-input {
    resize: vertical;
    min-height: 80px;
  }

  .form-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: var(--gray-700);
  }

  .form-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .form-input::placeholder {
    color: var(--gray-500);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-light);
  }

  .search-input-wrapper {
    position: relative;
    width: 100%;
  }

  .submit-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .submit-status {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    min-width: 300px;
  }

  .submit-status.submitting {
    border-left: 4px solid var(--primary-color);
  }

  .submit-status.success {
    border-left: 4px solid var(--success-color, #4CAF50);
  }

  .submit-status.error {
    border-left: 4px solid var(--error-color, #f44336);
  }

  .loader {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .submit-status p {
    margin: 0;
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.5;
  }

  .spinner {
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .error-item {
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-left: 4px solid var(--error);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .error-code, .error-display, .error-location {
    margin-bottom: 0.5rem;
  }

  .no-errors {
    color: var(--gray-500);
    text-align: center;
    padding: 1rem;
  }

  .communication-types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1rem;
  }

  .solicited, .unsolicited {
    background: var(--gray-50);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .communication-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .communication-item {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .comm-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .comm-content {
    color: var(--gray-800);
  }
`;

export class PriorAuthClaimManagement extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      selectedPatient: { type: Object },
      selectedVisit: { type: Object },
      visits: { type: Array },
      careTeam: { type: Array },
      diagnoses: { type: Array },
      procedures: { type: Array },
      medications: { type: Array },
      collapsedSections: { type: Object },
      isLoading: { type: Boolean },
      formData: { type: Object },
      progress: { type: Number },
      visitDetails: { type: Object },
      supportingInfo: { type: Array },
      servicePrices: { type: Array },
      selectedPriceList: { type: Object },
      facilityId: { type: Number },
      loadingStates: { type: Object },
      payloadObject: { type: Object },
      isSubmitting: { type: Boolean },
      submitStatus: { type: String }, // 'idle' | 'submitting' | 'success' | 'error'
      submitMessage: { type: String },
      errors: { type: Array },
      communications: { type: Array },
    };
  }

  static get styles() {
    return [
      componentStyles,
      css`
        .dropdown-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-badge {
          background: var(--primary);
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .dropdown-item-short-desc {
          display: block;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-description {
          display: block;
          color: var(--gray-700);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-category {
          display: block;
          color: var(--gray-500);
          font-size: 0.75rem;
          font-style: italic;
        }

        .submit-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .submit-status {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 300px;
        }

        .submit-status.submitting {
          border-left: 4px solid var(--primary-color);
        }

        .submit-status.success {
          border-left: 4px solid var(--success-color, #4CAF50);
        }

        .submit-status.error {
          border-left: 4px solid var(--error-color, #f44336);
        }

        .loader {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin-bottom: 1rem;
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .submit-status p {
          margin: 0;
          color: var(--text-color);
          font-size: 1rem;
          line-height: 1.5;
        }

        .spinner {
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        }

        .error-item {
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-left: 4px solid var(--error);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .error-code, .error-display, .error-location {
          margin-bottom: 0.5rem;
        }

        .no-errors {
          color: var(--gray-500);
          text-align: center;
          padding: 1rem;
        }

        .communication-types {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 1rem;
        }

        .solicited, .unsolicited {
          background: var(--gray-50);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .communication-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .communication-item {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .comm-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: var(--gray-500);
          font-size: 0.875rem;
        }

        .comm-content {
          color: var(--gray-800);
        }

        /* Error Section Styles */
        .error-count {
          background: var(--error);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }

        .error-item {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          overflow: hidden;
          border: 1px solid var(--gray-200);
        }

        .error-item-header {
          background: var(--gray-50);
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--gray-200);
        }

        .error-code-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--error);
          font-weight: 500;
        }

        .error-icon, .message-icon, .location-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .error-content {
          padding: 1rem;
        }

        .error-message, .error-location {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: var(--gray-700);
        }

        .error-timestamp {
          color: var(--gray-500);
          font-size: 0.875rem;
        }

        /* Communication Section Styles */
        .communication-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }

        .communication-column {
          background: var(--gray-50);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .comm-type-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .communication-item {
          background: white;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--gray-200);
        }

        .comm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .comm-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .comm-status-icon {
          width: 1rem;
          height: 1rem;
        }

        .comm-date {
          color: var(--gray-500);
          font-size: 0.875rem;
        }

        .comm-status {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .comm-status.pending {
          background: var(--warning);
          color: white;
        }

        .comm-status.completed {
          background: var(--success);
          color: white;
        }

        .comm-content {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: var(--gray-700);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--gray-500);
        }

        .empty-icon {
          width: 3rem;
          height: 3rem;
          margin-bottom: 1rem;
          color: var(--gray-400);
        }

        .empty-state p {
          margin: 0;
          font-size: 0.875rem;
        }
      `
    ];
  }

  constructor() {
    super();
    this.activeTab = 'prior-auth';
    this.selectedPatient = null;
    this.selectedVisit = null;
    this.visits = [];
    this.careTeam = [];
    this.diagnoses = [];
    this.procedures = [];
    this.medications = [];
    this.collapsedSections = {
      patient: false,
      visit: false,
      'care-team': false,
      diagnosis: false,
      procedures: false,
      medications: false,
      supporting: false,
      errors: false,
      communications: false
    };
    this.isLoading = false;
    this.formData = {
      vitalSigns: {
        bloodPressure: '',
        height: '',
        weight: ''
      },
      clinicalInfo: {
        treatmentPlan: '',
        patientHistory: ''
      }
    };
    this.progress = 0;
    this.visitDetails = null;
    this.supportingInfo = [];
    this.servicePrices = [];
    this.selectedPriceList = null;
    this.facilityId = null;
    this.loadingStates = {};
    this.payloadObject = { ...PriorAuthClaimManagement.PayloadObject };
    this.isSubmitting = false;
    this.submitStatus = 'idle';
    this.submitMessage = '';
    this.errors = [];
    this.communications = [];
  }

  updatePayloadObject() {
    // Update patient information
    if (this.selectedPatient) {
      this.payloadObject.patient = {
        identifier: this.selectedPatient.nic || this.selectedPatient.id?.toString(),
        identifierSystem: "http://nphies.sa/identifier/iqama",
        firstName: this.selectedPatient.firstName || this.selectedPatient.arFname,
        middleName: this.selectedPatient.middleName,
        lastName: this.selectedPatient.lastName || this.selectedPatient.arLname,
        gender: this.selectedPatient.gender?.genderName?.toLowerCase() || 'unknown',
        dateOfBirth: this.selectedPatient.dateOfBirth,
        maritalStatus: this.selectedPatient.maritalStatus?.status || 'U',
        occupation: '',  // Not available in the data
        phoneNumber: this.selectedPatient.cellPhoneNo || this.selectedPatient.homePhoneNo || this.selectedPatient.officePhoneNo,
        nationalIdentity: this.selectedPatient.nic,
        address: {
          line1: this.selectedPatient.address || this.selectedPatient.arAddress || 'N/A',
          city: this.selectedPatient.city?.cityName,
          state: this.selectedPatient.city?.stateName,
          postalCode: this.selectedPatient.postalCode,
          country: this.selectedPatient.nationality?.countryName || this.selectedPatient.city?.country?.countryName
        },
        insurance: this.selectedPatient.patientInsurances?.[0] ? {
          memberId: this.selectedPatient.patientInsurances[0].memberId,
          planName: this.selectedPatient.patientInsurances[0].fkPlan?.planName,
          planCode: this.selectedPatient.patientInsurances[0].fkPlan?.planCode,
          companyName: this.selectedPatient.patientInsurances[0].payer?.companyName,
          startDate: this.selectedPatient.patientInsurances[0].startDate,
          expiryDate: this.selectedPatient.patientInsurances[0].expiryDate,
          priority: this.selectedPatient.patientInsurances[0].insurancePriority,
          relationshipToSubscriber: this.selectedPatient.patientInsurances[0].memberRelationTo
        } : null
      };
    }

    // Update encounter/visit information
    if (this.selectedVisit) {
      this.payloadObject.encounter = {
        id: this.selectedVisit.id,
        startDate: this.selectedVisit.startDate,
        endDate: this.selectedVisit.endDate,
        type: this.selectedVisit.type || "outpatient",
        class: this.selectedVisit.class || "AMB",
        classDisplay: this.selectedVisit.classDisplay || "Ambulatory",
        serviceEventCode: this.selectedVisit.serviceEventCode || "ICSE",
        serviceEventDescription: this.selectedVisit.description,
        status: this.selectedVisit.status || "planned"
      };
    }

    // Update care team
    this.payloadObject.careTeam = this.careTeam.map(member => ({
      practitionerId: member.id,
      role: member.role || "primary",
      qualification: member.qualification,
      specialty: member.specialty
    }));

    // Update diagnoses
    this.payloadObject.diagnoses = this.diagnoses.map(diagnosis => ({
      code: diagnosis.code,
      system: "http://hl7.org/fhir/sid/icd-10",
      type: diagnosis.type || "principal",
      display: diagnosis.description
    }));

    // Update procedures
    this.payloadObject.procedures = this.procedures.map(procedure => ({
      procedureCode: procedure.code,
      system: "http://nphies.sa/terminology/CodeSystem/oral-health-op",
      quantity: procedure.quantity || 1,
      unitPrice: procedure.amount,
      serviceDate: procedure.serviceDate || this.selectedVisit?.startDate,
      ToothCode: procedure.toothCode,
      ToothSiteCode: procedure.toothSiteCode,
      toothNumber: procedure.toothNumber
    }));

    // Update clinical information
    if (this.formData?.clinicalInfo) {
      this.payloadObject.clinicalInformation = {
        treatmentPlan: this.formData.clinicalInfo.treatmentPlan,
        patientHistory: this.formData.clinicalInfo.patientHistory
      };
    }

    // Dispatch event with updated payload
    this.dispatchEvent(new CustomEvent('payload-updated', {
      detail: { payload: this.payloadObject }
    }));
  }

  // Add handlers for form input changes
  async handlePatientSelect(event) {
    this.isLoading = true;
    try {
      const patientData = event.detail;
      this.selectedPatient = patientData;

      // Map insurance coverage to payload
      if (patientData.insuranceCoverages && patientData.insuranceCoverages[0]) {
        const coverage = patientData.insuranceCoverages[0];
        this.payloadObject.coverage = {
          subscriberId: coverage.subscriberId,
          membershipNumber: coverage.membershipNumber,
          coverageType: coverage.coverageType,
          relationshipToSubscriber: coverage.relationshipToSubscriber,
          insuranceCompany: coverage.insuranceCompany,
          planType: coverage.planType,
          effectiveDate: coverage.effectiveDate,
          expiryDate: coverage.expiryDate
        };
      }
      
      // Check if visits are already included in patient data
      if (patientData.visitmanagementVisits) {
        this.visits = patientData.visitmanagementVisits;
        if (this.visits.length > 0) {
          this.selectVisit(this.visits[0]);
        }
      } else {
        // Fetch visits only if not included in patient data
        await this.fetchVisits();
      }
      
      this.updateProgress();
    } catch (error) {
      console.error('Error handling patient selection:', error);
      this.showNotification('Error loading patient data', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async fetchVisits() {
    if (!this.selectedPatient) return;
    
    this.isLoading = true;
    try {
      const response = await fetch(API_ENDPOINTS.VISIT.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: "patientId==" + this.selectedPatient.id
        })
      });
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        // Map visit management visits
        if (result.dynamicResult[0]?.visitmanagementVisits) {
          this.visits = result.dynamicResult[0].visitmanagementVisits;
        } else {
          this.visits = result.dynamicResult;
        }

        if (this.visits.length > 0) {
          this.selectVisit(this.visits[0]);
          
          // Update payload with visit information
          this.payloadObject.visit = {
            id: this.visits[0].id,
            startDate: this.visits[0].startDate,
            endDate: this.visits[0].endDate,
            type: this.visits[0].type,
            status: this.visits[0].status,
            facility: this.visits[0].facilityId,
            provider: this.visits[0].providerId
          };
        }
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
      this.showNotification('Error loading visit data', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  handleVisitSelect(event) {
    this.selectedVisit = event.detail;
    this.updatePayloadObject();
  }

  handleCareTeamUpdate(event) {
    this.careTeam = event.detail;
    this.updatePayloadObject();
  }

  handleDiagnosisUpdate(event) {
    this.diagnoses = event.detail;
    this.updatePayloadObject();
  }

  handleProcedureUpdate(event) {
    this.procedures = event.detail;
    this.updatePayloadObject();
  }

  handleClinicalInfoUpdate(event) {
    const { name, value } = event.target;
    this.formData.clinicalInfo = {
      ...this.formData.clinicalInfo,
      [name]: value
    };
    this.updatePayloadObject();
  }

  firstUpdated() {
    this.updateProgress();
    
    // Initialize coverage verification widget
    this.coverageVerification = ShadowWidgets.createCoverageVerificationWithButton({
      position: 'bottom-right-1',
      glowing: true
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up the widget when component is destroyed
    if (this.coverageVerification) {
      this.coverageVerification.cleanup();
    }
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.isSubmitting ? html`
          <div class="submit-overlay">
            <div class="submit-status ${this.submitStatus}">
              <div class="loader"></div>
              <p>${this.submitMessage}</p>
            </div>
          </div>
        ` : ''}
        <div class="sticky-header">
          <div class="header">
            <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
            <div class="header-content">
              <h1 class="header-title">Prior Authorization Request</h1>
              <div class="progress-indicator">
                <div class="progress-bar" style="width: ${this.progress}%"></div>
              </div>
            </div>
            <button class="close-button" @click="${this.close}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="tabs">
            <div class="tab ${this.activeTab === 'prior-auth' ? 'active' : ''}"
                 @click="${() => this.switchTab('prior-auth')}">
              PRIOR AUTH
            </div>
          </div>
        </div>

        <div class="content">
          <div class="prior-auth-container">
            <!-- Patient Section -->
            <div class="section ${this.collapsedSections.patient ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('patient')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Patient Information
                </h2>
              </div>
              <div class="section-content">
                <patient-search
                  @patient-selected="${async (event) => this.handlePatientSelect(event) }"
                  .selectedPatient="${this.selectedPatient}">
                </patient-search>
              </div>
            </div>

            <!-- Visit Section -->
            <div class="section ${this.collapsedSections.visit ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('visit')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Visit Details
                </h2>
              </div>
              <div class="section-content">
                ${this.selectedPatient ? html`
                  <div class="visit-table-container">
                    ${this.visits && this.visits.length > 0 ? html`
                    <table class="visit-table">
                      <thead>
                        <tr>
                          <th>Visit ID</th>
                            <th>Visit Date</th>
                            <th>Visit Type</th>
                          <th>Status</th>
                            <th>Episode ID</th>
                            <th>Transaction ID</th>
                            <th>Facility</th>
                            <th>Provider</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.visits.map(visit => html`
                          <tr class="${this.selectedVisit?.id === visit.id ? 'selected' : ''}">
                              <td>${visit.id || 'N/A'}</td>
                              <td>${visit.startDate ? new Date(visit.startDate).toLocaleDateString() : 'N/A'}</td>
                              <td>${visit.type || 'Regular Visit'}</td>
                              <td>
                                <span class="status-badge ${this.getStatusClass(visit.status)}">
                                  ${visit.status || 'Scheduled'}
                              </span>
                            </td>
                              <td>${visit.episodeId || 'N/A'}</td>
                              <td>${visit.transactionIdno || 'N/A'}</td>
                              <td>${visit.facilityName || visit.fkFacilityId || 'N/A'}</td>
                              <td>${visit.doctorName || visit.doctorId || 'N/A'}</td>
                            <td>
                              <button 
                                class="btn-select"
                                ?disabled="${this.selectedVisit?.id === visit.id}"
                                @click="${() => this.handleVisitSelect({ detail: visit })}"
                              >
                                ${this.selectedVisit?.id === visit.id ? 'Selected' : 'Select'}
                              </button>
                            </td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                    ` : html`
                      <div class="empty-state">
                        <p>No visits found for this patient</p>
                      </div>
                    `}
                  </div>
                ` : html`
                  <div class="empty-state">
                    <p>Please select a patient first</p>
                  </div>
                `}
              </div>
            </div>

            <!-- Care Team Section -->
            <div class="section ${this.collapsedSections['care-team'] ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('care-team')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Care Team
                </h2>
              </div>
              <div class="section-content">
                <div class="form-field dropdown-container" id="practitionerDropdown">
                  <input type="text" class="form-input" id="practitionerSearch" 
                    placeholder=" " @input="${this.handlePractitionerSearch}">
                  <label class="form-label" for="practitionerSearch">Search Practitioner</label>
                </div>
                ${this.renderCareTeam()}
              </div>
            </div>

            <!-- Diagnosis Section -->
            <div class="section ${this.collapsedSections.diagnosis ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('diagnosis')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Diagnosis
                </h2>
              </div>
              <div class="section-content">
                <div class="form-field dropdown-container" id="diagnosisDropdown">
                  <input type="text" class="form-input" id="diagnosisSearch" 
                    placeholder=" " @input="${this.handleDiagnosisSearch}">
                  <label class="form-label" for="diagnosisSearch">Search ICD-10 Code</label>
                </div>
                ${this.renderDiagnosisTable()}
              </div>
            </div>

            <!-- Medications Section -->
            <div class="section ${this.collapsedSections.medications ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('medications')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Medications
                </h2>
              </div>
              <div class="section-content">
                <div class="form-field dropdown-container" id="medicationDropdown">
                  <input type="text" class="form-input" id="medicationSearch" 
                    placeholder="Search medications" @input="${this.handleMedicationSearch}">
                  <label class="form-label" for="medicationSearch">Search Medications</label>
                  </div>
                ${this.medications && this.medications.length > 0 ? html`
                  <div class="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Name</th>
                          <th>Dosage</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.medications.map(med => html`
                          <tr>
                            <td>${med.code || 'N/A'}</td>
                            <td>${med.name || 'N/A'}</td>
                            <td>${med.dosage || 'N/A'}</td>
                            <td>${med.quantity || 'N/A'}</td>
                            <td>${med.unit || 'N/A'}</td>
                            <td>SAR ${(med.amount || 0).toFixed(2)}</td>
                            <td>
                              <button class="btn btn-secondary" @click="${() => this.removeMedication(med)}">
                                Remove
                              </button>
                            </td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>
                ` : html`
                  <div class="empty-state">
                    <p>No medications added yet</p>
                    <p class="text-sm text-gray-500">Search and select medications above</p>
                </div>
                `}
              </div>
            </div>

            <!-- Supporting Information Section -->
            <div class="section ${this.collapsedSections.supporting ? 'collapsed' : ''}">
              <div class="section-header" @click="${() => this.toggleSection('supporting')}">
                <h2 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Supporting Information
                </h2>
              </div>
              <div class="section-content">
                ${this.renderVitals()}
              </div>
            </div>

           
             
                ${this.renderProcedureSection()}
                ${this.renderCommunicationSection()}
                ${this.renderErrorSection()}
            </div>
             
          </div>
            
        </div>

          

        <!-- Action Buttons -->
        <prior-auth-action-buttons
          .selectedPatient="${this.selectedPatient}"
          .selectedVisit="${this.selectedVisit}"
          .careTeam="${this.careTeam}"
          .diagnoses="${this.diagnoses}"
          .procedures="${this.procedures}"
          .clinicalInfo="${this.formData.clinicalInfo}"
          .payloadObject="${this.payloadObject}"
          @save-draft="${this.handleSaveAsDraft}"
          @validate="${this.handleValidate}"
          @submit="${this.handleSubmit}">
        </prior-auth-action-buttons>
      </div>
    `;
  }

  renderPatientInfo() {
    if (!this.selectedPatient) return '';
    
    return html`
      <div class="patient-info">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Name:</span>
            <span class="info-value">${this.selectedPatient.name}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ID:</span>
            <span class="info-value">${this.selectedPatient.id}</span>
          </div>
          <div class="info-item">
            <span class="info-label">DOB:</span>
            <span class="info-value">${this.selectedPatient.dateOfBirth}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Gender:</span>
            <span class="info-value">${this.selectedPatient.gender?.genderName || 'Unknown'}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderVisitDetails() {
    if (!this.visits?.length) return html`
      <div class="empty-state">
        No visits found for this patient
      </div>
    `;

    return html`
      <div class="visit-table-container">
        <table class="visit-table">
          <thead>
            <tr>
              <th>Visit ID</th>
              <th>Visit Date</th>
              <th>Visit Type</th>
              <th>Status</th>
              <th>Episode ID</th>
              <th>Transaction ID</th>
              <th>Facility</th>
              <th>Provider</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.visits.map(visit => html`
              <tr class="${this.selectedVisit?.id === visit.id ? 'selected' : ''}">
                <td>${visit.id || 'N/A'}</td>
                <td>${visit.startDate ? new Date(visit.startDate).toLocaleDateString() : 'N/A'}</td>
                <td>${visit.type || 'Regular Visit'}</td>
                <td>
                  <span class="status-badge ${this.getStatusClass(visit.status)}">
                    ${visit.status || 'Scheduled'}
                  </span>
                </td>
                <td>${visit.episodeId || 'N/A'}</td>
                <td>${visit.transactionIdno || 'N/A'}</td>
                <td>${visit.facilityName || visit.fkFacilityId || 'N/A'}</td>
                <td>${visit.doctorName || visit.doctorId || 'N/A'}</td>
                <td>
                  <button 
                    class="btn-select"
                    @click="${() => this.selectVisit(visit)}"
                    ?disabled="${this.selectedVisit?.id === visit.id}"
                  >
                    ${this.selectedVisit?.id === visit.id ? 'Selected' : 'Select'}
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderCareTeam() {
    if (!this.careTeam?.length) return html`
      <div class="empty-state">
        <p>No care team members found</p>
      </div>
    `;

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>LICENSE/PIN</th>
              <th>TITLE</th>
              <th>NAME</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
        ${this.careTeam.map(member => html`
              <tr>
                <td>${member.id}</td>
                <td>${member.pinNo || 'N/A'}</td>
                <td>${member.title}</td>
                <td>${member.name}</td>
                <td>${member.departmentId || 'N/A'}</td>
                <td>${member.designationId || 'N/A'}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeCareTeamMember(member)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
            </div>
    `;
  }

  renderVitals() {
    if (!this.selectedVisit) return html`
      <div class="empty-state">
        <p>No vitals information available</p>
        <p>Please select a visit first</p>
          </div>
    `;
    
    return html`
      <div class="vitals-container">
        <div class="form-grid">
          <!-- Vital Signs -->
          <div class="form-group">
            <h3 class="form-subtitle">Vital Signs</h3>
            <div class="vital-input-group">
              <div class="form-field">
                <label class="form-label">Blood Pressure</label>
                  <div class="bp-input-group">
                  <input type="text" class="form-input bp-input" 
                    .value="${this.formData.vitalSigns.bloodPressure}"
                    @input="${(e) => this.updateFormData('vitalSigns', 'bloodPressure', e.target.value)}">
                    <span>mmHg</span>
                  </div>
              </div>
              <div class="form-field">
                <label class="form-label">Height</label>
                  <div class="vital-input-group">
                  <input type="number" class="form-input" 
                    .value="${this.formData.vitalSigns.height}"
                    @input="${(e) => this.updateFormData('vitalSigns', 'height', e.target.value)}">
                    <span>cm</span>
                  </div>
              </div>
              <div class="form-field">
                <label class="form-label">Weight</label>
                  <div class="vital-input-group">
                  <input type="number" class="form-input" 
                    .value="${this.formData.vitalSigns.weight}"
                    @input="${(e) => this.updateFormData('vitalSigns', 'weight', e.target.value)}">
                    <span>kg</span>
                  </div>
                  </div>
                  </div>
        </div>

          <!-- Clinical Information -->
          <div class="form-group">
            <h3 class="form-subtitle">Clinical Information</h3>
            <div class="form-field">
              <label class="form-label">Treatment Plan</label>
              <textarea class="form-input" name="treatmentPlan" rows="4"
                .value="${this.formData.clinicalInfo.treatmentPlan}"
                @input="${this.handleClinicalInfoUpdate}"></textarea>
            </div>
            <div class="form-field">
              <label class="form-label">Patient History</label>
              <textarea class="form-input" name="patientHistory" rows="4"
                .value="${this.formData.clinicalInfo.patientHistory}"
                @input="${this.handleClinicalInfoUpdate}"></textarea>
            </div>
            <div class="form-field">
              <label class="form-label">Chief Complaint</label>
              <textarea class="form-input" name="chiefComplaint" rows="4"
                .value="${this.formData.clinicalInfo.chiefComplaint}"
                @input="${this.handleClinicalInfoUpdate}"></textarea>
          </div>
        </div>
      </div>
      </div>
    `;
  }

  renderProcedureSection() {
    return html`
      <div class="section ${this.isCollapsed('procedures') ? 'collapsed' : ''}">
        <div class="section-header" @click="${() => this.toggleSection('procedures')}">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Procedures
          </h2>
        </div>
        <div class="section-content">
          ${this.renderProcedureSearch()}
          ${this.renderProcedureTable()}
        </div>
      </div>
    `;
  }

  renderProcedureSearch() {
    return html`
      <div class="form-field dropdown-container" id="procedureDropdown">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            class="form-input" 
            placeholder="Search CPT Codes"
            @input="${this.handleProcedureSearch}"
          >
          ${this.loadingStates.procedures ? html`
            <div class="search-loading-indicator">
              <div class="spinner"></div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  async handleProcedureSearch(event) {
    const searchTerm = event.target.value?.trim();
    const container = this.shadowRoot.querySelector('#procedureDropdown');
    let resultsContainer = container.querySelector('.dropdown-results');
    
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'dropdown-results';
      container.appendChild(resultsContainer);
    }

    if (!searchTerm || searchTerm.length < 3) {
      resultsContainer.innerHTML = '<div class="dropdown-empty">Enter at least 3 characters to search</div>';
      return;
    }

    try {
      // Set only procedure loading state to true
      this.loadingStates = { ...this.loadingStates, procedures: true };
      this.requestUpdate();

      const response = await fetch(`${API_ENDPOINTS.MASTER_PRICE_SERVICE_DIRECTORY.AUTOCOMPLETE_SERVICES}?searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.isSuccessfull && result.dynamicResult) {
        console.log('Found procedures:', result.dynamicResult.length);
        const transformedResults = result.dynamicResult.map(procedure => {
          const standardCharges = typeof procedure.standardCharges === 'number' ? procedure.standardCharges : 
                                parseFloat(procedure.standardCharges) || 0;
          return {
            id: procedure.id,
            code: procedure.cptCode,
            name: procedure.serviceName,
            description: procedure.description || procedure.cptDescription || 'No description available',
            type: procedure.serviceTypeName || 'Procedure',
            category: procedure.serviceCategory || 'Procedure',
            status: procedure.serviceStatus || 'Unknown',
            facility: procedure.facilityName || 'Unknown Facility',
            unitType: procedure.unitTypeName || 'Per Service',
            standardCharges: standardCharges,
            isActive: procedure.isActive
          };
        });
        
        if (transformedResults.length === 0) {
          resultsContainer.innerHTML = '<div class="dropdown-empty">No procedures found matching your search</div>';
        } else {
          const procedureItems = transformedResults.map(procedure => {
            const procedureJson = JSON.stringify(procedure).replace(/'/g, '&apos;');
            return `<div class="dropdown-item" data-procedure='${procedureJson}'>
                <div class="dropdown-item-header">
                    <span class="dropdown-item-title">${procedure.code || 'No CPT Code'}</span>
                    <span class="dropdown-item-badge">${procedure.type}</span>
                </div>
                <span class="dropdown-item-short-desc">${procedure.name}</span>
                <span class="dropdown-item-description">${procedure.description}</span>
                <span class="dropdown-item-category">
                    ${procedure.facility} - ${procedure.unitType}
                    ${typeof procedure.standardCharges === 'number' ? ` - $${procedure.standardCharges.toFixed(2)}` : ''}
                </span>
            </div>`;
          }).join('');

          resultsContainer.innerHTML = procedureItems;

          // Add click handlers
          resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
              try {
                const procedure = JSON.parse(item.getAttribute('data-procedure'));
                console.log('Selected procedure:', procedure);
                this.selectProcedure(procedure);
                resultsContainer.remove();
              } catch (error) {
                console.error('Error selecting procedure:', error);
                this.showNotification('Error selecting procedure', 'error');
              }
            });
          });
        }
      } else {
        throw new Error(result.errorMessage || 'Failed to fetch procedures');
      }
    } catch (error) {
      console.error('Error searching procedures:', error);
      resultsContainer.innerHTML = `<div class="dropdown-error">Error: ${error.message}</div>`;
    } finally {
      // Reset only procedure loading state
      this.loadingStates = { ...this.loadingStates, procedures: false };
      this.requestUpdate();
    }
  }

  renderProcedureTable() {
    if (!this.procedures?.length) {
      return html`
        <div class="empty-state">
          <p>No procedures added yet</p>
          <p class="text-sm text-gray-500">Search and select procedures above</p>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>CPT Code</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Facility</th>
              <th>Charges</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.procedures.map(procedure => html`
              <tr>
                <td>${procedure.code}</td>
                <td>${procedure.name}</td>
                <td>${procedure.description}</td>
                <td>${procedure.type}</td>
                <td>${procedure.facility}</td>
                <td>$${typeof procedure.standardCharges === 'number' ? procedure.standardCharges.toFixed(2) : '0.00'}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeProcedure(procedure)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  async selectProcedure(procedure) {
    console.log('Selecting procedure:', procedure);
    
    // Check for duplicates
    if (this.procedures.some(p => p.code === procedure.code)) {
        console.log('Duplicate procedure found');
        this.showNotification('This procedure has already been added', 'warning');
        return;
    }

    // Initialize procedures array if it doesn't exist
    if (!Array.isArray(this.procedures)) {
        console.log('Initializing procedures array');
        this.procedures = [];
    }

    this.procedures = [...this.procedures, procedure];
    console.log('Updated procedures list:', this.procedures);
    
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Procedure added successfully', 'success');
  }

  renderMedicationTable() {
    return html`
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Dosage</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.medications.map(med => html`
              <tr>
                <td>${med.code}</td>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.quantity}</td>
                <td>${med.unit}</td>
                <td>SAR ${med.amount.toFixed(2)}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeMedication(med)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  async handleMedicationSearch(event) {
    const searchTerm = event.target.value.trim().toUpperCase();
    console.log('Medication search triggered with term:', searchTerm);

    if (searchTerm.length < 2) {
        const container = this.shadowRoot.querySelector('#medicationDropdown');
        if (container) {
            const resultsContainer = container.querySelector('.dropdown-results');
            if (resultsContainer) {
                resultsContainer.innerHTML = '';
            }
        }
        return;
    }

    try {
        const response = await fetch(`${API_ENDPOINTS.MASTER_PRICE_SERVICE_DIRECTORY.AUTOCOMPLETE_SERVICES}?searchTerm=${encodeURIComponent(searchTerm)}&serviceTypeId=3`);
        if (!response.ok) throw new Error('Failed to fetch medications');
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.isSuccessfull && data.dynamicResult) {
            const results = data.dynamicResult;
            console.log('Processed Results:', results);
            
            if (results.length > 0) {
                this.showMedicationResults(results);
            } else {
                const container = this.shadowRoot.querySelector('#medicationDropdown');
                if (container) {
                    let resultsContainer = container.querySelector('.dropdown-results');
                    if (!resultsContainer) {
                        resultsContainer = document.createElement('div');
                        resultsContainer.className = 'dropdown-results';
                        container.appendChild(resultsContainer);
                    }
                    resultsContainer.innerHTML = '<div class="dropdown-empty">No medications found</div>';
                }
            }
        } else {
            throw new Error(data.errorMessage || 'Failed to fetch medications');
        }
    } catch (error) {
        console.error('Error searching medications:', error);
        this.showNotification('Error searching medications', 'error');
    }
}

showMedicationResults(results) {
    console.log('Showing medication results:', results);
    const container = this.shadowRoot.querySelector('#medicationDropdown');
    if (!container) {
        console.error('Medication dropdown container not found');
        return;
    }

    let resultsContainer = container.querySelector('.dropdown-results');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'dropdown-results';
        container.appendChild(resultsContainer);
    }

    if (!Array.isArray(results) || results.length === 0) {
        resultsContainer.innerHTML = '<div class="dropdown-empty">No medications found</div>';
        return;
    }

    resultsContainer.innerHTML = results.map(med => `
        <div class="dropdown-item" data-id="${med.id}">
            <div class="dropdown-item-header">
                <span class="dropdown-item-title">${med.serviceName || 'N/A'}</span>
                <span class="dropdown-item-badge">SAR ${med.standardCharges?.toFixed(2) || '0.00'}</span>
            </div>
            <div class="dropdown-item-content">
                <span class="dropdown-item-description">${med.description || 'No description available'}</span>
                <div class="dropdown-item-details">
                    <span class="dropdown-item-facility">${med.facilityName || 'N/A'}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const medId = item.getAttribute('data-id');
            const selectedMed = results.find(m => m.id === parseInt(medId));
            console.log('Selected medication:', selectedMed);
            if (selectedMed) {
                this.promptForDosage(selectedMed);
            }
            resultsContainer.innerHTML = '';
        });
    });
}

promptForDosage(medication) {
    console.log('Prompting for dosage:', medication);
    const modal = document.createElement('div');
    modal.innerHTML = `
        <style>
            .btn-primary {
                background-color: var(--medical-primary) !important;
                color: white !important;
                border: none !important;
                padding: 8px 16px !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
            }
            .btn-primary:hover {
                background-color: var(--primary-dark) !important;
                transform: translateY(-1px) !important;
            }
            .btn-secondary {
                background-color: white !important;
                color: var(--gray-700) !important;
                border: 1px solid var(--gray-300) !important;
                padding: 8px 16px !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
                margin-right: 8px !important;
            }
            .btn-secondary:hover {
                border-color: var(--gray-400) !important;
                color: var(--gray-900) !important;
            }
            .dosage-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
                z-index: 9999;
            }
            .dosage-modal {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                width: 400px;
                max-width: 90%;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .modal-header {
                margin-bottom: 20px;
            }
            .modal-header h3 {
                margin: 0;
                color: var(--medical-primary);
            }
            .modal-header p {
                margin: 10px 0 0;
                color: var(--gray-600);
                font-size: 14px;
            }
            .form-field {
                margin-bottom: 15px;
            }
            .form-field label {
                display: block;
                margin-bottom: 5px;
                color: var(--gray-700);
            }
            .form-field input, .form-field select {
                width: 100%;
                padding: 8px;
                border: 1px solid var(--gray-300);
                border-radius: 4px;
            }
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
        </style>
        <div class="dosage-modal-overlay">
            <div class="dosage-modal">
                <div class="modal-header">
                    <h3>Enter Medication Details</h3>
                    <p>${medication.serviceName || 'Selected Medication'}</p>
                </div>
                <div class="modal-content">
                    <div class="form-field">
                        <label>Dosage</label>
                        <input type="text" id="dosageInput" placeholder="e.g., 500mg" required>
                    </div>
                    <div class="form-field">
                        <label>Quantity</label>
                        <input type="number" id="quantityInput" min="1" value="1" required>
                    </div>
                    <div class="form-field">
                        <label>Unit</label>
                        <select id="unitInput">
                            <option value="tablets">Tablets</option>
                            <option value="capsules">Capsules</option>
                            <option value="ml">ML</option>
                            <option value="mg">MG</option>
                            <option value="units">Units</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
                    <button class="btn btn-primary" id="confirmBtn">Submit</button>
                </div>
            </div>
        </div>
    `;

    // First add the modal to the document
    document.body.appendChild(modal);

    // Now get references to the elements after they're in the DOM
    const confirmBtn = modal.querySelector('#confirmBtn');
    const cancelBtn = modal.querySelector('#cancelBtn');
    const dosageInput = modal.querySelector('#dosageInput');
    const quantityInput = modal.querySelector('#quantityInput');
    const unitInput = modal.querySelector('#unitInput');

    const closeModal = () => {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    };

    confirmBtn.addEventListener('click', () => {
        const dosage = dosageInput.value.trim();
        const quantity = parseInt(quantityInput.value);
        const unit = unitInput.value;

        if (!dosage || !quantity) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const medicationData = {
            ...medication,
            dosage,
            quantity,
            unit,
            amount: (medication.standardCharges || 0) * quantity
        };

        console.log('Adding medication with data:', medicationData);
        this.selectMedication(medicationData);
        closeModal();
    });

    cancelBtn.addEventListener('click', closeModal);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.dosage-modal-overlay')) {
            closeModal();
        }
    });

    // Focus on dosage input
    dosageInput.focus();
}

selectMedication(medication) {
    const newMedication = {
        id: medication.id,
        code: medication.serviceCode,
        name: medication.serviceName,
        description: medication.description || '',
        type: medication.serviceTypeName,
        dosage: medication.dosage,
        quantity: medication.quantity,
        unit: medication.unit,
        amount: medication.standardCharges || 0
    };

    this.medications = [...this.medications, newMedication];
    this.requestUpdate();
    this.showNotification('Medication added successfully', 'success');
  }

  renderClaims() {
    // Transform clinical info into observation format
    const observations = [
      {
        id: 'O1',
        title: 'Treatment Plan',
        date: new Date().toISOString(),
        value: this.formData?.clinicalInfo?.treatmentPlan || 'Standard treatment protocol to be followed'
      },
      {
        id: 'O2',
        title: 'Patient History',
        date: new Date().toISOString(),
        value: this.formData?.clinicalInfo?.patientHistory || 'No significant past medical history'
      },
      {
        id: 'O3',
        title: 'Chief Complaint',
        date: new Date().toISOString(),
        value: this.formData?.clinicalInfo?.chiefComplaint || 'Patient presents with typical symptoms'
      }
    ];

    // Transform diagnoses to match claim format
    const formattedDiagnoses = (this.diagnoses || []).map((diagnosis, index) => ({
      id: `D${index + 1}`,
      code: diagnosis.code,
      description: diagnosis.description || diagnosis.display,
      date: new Date().toISOString(),
      amount: diagnosis.amount || 500.00 // Default amount if not specified
    }));

    // Transform procedures to match claim format
    const formattedProcedures = {};
    formattedDiagnoses.forEach(diagnosis => {
      formattedProcedures[diagnosis.id] = (this.procedures || [])
        .filter(proc => proc.diagnosisId === diagnosis.id)
        .map((procedure, index) => ({
          id: `P${index + 1}`,
          name: procedure.name || procedure.description,
          code: procedure.code,
          quantity: procedure.quantity || 1,
          amount: procedure.amount || 250.00 // Default amount if not specified
        }));
    });

    // Transform medications to match claim format
    const formattedMedications = (this.medications || []).map((medication, index) => ({
      id: `M${index + 1}`,
      name: medication.name || medication.description,
      dosage: medication.dosage || '100mg',
      quantity: medication.quantity || 30,
      unit: medication.unit || 'tablets',
      amount: medication.amount || 120.00 // Default amount if not specified
    }));

    return html`
      <div class="claims-container">
        <claim-component
          .claimData=${{
            provider: {
              id: this.selectedVisit?.facilityId || 'PR-12345',
              name: this.selectedVisit?.facilityName || 'Healthcare Provider',
              address: this.selectedVisit?.facilityAddress || '123 Medical Center Drive',
              city: this.selectedVisit?.facilityCity || 'Riyadh',
              country: 'Saudi Arabia',
              contact: this.selectedVisit?.facilityContact || '+966 12 345 6789'
            },
            patient: {
              id: this.selectedPatient?.nationalId || 'PT-67890',
              name: this.selectedPatient ? 
                `${this.selectedPatient.firstName || ''} ${this.selectedPatient.lastName || ''}` : 
                'John Doe',
              insurance: this.selectedVisit?.insuranceCompany || 'Premium Health Insurance'
            }
          }}
          .selectedDiagnosis=${formattedDiagnoses}
          .selectedProcedures=${formattedProcedures}
          .selectedMedications=${formattedMedications}
          .observations=${observations}
          @claim-submit=${this.handleClaimSubmit}
          @save-draft=${this.handleClaimDraft}
        ></claim-component>
      </div>
    `;
  }

  async handleClaimSubmit(e) {
    try {
      const claimData = e.detail;
      this.isLoading = true;

      // Prepare the claim submission payload
      const payload = {
        visitId: this.selectedVisit.id,
        patientId: this.selectedPatient.id,
        facilityId: this.selectedVisit.facilityId,
        diagnosis: claimData.diagnosis.map(d => ({
          code: d.code,
          description: d.description,
          amount: d.amount,
          procedures: this.selectedProcedures[d.id] || []
        })),
        medications: claimData.medications,
        observations: claimData.observations,
        totalAmount: parseFloat(claimData.totals.total),
        vatAmount: parseFloat(claimData.totals.vat),
        status: 'SUBMITTED'
      };

      // Call your API endpoint to submit the claim
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit claim');

      this.showNotification('Claim submitted successfully', 'success');
      this.switchTab('prior-auth');
    } catch (error) {
      console.error('Error submitting claim:', error);
      this.showNotification(error.message, 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleClaimDraft(e) {
    try {
      const draftData = e.detail;
      this.isLoading = true;

      // Prepare the draft payload
      const payload = {
        visitId: this.selectedVisit.id,
        patientId: this.selectedPatient.id,
        facilityId: this.selectedVisit.facilityId,
        diagnosis: draftData.diagnosis.map(d => ({
          code: d.code,
          description: d.description,
          amount: d.amount,
          procedures: this.selectedProcedures[d.id] || []
        })),
        medications: draftData.medications,
        observations: draftData.observations,
        totalAmount: parseFloat(draftData.totals.total),
        vatAmount: parseFloat(draftData.totals.vat),
        status: 'DRAFT'
      };

      // Call your API endpoint to save the draft
      const response = await fetch('/api/claims/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save draft');

      this.showNotification('Draft saved successfully', 'success');
    } catch (error) {
      console.error('Error saving draft:', error);
      this.showNotification(error.message, 'error');
    } finally {
      this.isLoading = false;
    }
  }

  renderReports() {
    return html`
      <div class="reports-container">
        <h2>Reports</h2>
        <!-- Implement reports UI -->
      </div>
    `;
  }

  // Event Handlers
  async handlePatientSelected(event) {
    this.isLoading = true;
    try {
      this.selectedPatient = event.detail;
      
      // Fetch visits for the selected patient
      await this.fetchVisits();
      
      this.updateProgress();
    } catch (error) {
      console.error('Error fetching patient visits:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchVisits() {
    if (!this.selectedPatient) return;
    
    this.isLoading = true;
    try {
      const response = await fetch(API_ENDPOINTS.VISIT.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: "patientId==" + this.selectedPatient.id
        })
      });
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        // Map visit management visits
        if (result.dynamicResult[0]?.visitmanagementVisits) {
          this.visits = result.dynamicResult[0].visitmanagementVisits;
        } else {
        this.visits = result.dynamicResult;
        }

        if (this.visits.length > 0) {
          this.selectVisit(this.visits[0]);
          
          // Update payload with visit information
          this.payloadObject.visit = {
            id: this.visits[0].id,
            startDate: this.visits[0].startDate,
            endDate: this.visits[0].endDate,
            type: this.visits[0].type,
            status: this.visits[0].status,
            facility: this.visits[0].facilityId,
            provider: this.visits[0].providerId
          };
        }
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
      this.showNotification('Error loading visit data', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async processVisitData(visit) {
    if (!visit) return;

    // Set visit details
    this.visitDetails = {
      id: visit.id,
      date: visit.visitDate,
      time: visit.startTime,
      type: this.getVisitTypeName(visit.fkVisitSubTypeId),
      status: this.getVisitStatusName(visit.fkPatientVisitStatusId),
      facility: visit.fkFacilityId,
      reasonOfVisit: visit.reasonOfVisit,
      episodeId: visit.episodeId,
      transactionId: visit.transactionIdno
    };

    // Set care team from the visit's doctor information
    if (visit.doctor) {
      const doctor = {
        id: visit.doctor.id,
        pinNo: visit.doctor.pinNo,
        title: 'Dr.',
        name: `${visit.doctor.fname} ${visit.doctor.lname}`.trim(),
        departmentId: visit.doctor.departmentId,
        designationId: visit.doctor.designationId
      };
      
      this.careTeam = [doctor];
    }

    // Set the selected visit
    this.selectedVisit = visit;

    // Fetch vitals for the visit
    const bmiRecords = await this.fetchVitals(visit.id);
    
    // Update form data with BMI information if available
    const bmiRecord = bmiRecords.find(bmi => bmi.visitId === visit.id) || bmiRecords[0];
    
    if (bmiRecord) {
      this.formData = {
        ...this.formData,
        vitalSigns: {
          bloodPressure: `${bmiRecord.systolic || '0'}/${bmiRecord.diastolic || '0'}`,
          height: bmiRecord.height || 0,
          weight: bmiRecord.weight || 0
        },
        clinicalInfo: {
          chiefComplaint: bmiRecord.chiefComplaint || '',
          treatmentPlan: this.formData.clinicalInfo.treatmentPlan,
          patientHistory: this.formData.clinicalInfo.patientHistory
        }
      };
    } else {
      // Set default values if no BMI record exists
      this.formData = {
        ...this.formData,
        vitalSigns: {
          bloodPressure: '0/0',
          height: 0,
          weight: 0
        },
        clinicalInfo: {
          chiefComplaint: '',
          treatmentPlan: this.formData.clinicalInfo.treatmentPlan,
          patientHistory: this.formData.clinicalInfo.patientHistory
        }
      };
    }

    // Set procedures from billing details/services if available
    if (visit.services && Array.isArray(visit.services)) {
    this.procedures = visit.services.map(service => ({
      id: service.id,
      code: service.cptCode,
      name: service.serviceName,
        description: service.description || 'No description available',
        type: service.serviceTypeName || 'Service',
        charges: service.charges || 0,
      provider: service.provider,
      date: service.date,
      status: service.status
    }));
    } else {
      this.procedures = [];
    }

    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Medication added successfully', 'success');
  }

  selectCareTeamMember(member) {
    // Prevent duplicate team members
    if (this.careTeam.some(m => m.id === member.EmployeeId)) {
      this.showNotification('This team member has already been added', 'warning');
      return;
    }

    const teamMember = {
      id: member.EmployeeId,
      firstName: member.Fname,
      lastName: member.Lname,
      email: member.Email,
      department: member.DepartmentName,
      role: member.Role || 'Healthcare Provider'
    };

    this.careTeam = [...this.careTeam, teamMember];
    this.updateProgress();
  }

  async handlePractitionerSearch(event) {
    const searchText = event.target.value;
    if (searchText.length < 3) return;

    this.isLoading = true;
    try {
      const response = await fetch(API_ENDPOINTS.CARE_TEAM.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: searchText ? `Fname.contains("${searchText}") or Lname.contains("${searchText}")` : null
        })
      });

      const result = await response.json();
      if (result.isSuccessfull) {
        const practitioners = result.dynamicResult.map(emp => ({
          id: emp.id,
          name: `${emp.fname} ${emp.lname}`,
          title: emp.title || 'Dr.',
          pinNo: emp.pinNo,
          departmentId: emp.departmentId,
          designationId: emp.designationId,
          specialty: emp.specialty || 'General'
        }));
        this.showPractitionerResults(practitioners);
      }
    } catch (error) {
      console.error('Error searching practitioners:', error);
      this.showNotification('Error searching practitioners', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleDiagnosisSearch(event) {
    const searchTerm = event.target.value;
    console.log('Diagnosis search triggered with term:', searchTerm);

    // Get or create the dropdown container
    const container = this.shadowRoot.querySelector('#diagnosisDropdown');
    let resultsContainer = container.querySelector('.dropdown-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'dropdown-results';
        container.appendChild(resultsContainer);
    }

    if (searchTerm?.length < 3) {
        console.log('Search term too short, clearing results');
        resultsContainer.innerHTML = '<div class="dropdown-empty">Please enter at least 3 characters to search</div>';
        return;
    }

    this.isLoading = true;
    resultsContainer.innerHTML = '<div class="dropdown-loading"><div class="loading-spinner"></div>Searching ICD codes...</div>';

    try {
        const response = await fetch(`${API_ENDPOINTS.DIAGNOSIS.SEARCH_ICDS}/${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Raw response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

      const result = await response.json();
        console.log('Diagnosis search result:', result);

        if (result.isSuccessfull && result.dynamicResult) {
            console.log('Found diagnoses:', result.dynamicResult.length);
            const transformedResults = result.dynamicResult.map(diagnosis => ({
                id: diagnosis.id,
                code: diagnosis.icdcode,
                shortDescription: diagnosis.shortDescription,
                description: diagnosis.description,
                preAuthReq: diagnosis.preAuthReq
            }));
            
            if (transformedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="dropdown-empty">No ICD codes found matching your search</div>';
            } else {
                const diagnosisItems = transformedResults.map(diagnosis => {
                    const diagnosisJson = JSON.stringify(diagnosis).replace(/'/g, '&apos;');
                    return `<div class="dropdown-item" data-diagnosis='${diagnosisJson}'>
                        <div class="dropdown-item-header">
                            <span class="dropdown-item-title">${diagnosis.code}</span>
                            <span class="dropdown-item-badge">${diagnosis.preAuthReq ? 'Prior Auth Required' : 'No Auth Required'}</span>
                        </div>
                        <span class="dropdown-item-short-desc">${diagnosis.shortDescription}</span>
                        <span class="dropdown-item-description">${diagnosis.description}</span>
                    </div>`;
                }).join('');

                resultsContainer.innerHTML = diagnosisItems;

                // Add click handlers
                resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
                    item.addEventListener('click', () => {
                        try {
                            const diagnosis = JSON.parse(item.getAttribute('data-diagnosis'));
                            console.log('Selected diagnosis:', diagnosis);
                            this.selectDiagnosis(diagnosis);
                            resultsContainer.remove();
                        } catch (error) {
                            console.error('Error selecting diagnosis:', error);
                            this.showNotification('Error selecting diagnosis', 'error');
                        }
                    });
                });
            }
        } else {
            throw new Error(result.errorMessage || 'Failed to fetch diagnoses');
      }
    } catch (error) {
        console.error('Error in diagnosis search:', error);
        this.showNotification(`Error searching diagnoses: ${error.message}`, 'error');
        resultsContainer.innerHTML = '<div class="dropdown-empty error"><p>Error searching diagnoses:</p><p>' + error.message + '</p></div>';
    } finally {
      this.isLoading = false;
        this.requestUpdate();
    }
  }

  handleFileUpload(event) {
    const files = event.target.files;
    // Implement file upload logic
    this.updateProgress();
  }

  updateFormData(section, field, value) {
    this.formData = {
      ...this.formData,
      [section]: {
        ...this.formData[section],
        [field]: value
      }
    };
    this.updateProgress();
  }

  async handleSaveAsDraft() {
    this.isLoading = true;
    try {
      // Implement save as draft logic
      const formData = this.getFormData();
      // Save to local storage or API
      localStorage.setItem('priorAuthDraft', JSON.stringify(formData));
      this.showNotification('Draft saved successfully', 'success');
    } catch (error) {
      console.error('Error saving draft:', error);
      this.showNotification('Error saving draft', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleValidate() {
    this.isLoading = true;
    try {
      const formData = this.getFormData();
      const response = await fetch(API_ENDPOINTS.ELIGIBILITY.VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.isSuccessfull) {
        this.showNotification('Validation successful', 'success');
      } else {
        this.showNotification(result.errorMessage || 'Validation failed', 'error');
      }
    } catch (error) {
      console.error('Error validating form:', error);
      this.showNotification('Error validating form', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.requestUpdate();

    try {
      if (!this.selectedPatient) {
        throw new Error('Please select a patient first');
      }

      // Get the dental prior auth template
      const response = await fetch('/src/data/dp.json');
      const dentalPriorAuth = await response.json();

      // Update only the Patient object with selected patient's information
      dentalPriorAuth.Patient = {
        Identifier: this.selectedPatient.id.toString(),
        IdentifierSystem: "http://nphies.sa/identifier/iqama",
        FirstName: this.selectedPatient.fname || '',
        LastName: this.selectedPatient.lname || '',
        Gender: this.selectedPatient.gender?.toLowerCase() || 'unknown',
        DateOfBirth: this.selectedPatient.dateOfBirth || '',
        MaritalStatus: this.selectedPatient.maritalStatus || 'U',
        Occupation: this.selectedPatient.occupation || '',
        PhoneNumber: this.selectedPatient.phoneNumber || '',
        NationalIdentity: this.selectedPatient.nationalId || ''
      };

      // Submit the prior authorization request
      const submitResponse = await fetch(API_ENDPOINTS.PRIOR_AUTH.DENTAL_SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentalPriorAuth)
      });

      const result = await submitResponse.json();
      if (result.isSuccessfull) {
        this.handleClose();
      } else {
        throw new Error(result.errorMessage || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting prior auth:', error);
      this.showNotification('Error submitting prior authorization: ' + error.message, 'error');
    } finally {
      this.isSubmitting = false;
      this.requestUpdate();
    }
  }

  removeCareTeamMember(member) {
    this.careTeam = this.careTeam.filter(m => m.id !== member.id);
  }

  removeDiagnosis(diagnosis) {
    this.diagnoses = this.diagnoses.filter(d => d.code !== diagnosis.code);
  }

  removeProcedure(procedure) {
    this.procedures = this.procedures.filter(p => p.code !== procedure.code);
  }

  async switchTab(tab) {
    if (tab === this.activeTab) return;
      this.activeTab = tab;
    
    if (tab === 'prior-auth') {
        await this.fetchVisits();
    }
    this.requestUpdate();
  }

  handleClose() {
    this.reset();
    // Dispatch a custom event to notify parent components
    this.dispatchEvent(new CustomEvent('close'));
  }

  reset() {
    // Reset all component state to initial values
    this.activeTab = 'prior-auth';
    this.selectedPatient = null;
    this.selectedVisit = null;
    this.visits = [];
    this.careTeam = [];
    this.diagnoses = [];
    this.procedures = [];
    this.medications = [];
    this.collapsedSections = {
      patient: false,
      visit: false,
      'care-team': false,
      diagnosis: false,
      procedures: false,
      medications: false,
      supporting: false,
      errors: false,
      communications: false
    };
    this.isLoading = false;
    this.formData = {
      vitalSigns: {
        bloodPressure: '',
        height: '',
        weight: ''
      },
      clinicalInfo: {
        treatmentPlan: '',
        patientHistory: '',
        chiefComplaint: ''
      }
    };
    this.progress = 0;
    this.visitDetails = null;
    this.supportingInfo = [];
    this.servicePrices = [];
    this.selectedPriceList = null;
    
    // Request an update to reflect the changes
    this.requestUpdate();
  }

  getProgressPercentage() {
    return this.progress;
  }

  updateProgress() {
    let completedSteps = 0;
    let totalSteps = 7; // Total number of sections

    // Check patient selection and mark section as complete
    if (this.selectedPatient) {
        completedSteps++;
        this.collapsedSections.patient = true;
    }

    // Check visit selection and mark section as complete
    if (this.selectedVisit) {
        completedSteps++;
        this.collapsedSections.visit = true;
    }

    // Check care team and mark section as complete
    if (this.careTeam && this.careTeam.length > 0) {
        completedSteps++;
        this.collapsedSections['care-team'] = true;
    }

    // Check diagnosis and mark section as complete
    if (this.diagnoses && this.diagnoses.length > 0) {
        completedSteps++;
        this.collapsedSections.diagnosis = true;
    }

    // Check procedures and mark section as complete
    if (this.procedures && this.procedures.length > 0) {
        completedSteps++;
        this.collapsedSections.procedures = true;
    }

    // Check medications and mark section as complete
    if (this.medications && this.medications.length > 0) {
        completedSteps++;
        this.collapsedSections.medications = true;
    }

    // Check supporting info and mark section as complete
    const hasSupporting = 
        (this.formData.vitalSigns.bloodPressure || 
         this.formData.vitalSigns.height || 
         this.formData.vitalSigns.weight) ||
        (this.formData.clinicalInfo.treatmentPlan || 
         this.formData.clinicalInfo.patientHistory || 
         this.formData.clinicalInfo.chiefComplaint);
    
    if (hasSupporting) {
        completedSteps++;
        this.collapsedSections.supporting = true;
    }

    this.progress = Math.round((completedSteps / totalSteps) * 100);
    
    // Update payload object when a section is completed
    this.updatePayloadObject();
    
    // Request an update to reflect the changes
    this.requestUpdate();
  }

  isCollapsed(section) {
    return this.collapsedSections[section];
  }

  toggleSection(section) {
    this.collapsedSections = {
      ...this.collapsedSections,
      [section]: !this.collapsedSections[section]
    };
    this.requestUpdate();
  }

  getFormData() {
    return {
      patient: this.selectedPatient,
      visit: this.selectedVisit,
      careTeam: this.careTeam,
      diagnoses: this.diagnoses,
      procedures: this.procedures,
      vitalSigns: this.formData.vitalSigns,
      clinicalInfo: this.formData.clinicalInfo,
      medications: this.medications
    };
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 200);
    }, 3000);
  }

  showPractitionerResults(results) {
    const container = this.shadowRoot.querySelector('#practitionerDropdown');
    if (!container) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-results';

    if (this.isLoading) {
      dropdown.innerHTML = `
        <div class="dropdown-loading">
          <div class="loading-spinner"></div>
          Searching...
        </div>
      `;
    } else if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-empty">
          No practitioners found
        </div>
      `;
    } else {
      dropdown.innerHTML = results.map(practitioner => `
        <div class="dropdown-item" @click="${() => this.selectPractitioner(practitioner)}">
          <span class="dropdown-item-title">${practitioner.name}</span>
          <span class="dropdown-item-subtitle">${practitioner.specialty} - ${practitioner.licenseNumber}</span>
        </div>
      `).join('');
    }

    // Remove existing dropdown if any
    const existingDropdown = container.querySelector('.dropdown-results');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    container.appendChild(dropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.remove();
      }
    }, { once: true });
  }

  selectPractitioner(practitioner) {
    this.careTeam = [...this.careTeam, practitioner];
    this.updateProgress();
    this.requestUpdate();
  }

  selectVisit(visit) {
    this.selectedVisit = visit;
    // Process the selected visit's billing details and other information
    this.processVisitData(visit);
    this.requestUpdate();
  }

  // Add debounce helper method
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  showProcedureResults(results) {
    const container = this.shadowRoot.querySelector('#procedureDropdown');
    if (!container) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'healthcare-results';

    if (this.isLoading) {
      dropdown.innerHTML = `
        <div class="dropdown-loading">
          <div class="loading-spinner"></div>
          <span>Searching...</span>
        </div>
      `;
    } else if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-empty">
          <span>No services found</span>
        </div>
      `;
    } else {
      const procedureItems = results.map(service => `
        <div class="healthcare-result-item" data-procedure='${JSON.stringify(service)}'>
          <h4>${service.name}</h4>
          <p>${service.description || 'No description available'}</p>
          <div class="healthcare-badges">
            <span class="healthcare-badge badge-type">${service.type}</span>
            ${service.code ? `<span class="healthcare-badge badge-code">CPT: ${service.code}</span>` : ''}
            <span class="healthcare-badge badge-price">$${(service.charges || 0).toFixed(2)}</span>
          </div>
        </div>
      `).join('');

      dropdown.innerHTML = procedureItems;

      // Add click handlers
      dropdown.querySelectorAll('.healthcare-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const procedure = JSON.parse(item.getAttribute('data-procedure'));
          this.selectProcedure(procedure);
          dropdown.remove();
        });
      });
    }

    // Remove existing dropdown if any
    const existingDropdown = container.querySelector('.healthcare-results');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    container.appendChild(dropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.remove();
      }
    }, { once: true });
  }

  getVisitTypeName(typeId) {
    const types = {
      1: 'Regular Visit',
      2: 'Follow-up',
      3: 'Emergency',
      4: 'Consultation'
    };
    return types[typeId] || 'Unknown';
  }

  getVisitStatusName(statusId) {
    const statuses = {
      1: 'Scheduled',
      2: 'In Progress',
      3: 'Completed',
      4: 'Cancelled'
    };
    return statuses[statusId] || 'Unknown';
  }

  getStatusClass(statusId) {
    const classes = {
      1: 'status-scheduled',
      2: 'status-in-progress',
      3: 'status-completed',
      4: 'status-cancelled'
    };
    return classes[statusId] || 'status-scheduled';
  }

  async fetchServicePrices(serviceId) {
    try {
      const response = await fetch(API_ENDPOINTS.MPDIR_SERVICE_PRICE.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: 'serviceId==' + serviceId + ',isActive==true',
          sorts: '-effectiveFrom',
          page: 1,
          pageSize: 10
        })
      });

      if (!response.ok) throw new Error('Failed to fetch service prices');
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        this.servicePrices = result.dynamicResult;
    this.requestUpdate();
      } else {
        throw new Error(result.errorMessage || 'Failed to fetch service prices');
      }
    } catch (error) {
      console.error('Error fetching service prices:', error);
      this.showNotification(error.message, 'error');
    }
  }

  async fetchPriceList(serviceId) {
    if (!this.facilityId) return;

    try {
      const response = await fetch(API_ENDPOINTS.MPDIR_SERVICE_DIRECTORY_PRICELIST.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: 'serviceId==' + serviceId + ',facilityId==' + this.facilityId,
          sorts: '-effectiveDate',
          page: 1,
          pageSize: 10
        })
      });

      if (!response.ok) throw new Error('Failed to fetch price list');
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        this.selectedPriceList = result.dynamicResult[0] || null;
        this.requestUpdate();
      } else {
        throw new Error(result.errorMessage || 'Failed to fetch price list');
      }
    } catch (error) {
      console.error('Error fetching price list:', error);
      this.showNotification(error.message, 'error');
    }
  }

  async fetchVitals(visitId) {
    try {
      // Try outpatient BMI records first
      const outpatientResponse = await fetch(API_ENDPOINTS.VITALS.OUTPATIENT_BMI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: 'visitId==' + visitId
        })
      });

      let bmiRecords = [];
      const outpatientResult = await outpatientResponse.json();
      
      if (outpatientResult.isSuccessfull && outpatientResult.dynamicResult?.length > 0) {
        bmiRecords = outpatientResult.dynamicResult;
      } else {
        // If no outpatient records, try inpatient records
        const inpatientResponse = await fetch(API_ENDPOINTS.VITALS.INPATIENT_BMI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 1,
            pageSize: 10,
            filters: 'NurseVisitId==' + visitId
          })
        });

        const inpatientResult = await inpatientResponse.json();
        if (inpatientResult.isSuccessfull && inpatientResult.dynamicResult?.length > 0) {
          bmiRecords = inpatientResult.dynamicResult;
        }
      }

      return bmiRecords;
    } catch (error) {
      console.error('Error fetching vitals:', error);
      this.showNotification('Error fetching vitals information', 'error');
      return [];
    }
  }

  selectDiagnosis(diagnosis) {
    console.log('Selecting diagnosis:', diagnosis);
    
    // Check for duplicates
    if (this.diagnoses.some(d => d.code === diagnosis.code)) {
        console.log('Duplicate diagnosis found');
        this.showNotification('This diagnosis has already been added', 'warning');
        return;
    }

    // Initialize diagnoses array if it doesn't exist
    if (!Array.isArray(this.diagnoses)) {
        console.log('Initializing diagnoses array');
        this.diagnoses = [];
    }

    this.diagnoses = [...this.diagnoses, diagnosis];
    console.log('Updated diagnoses list:', this.diagnoses);
    
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Diagnosis added successfully', 'success');
  }

  handleNotification(event) {
    // Handle notifications from the action buttons
    const { message, type } = event.detail;
    // Implement your notification system here
    console.log(`${type}: ${message}`);
  }

  renderDiagnosisTable() {
    if (!this.diagnoses?.length) {
      return html`
        <div class="empty-state">
          <p>No diagnoses added yet</p>
          <p class="text-sm text-gray-500">Search and select ICD-10 codes above</p>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ICD Code</th>
              <th>Short Description</th>
              <th>Description</th>
              <th>Auth Required</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.diagnoses.map(diagnosis => html`
              <tr>
                <td>${diagnosis.code}</td>
                <td>${diagnosis.shortDescription}</td>
                <td>${diagnosis.description}</td>
                <td>
                  <span class="status-badge ${diagnosis.preAuthReq ? 'status-in-progress' : 'status-completed'}">
                    ${diagnosis.preAuthReq ? 'Required' : 'Not Required'}
                  </span>
                </td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeDiagnosis(diagnosis)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderErrorSection() {
    return html`
      <div class="section ${this.collapsedSections.errors ? 'collapsed' : ''}">
        <div class="section-header" @click="${() => this.toggleSection('errors')}">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Adjudication Errors
            <span class="error-count">${this.errors.length}</span>
          </h2>
        </div>
        <div class="section-content">
          ${this.errors.length > 0 ? html`
            <div class="error-list">
              ${this.errors.map(error => html`
                <div class="error-item">
                  <div class="error-item-header">
                    <div class="error-code-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      ${error.code.coding[0].code}
                    </div>
                    <div class="error-timestamp">
                      ${new Date().toLocaleString()}
                    </div>
                  </div>
                  <div class="error-content">
                    <div class="error-message">
                      <svg xmlns="http://www.w3.org/2000/svg" class="message-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      ${error.code.coding[0].display}
                    </div>
                    <div class="error-location">
                      <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      ${error.code.coding[0].extension[0].valueString}
                    </div>
                  </div>
                </div>
              `)}
            </div>
          ` : html`
            <div class="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p>No adjudication errors found</p>
            </div>
          `}
        </div>
      </div>
    `;
  }

  renderCommunicationSection() {
    return html`
      <div class="section ${this.collapsedSections.communications ? 'collapsed' : ''}">
        <div class="section-header" @click="${() => this.toggleSection('communications')}">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Communications
          </h2>
        </div>
        <div class="section-content">
          <div class="communication-types">
            <div class="communication-column solicited">
              <div class="column-header">
                <svg xmlns="http://www.w3.org/2000/svg" class="comm-type-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <h3>Solicited Communications</h3>
              </div>
              <div class="communication-list">
                ${this.communications.filter(c => c.type === 'solicited').length ? 
                  this.communications.filter(c => c.type === 'solicited').map(comm => html`
                    <div class="communication-item">
                      <div class="comm-header">
                        <div class="comm-info">
                          <svg xmlns="http://www.w3.org/2000/svg" class="comm-status-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <span class="comm-date">${new Date(comm.date).toLocaleString()}</span>
                        </div>
                        <span class="comm-status ${comm.status.toLowerCase()}">${comm.status}</span>
                      </div>
                      <div class="comm-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="message-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        ${comm.message}
                      </div>
                    </div>
                  `) : html`
                    <div class="empty-state">
                      <svg xmlns="http://www.w3.org/2000/svg" class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" />
                      </svg>
                      <p>No solicited communications</p>
                    </div>
                  `}
              </div>
            </div>
            <div class="communication-column unsolicited">
              <div class="column-header">
                <svg xmlns="http://www.w3.org/2000/svg" class="comm-type-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
                <h3>Unsolicited Communications</h3>
              </div>
              <div class="communication-list">
                ${this.communications.filter(c => c.type === 'unsolicited').length ? 
                  this.communications.filter(c => c.type === 'unsolicited').map(comm => html`
                    <div class="communication-item">
                      <div class="comm-header">
                        <div class="comm-info">
                          <svg xmlns="http://www.w3.org/2000/svg" class="comm-status-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                          </svg>
                          <span class="comm-date">${new Date(comm.date).toLocaleString()}</span>
                        </div>
                        <span class="comm-status ${comm.status.toLowerCase()}">${comm.status}</span>
                      </div>
                      <div class="comm-content">
                        <svg xmlns="http://www.w3.org/2000/svg" class="message-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        ${comm.message}
                      </div>
                    </div>
                  `) : html`
                    <div class="empty-state">
                      <svg xmlns="http://www.w3.org/2000/svg" class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" />
                      </svg>
                      <p>No unsolicited communications</p>
                    </div>
                  `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('prior-auth-claim-management')) {
  customElements.define('prior-auth-claim-management', PriorAuthClaimManagement);
} 
