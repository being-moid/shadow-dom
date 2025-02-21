import { css } from 'lit';

export const sharedStyles = css`
    :host {
        --primary: #8500d8;
        --primary-light: #a64ced;
        --primary-dark: #6a00ad;
        --success: #10B981;
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

    /* Enhanced Form Controls */
    .form-section {
        margin-bottom: 2rem;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .section-title {
        color: var(--gray-900);
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .section-title::before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background: var(--primary);
        border-radius: 2px;
    }

    .form-group {
        margin-bottom: 1.25rem;
    }

    .form-label {
        color: var(--gray-700);
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        display: block;
    }

    .form-control {
        background-color: var(--gray-50);
        border: 1px solid var(--gray-200);
        border-radius: 8px;
        color: var(--gray-900);
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 0.625rem 1rem;
        transition: all 0.2s ease;
        width: 100%;
    }

    .form-control:focus {
        background-color: white;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(133, 0, 216, 0.1);
        outline: none;
    }

    .form-control:read-only {
        background-color: var(--gray-100);
        border-color: var(--gray-200);
        color: var(--gray-700);
        cursor: not-allowed;
    }

    /* Enhanced Search Controls */
    .search-container {
        position: relative;
    }

    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 12px;
        color: var(--gray-400);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .search-input {
        padding-left: 40px;
        padding-right: 40px;
    }

    .loader-container {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
    }

    .search-loader {
        width: 20px;
        height: 20px;
        border: 2px solid var(--gray-200);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 4px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
    }

    .search-result-item {
        padding: 12px 16px;
        border-bottom: 1px solid var(--gray-100);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .search-result-item:hover {
        background-color: var(--gray-50);
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    /* Healthcare Specific Styles */
    .healthcare-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        color: var(--gray-400);
    }

    .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }

    .badge-success {
        background-color: var(--success);
        color: white;
    }

    .badge-warning {
        background-color: var(--warning);
        color: white;
    }

    .badge-error {
        background-color: var(--error);
        color: white;
    }

    /* Grid Layouts */
    .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    /* Form Control with Icons */
    .form-control-group {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .form-control-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: var(--gray-400);
    }

    .form-control-icon svg {
        width: 100%;
        height: 100%;
    }

    .form-control-with-icon {
        padding-left: 40px !important;
    }

    /* Buttons */
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
        gap: 0.5rem;
    }

    .button-primary {
        background-color: var(--primary);
        color: white;
    }

    .button-primary:hover {
        background-color: var(--primary-dark);
    }

    .button-secondary {
        background-color: var(--gray-100);
        color: var(--gray-700);
    }

    .button-secondary:hover {
        background-color: var(--gray-200);
    }

    /* Loading States */
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .loading-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        color: var(--gray-600);
    }

    .loader {
        width: 24px;
        height: 24px;
        border: 2px solid var(--gray-200);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 1rem;
    }

    /* Empty States */
    .empty-state {
        text-align: center;
        padding: 2rem;
        color: var(--gray-500);
    }

    .empty-state-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .empty-state-text {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }

    .empty-state-subtext {
        font-size: 0.75rem;
        color: var(--gray-400);
    }
`; 