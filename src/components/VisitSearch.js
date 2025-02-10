import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement } from 'lit/decorators.js';
import API_ENDPOINTS from '@config/api.js';

const componentStyles = css`
  :host {
    display: block;
    position: relative;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .date-filter {
    display: flex;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group label {
    font-size: 0.875rem;
    color: #6B7280;
  }

  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #1F2937;
  }

  .input-field:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .visits-grid {
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .episode {
    border-bottom: 1px solid #E5E7EB;
  }

  .episode-header {
    padding: 1rem;
    background: #F9FAFB;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .episode-header:hover {
    background: #F3F4F6;
  }

  .episode-info {
    display: flex;
    gap: 2rem;
  }

  .episode-title {
    font-weight: 600;
    color: #111827;
  }

  .episode-meta {
    color: #6B7280;
    font-size: 0.875rem;
  }

  .visits-list {
    background: white;
  }

  .visit-item {
    padding: 1rem;
    border-top: 1px solid #E5E7EB;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    cursor: pointer;
  }

  .visit-item:hover {
    background: #F9FAFB;
  }

  .visit-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .visit-title {
    font-weight: 500;
    color: #111827;
  }

  .visit-meta {
    color: #6B7280;
    font-size: 0.875rem;
    display: flex;
    gap: 1rem;
  }

  .visit-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .select-button {
    padding: 0.5rem 1rem;
    background: #463AA1;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .select-button:hover {
    background: #372F80;
  }

  .expanded {
    display: block;
  }

  .collapsed {
    display: none;
  }
`;

@customElement('visit-search')
export class VisitSearch extends LitElement {
  static get properties() {
    return {
      startDate: { type: String },
      endDate: { type: String },
      episodes: { type: Array },
      expandedEpisodeId: { type: Number },
      selectedFacility: { type: Object },
      isLoading: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.startDate = '';
    this.endDate = '';
    this.episodes = [];
    this.expandedEpisodeId = null;
    this.selectedFacility = null;
    this.isLoading = false;
  }

  async searchVisits() {
    if (!this.startDate || !this.endDate || !this.selectedFacility) return;

    this.isLoading = true;
    try {
      const response = await fetch(API_ENDPOINTS.VISIT.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: `visitDate>=${this.startDate},AND visitDate<=${this.endDate},AND fkFacilityId==${this.selectedFacility.id}`,
          page: 1,
          pageSize: 50,
          sort: "-visitDate"
        })
      });

      const result = await response.json();
      if (result && result.dynamicResult) {
        // Group visits by episode
        const episodeMap = new Map();
        result.dynamicResult.forEach(visit => {
          if (!episodeMap.has(visit.episodeId)) {
            episodeMap.set(visit.episodeId, {
              id: visit.episodeId,
              visits: []
            });
          }
          episodeMap.get(visit.episodeId).visits.push(visit);
        });

        this.episodes = Array.from(episodeMap.values());
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
      this.episodes = [];
    } finally {
      this.isLoading = false;
    }
  }

  handleDateChange(e) {
    const { name, value } = e.target;
    this[name] = value;
    this.searchVisits();
  }

  toggleEpisode(episodeId) {
    this.expandedEpisodeId = this.expandedEpisodeId === episodeId ? null : episodeId;
  }

  selectVisit(visit) {
    this.dispatchEvent(new CustomEvent('visit-selected', {
      detail: visit,
      bubbles: true,
      composed: true
    }));
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  formatTime(timeString) {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  render() {
    return html`
      <div class="search-container">
        <div class="filters">
          <div class="date-filter">
            <div class="input-group">
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate"
                class="input-field"
                .value="${this.startDate}"
                @change="${this.handleDateChange}"
              >
            </div>
            <div class="input-group">
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate"
                class="input-field"
                .value="${this.endDate}"
                @change="${this.handleDateChange}"
              >
            </div>
          </div>
        </div>

        <div class="visits-grid">
          ${this.episodes.map(episode => html`
            <div class="episode">
              <div class="episode-header" @click="${() => this.toggleEpisode(episode.id)}">
                <div class="episode-info">
                  <span class="episode-title">Episode #${episode.id}</span>
                  <span class="episode-meta">${episode.visits.length} visits</span>
                </div>
              </div>
              <div class="visits-list ${this.expandedEpisodeId === episode.id ? 'expanded' : 'collapsed'}">
                ${episode.visits.map(visit => html`
                  <div class="visit-item">
                    <div class="visit-details">
                      <div class="visit-title">Visit #${visit.id}</div>
                      <div class="visit-meta">
                        <span>${this.formatDate(visit.visitDate)}</span>
                        <span>${this.formatTime(visit.startTime)} - ${this.formatTime(visit.endTime)}</span>
                        <span>Dr. ${visit.doctorId}</span>
                      </div>
                    </div>
                    <div class="visit-actions">
                      <button class="select-button" @click="${() => this.selectVisit(visit)}">
                        Select
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
} 