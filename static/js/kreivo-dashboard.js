// Shared styles injected into each component's shadow DOM
const WIDGET_STYLES = `
  :host {
    display: block;
    background: var(--clr-surface, rgba(255,255,255,0.04));
    border: 1px solid var(--clr-border, rgba(255,255,255,0.08));
    border-radius: 12px;
    padding: 1.25rem;
    color: var(--clr-text, #c4cdc9);
    font-family: var(--font-primary, 'Outfit', sans-serif);
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  :host(:hover) {
    border-color: rgba(255,255,255,0.15);
  }
  .widget-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .widget-title {
    font-size: 0.75rem;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    color: var(--clr-text-dim, #6b7d77);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .expand-btn {
    background: none;
    border: none;
    color: var(--clr-text-dim, #6b7d77);
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0.25rem;
    border-radius: 4px;
    transition: color 0.2s, background 0.2s;
    font-family: var(--font-mono, monospace);
  }
  .expand-btn:hover {
    color: var(--clr-white, #f3f5f4);
    background: rgba(255,255,255,0.06);
  }
  .mono { font-family: var(--font-mono, 'JetBrains Mono', monospace); }
  .value { color: var(--clr-white, #f3f5f4); font-weight: 600; }
  .green { color: var(--clr-green, hsl(160,65%,45%)); }
  .bright { color: var(--clr-green-bright, hsl(150,80%,55%)); }
  .dim { color: var(--clr-text-dim, #6b7d77); }
  .blue { color: var(--clr-blue, hsl(200,96%,55%)); }
  .lavender { color: var(--clr-lavender, hsl(266,55%,76%)); }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th { text-align: left; color: var(--clr-text-dim); font-weight: 400; font-size: 0.7rem;
       text-transform: uppercase; letter-spacing: 0.05em; padding: 0.4rem 0; border-bottom: 1px solid var(--clr-border); }
  td { padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 0.8rem; }
  .bar-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; margin-top: 0.25rem; }
  .bar-fill { height: 100%; border-radius: 2px; background: var(--clr-green); transition: width 0.6s ease; }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; }
  .stat-label { font-size: 0.7rem; color: var(--clr-text-dim); font-family: var(--font-mono); text-transform: uppercase; }
  .stat-value { font-size: 1.6rem; font-weight: 700; color: var(--clr-white); font-family: var(--font-mono); }
  .stat-row { display: flex; gap: 2rem; margin-bottom: 1rem; }
`;

function widgetHeader(title) {
  return `<div class="widget-header">
    <span class="widget-title">${title}</span>
    <button class="expand-btn" title="Expand">&#x2197;</button>
  </div>`;
}

class BaseWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setupExpand(panelContent) {
    const btn = this.shadowRoot.querySelector('.expand-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('widget-expand', {
          bubbles: true, composed: true,
          detail: { title: this.widgetTitle, content: panelContent() }
        }));
      });
    }
  }
}

// ─── kreivo-blocks ───
class KreivoBlocks extends BaseWidget {
  get widgetTitle() { return 'Recent Blocks'; }
  connectedCallback() {
    const blocks = Array.from({ length: 6 }, (_, i) => ({
      number: 1842567 - i,
      hash: `0x${Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('')}...`,
      extrinsics: Math.floor(Math.random() * 12) + 1,
      time: `${(i * 6) + 6}s ago`,
    }));
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}</style>
      ${widgetHeader('Recent Blocks')}
      <table>
        <tr><th>Block</th><th>Hash</th><th>Txns</th><th>Age</th></tr>
        ${blocks.map(b => `<tr>
          <td class="mono green">#${b.number.toLocaleString()}</td>
          <td class="mono dim" style="font-size:0.7rem">${b.hash}</td>
          <td class="mono value">${b.extrinsics}</td>
          <td class="dim">${b.time}</td>
        </tr>`).join('')}
      </table>`;
    this.setupExpand(() => `Full block list with extrinsics, events, and validator info.`);
  }
}

// ─── kreivo-account ───
class KreivoAccount extends BaseWidget {
  get widgetTitle() { return 'Account'; }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .connect-msg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 0;
        gap: 0.75rem;
        text-align: center;
      }
      .connect-msg p { color: var(--clr-text-dim); font-size: 0.9rem; line-height: 1.5; }
      .arrow { color: var(--clr-green); font-size: 1.5rem; }
    </style>
    ${widgetHeader('Account')}
    <div class="connect-msg">
      <span class="arrow">&nearr;</span>
      <p>Use the <strong class="value">Connect</strong> button in the header to link your account.</p>
      <p class="dim" style="font-size:0.8rem">Supports passkeys, wallets, and watch-only addresses.</p>
    </div>`;
    this.setupExpand(() => `Account details, transaction history, balances, and delegation info.`);
  }
}

// ─── kreivo-communities ───
class KreivoCommunities extends BaseWidget {
  get widgetTitle() { return 'Communities'; }
  connectedCallback() {
    const communities = [
      { name: 'Bloque', plan: 'L', members: 847, quota: 1000 },
      { name: 'Virto Core', plan: 'M', members: 62, quota: 100 },
      { name: 'Kusama Creatives', plan: 'M', members: 88, quota: 100 },
      { name: 'LatAm Builders', plan: 'S', members: 8, quota: 10 },
      { name: 'DeFi Coop', plan: 'S', members: 5, quota: 10 },
    ];
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .plan-badge { font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px;
        background: rgba(255,255,255,0.06); font-family: var(--font-mono); }
    </style>
    ${widgetHeader('Top Communities')}
    <table>
      <tr><th>Organization</th><th>Plan</th><th>Members</th><th>Usage</th></tr>
      ${communities.map(c => {
        const pct = Math.round((c.members / c.quota) * 100);
        return `<tr>
          <td class="value">${c.name}</td>
          <td><span class="plan-badge green">${c.plan}</span></td>
          <td class="mono dim">${c.members}/${c.quota}</td>
          <td style="min-width:60px">
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          </td>
        </tr>`;
      }).join('')}
    </table>`;
    this.setupExpand(() => `Full community directory with governance activity and treasury balances.`);
  }
}

// ─── kreivo-assets ───
class KreivoAssets extends BaseWidget {
  get widgetTitle() { return 'Assets'; }
  connectedCallback() {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const volumes = [42, 67, 53, 89, 71, 34, 58];
    const max = Math.max(...volumes);
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .chart { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin: 1rem 0; }
      .chart-bar { flex: 1; background: var(--clr-green); border-radius: 2px 2px 0 0; min-width: 0;
        transition: height 0.6s ease; opacity: 0.7; }
      .chart-bar:hover { opacity: 1; }
      .chart-labels { display: flex; gap: 4px; }
      .chart-labels span { flex: 1; text-align: center; font-size: 0.6rem; color: var(--clr-text-dim);
        font-family: var(--font-mono); }
    </style>
    ${widgetHeader('KSM \xB7 Native Asset')}
    <div class="stat-row">
      <div class="stat">
        <span class="stat-label">Total issuance</span>
        <span class="stat-value bright">12.4M</span>
      </div>
      <div class="stat">
        <span class="stat-label">Holders</span>
        <span class="stat-value">3,271</span>
      </div>
    </div>
    <span class="widget-title">Weekly tx volume</span>
    <div class="chart">
      ${volumes.map(v => `<div class="chart-bar" style="height:${(v/max)*100}%"></div>`).join('')}
    </div>
    <div class="chart-labels">
      ${days.map(d => `<span>${d}</span>`).join('')}
    </div>`;
    this.setupExpand(() => `Detailed asset analytics, transfer history, and holder distribution.`);
  }
}

// ─── kreivo-governance ───
class KreivoGovernance extends BaseWidget {
  get widgetTitle() { return 'Governance'; }
  connectedCallback() {
    const proposals = [
      { id: 42, title: 'Increase L plan tx limit', status: 'voting', track: 'Membership', ayes: 73 },
      { id: 41, title: 'Fund marketplace audit', status: 'voting', track: 'Treasury', ayes: 58 },
      { id: 40, title: 'Add USDT asset support', status: 'passed', track: 'Runtime', ayes: 91 },
      { id: 39, title: 'Update fee schedule Q2', status: 'passed', track: 'Treasury', ayes: 84 },
    ];
    const statusColor = s => s === 'voting' ? 'blue' : 'green';
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .status { font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px;
        background: rgba(255,255,255,0.06); font-family: var(--font-mono); text-transform: uppercase; }
      .track { font-size: 0.7rem; color: var(--clr-text-dim); }
    </style>
    ${widgetHeader('Governance')}
    <table>
      <tr><th>#</th><th>Proposal</th><th>Track</th><th>Status</th><th>Ayes</th></tr>
      ${proposals.map(p => `<tr>
        <td class="mono dim">${p.id}</td>
        <td class="value">${p.title}</td>
        <td><span class="track">${p.track}</span></td>
        <td><span class="status ${statusColor(p.status)}">${p.status}</span></td>
        <td class="mono green">${p.ayes}%</td>
      </tr>`).join('')}
    </table>`;
    this.setupExpand(() => `Full governance view with proposal details, vote history, and delegation stats.`);
  }
}

// ─── kreivo-network ───
class KreivoNetwork extends BaseWidget {
  get widgetTitle() { return 'Network'; }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .net-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    </style>
    ${widgetHeader('Network Status')}
    <div class="net-grid">
      <div class="stat">
        <span class="stat-label">Finalized</span>
        <span class="stat-value green" style="font-size:1.2rem">#1,842,564</span>
      </div>
      <div class="stat">
        <span class="stat-label">Best block</span>
        <span class="stat-value" style="font-size:1.2rem">#1,842,567</span>
      </div>
      <div class="stat">
        <span class="stat-label">Collators</span>
        <span class="stat-value" style="font-size:1.2rem">7</span>
      </div>
      <div class="stat">
        <span class="stat-label">Uptime</span>
        <span class="stat-value green" style="font-size:1.2rem">99.97%</span>
      </div>
      <div class="stat">
        <span class="stat-label">Runtime</span>
        <span class="stat-value dim" style="font-size:1rem">kreivo-v1024</span>
      </div>
      <div class="stat">
        <span class="stat-label">Relay</span>
        <span class="stat-value dim" style="font-size:1rem">Kusama</span>
      </div>
    </div>`;
    this.setupExpand(() => `Detailed network stats, collator performance, and parachain slot info.`);
  }
}

// ─── kreivo-extrinsics (developer widget) ───
class KreivoExtrinsics extends BaseWidget {
  get widgetTitle() { return 'Extrinsics'; }
  connectedCallback() {
    const pallets = ['System', 'Balances', 'Communities', 'Payments', 'Memberships', 'Governance'];
    this.shadowRoot.innerHTML = `<style>${WIDGET_STYLES}
      .form-group { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.75rem; }
      label { font-size: 0.7rem; color: var(--clr-text-dim); font-family: var(--font-mono);
        text-transform: uppercase; letter-spacing: 0.05em; }
      select, input, textarea {
        background: rgba(0,0,0,0.3); border: 1px solid var(--clr-border);
        color: var(--clr-white); padding: 0.5rem 0.6rem; border-radius: 6px;
        font-family: var(--font-mono); font-size: 0.8rem; outline: none;
        transition: border-color 0.2s;
      }
      select:focus, input:focus, textarea:focus { border-color: var(--clr-green); }
      select { cursor: pointer; }
      textarea { resize: vertical; min-height: 48px; }
      .submit-btn {
        background: var(--clr-green); color: #071914; border: none;
        padding: 0.45rem 1.25rem; border-radius: 50px; font-weight: 600;
        cursor: pointer; font-family: var(--font-primary); font-size: 0.8rem;
        transition: background 0.2s; margin-top: 0.5rem;
      }
      .submit-btn:hover { background: var(--clr-green-bright); }
      .submit-btn:disabled { opacity: 0.4; cursor: default; }
      .hint { font-size: 0.7rem; color: var(--clr-text-dim); margin-top: 0.5rem; }
    </style>
    ${widgetHeader('Developer \xB7 Extrinsics')}
    <div class="form-group">
      <label>Pallet</label>
      <select id="pallet">
        <option value="">Select pallet...</option>
        ${pallets.map(p => `<option value="${p.toLowerCase()}">${p}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Call</label>
      <input type="text" id="call" placeholder="e.g. transfer, create, join" />
    </div>
    <div class="form-group">
      <label>Params (JSON)</label>
      <textarea id="params" placeholder='{"dest": "...", "value": 1000}'></textarea>
    </div>
    <button class="submit-btn" disabled>Sign & Submit</button>
    <p class="hint">Connect an account to submit extrinsics.</p>`;
    this.setupExpand(() => `Full extrinsic builder with pallet/call browser, type hints, and submission history.`);
  }
}

// ─── kreivo-dashboard (shadow DOM shell, light DOM widgets via slot) ───
class KreivoDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.page = 0;
    this.perPage = 6;
    this._animating = false;
  }

  get _widgets() {
    return [...this.querySelectorAll('[slot="widget"]')];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>
      .wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem 2rem 5rem;
        flex: 1;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols, 3), 1fr);
        gap: 1rem;
        align-content: start;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      .grid slot {
        display: contents;
      }
      ::slotted([slot="widget"]) {
        transition: opacity 0.3s ease, transform 0.3s ease;
        min-width: 0;
      }
      ::slotted(.widget-hidden) {
        display: none !important;
      }
      ::slotted(.widget-entering) {
        opacity: 0;
        transform: translateY(12px);
      }
      .pager {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background: linear-gradient(transparent, var(--clr-bg, #071914) 40%);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 0.8rem;
        color: var(--clr-text-dim, #6b7d77);
        user-select: none;
        z-index: 40;
      }
      .pager button {
        background: var(--clr-surface, rgba(255,255,255,0.04));
        border: 1px solid var(--clr-border, rgba(255,255,255,0.08));
        color: var(--clr-text, #c4cdc9);
        padding: 0.4rem 0.85rem;
        border-radius: 6px;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.8rem;
        transition: background 0.2s, border-color 0.2s, transform 0.15s;
      }
      .pager button:hover:not(:disabled) {
        background: rgba(255,255,255,0.08);
        border-color: rgba(255,255,255,0.15);
        transform: translateY(-1px);
      }
      .pager button:active:not(:disabled) { transform: translateY(0); }
      .pager button:disabled { opacity: 0.3; cursor: default; }
      .dots { display: flex; gap: 6px; align-items: center; }
      .dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--clr-border, rgba(255,255,255,0.08));
        transition: background 0.3s, transform 0.3s;
        cursor: pointer;
      }
      .dot:hover { transform: scale(1.3); }
      .dot.active { background: var(--clr-green, hsl(160,65%,45%)); transform: scale(1.2); }
      .page-label { font-size: 0.75rem; }
      @media (max-width: 999px) {
        .grid { grid-template-columns: repeat(var(--cols, 2), 1fr); }
      }
      @media (max-width: 640px) {
        .wrapper { padding: 1rem 1rem 5rem; }
        .grid { grid-template-columns: repeat(var(--cols, 1), 1fr); }
      }
    </style>
    <div class="wrapper"><div class="grid"><slot name="widget"></slot></div></div>
    <div class="pager">
      <button class="prev">\u2190 Prev</button>
      <div class="dots"></div>
      <span class="page-label"></span>
      <button class="next">Next \u2192</button>
    </div>`;

    this._grid = this.shadowRoot.querySelector('.grid');
    this._prevBtn = this.shadowRoot.querySelector('.prev');
    this._nextBtn = this.shadowRoot.querySelector('.next');
    this._dotsEl = this.shadowRoot.querySelector('.dots');
    this._pageLabel = this.shadowRoot.querySelector('.page-label');

    this._updatePerPage();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const old = this.perPage;
        this._updatePerPage();
        if (old !== this.perPage) this._applyPage();
      }, 100);
    });

    this._prevBtn.addEventListener('click', () => this.goTo(this.page - 1));
    this._nextBtn.addEventListener('click', () => this.goTo(this.page + 1));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.goTo(this.page - 1);
      if (e.key === 'ArrowRight') this.goTo(this.page + 1);
    });

    // Initial render with stagger
    this._applyPage();
    this._staggerIn();
  }

  _updatePerPage() {
    const w = window.innerWidth;
    if (w >= 1000) this.perPage = 6;
    else if (w >= 640) this.perPage = 4;
    else this.perPage = 2;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this._widgets.length / this.perPage));
  }

  goTo(target) {
    if (this._animating) return;
    if (target < 0 || target >= this.totalPages || target === this.page) return;
    const dir = target > this.page ? 1 : -1;
    this._animating = true;

    // Slide out
    this._grid.style.opacity = '0';
    this._grid.style.transform = `translateX(${-dir * 30}px)`;

    setTimeout(() => {
      this.page = target;
      this._applyPage();

      // Prep slide in from opposite side
      this._grid.style.transition = 'none';
      this._grid.style.transform = `translateX(${dir * 30}px)`;
      this._grid.style.opacity = '0';
      this._grid.offsetHeight; // reflow
      this._grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      this._grid.style.opacity = '1';
      this._grid.style.transform = 'translateX(0)';
      setTimeout(() => { this._animating = false; }, 260);
    }, 200);
  }

  _applyPage() {
    if (this.page >= this.totalPages) this.page = this.totalPages - 1;
    if (this.page < 0) this.page = 0;

    const start = this.page * this.perPage;
    let visibleCount = 0;
    this._widgets.forEach((w, i) => {
      if (i >= start && i < start + this.perPage) {
        w.classList.remove('widget-hidden');
        visibleCount++;
      } else {
        w.classList.add('widget-hidden');
      }
    });

    // Cap columns to visible count so few widgets don't shrink
    const maxCols = window.innerWidth >= 1000 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    this._grid.style.setProperty('--cols', Math.min(visibleCount, maxCols));

    this._prevBtn.disabled = this.page === 0;
    this._nextBtn.disabled = this.page >= this.totalPages - 1;
    this._pageLabel.textContent = `${this.page + 1} / ${this.totalPages}`;

    this._dotsEl.innerHTML = '';
    for (let i = 0; i < this.totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = `dot${i === this.page ? ' active' : ''}`;
      dot.addEventListener('click', () => this.goTo(i));
      this._dotsEl.appendChild(dot);
    }
  }

  _staggerIn() {
    const visible = this._widgets.filter(w => !w.classList.contains('widget-hidden'));
    visible.forEach((w, i) => {
      w.classList.add('widget-entering');
      setTimeout(() => w.classList.remove('widget-entering'), 50 + i * 60);
    });
  }
}

// ─── kreivo-panel (side panel) ───
class KreivoPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>
      :host {
        position: fixed;
        top: 0; right: 0;
        width: var(--panel-width, 420px);
        height: 100vh;
        background: #0a1f19;
        border-left: 1px solid var(--clr-border, rgba(255,255,255,0.08));
        z-index: 100;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        font-family: var(--font-primary, 'Outfit', sans-serif);
        color: var(--clr-text, #c4cdc9);
      }
      :host(.open) { transform: translateX(0); }
      .panel-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--clr-border);
        min-height: var(--nav-height, 60px);
      }
      .panel-title {
        font-size: 0.85rem; font-family: var(--font-mono, monospace);
        font-weight: 600; color: var(--clr-white, #f3f5f4);
        text-transform: uppercase; letter-spacing: 0.05em;
      }
      .close-btn {
        background: none; border: none; color: var(--clr-text-dim, #6b7d77);
        cursor: pointer; font-size: 1.4rem; padding: 0.25rem 0.5rem;
        border-radius: 6px; transition: color 0.2s, background 0.2s;
      }
      .close-btn:hover { color: var(--clr-white); background: rgba(255,255,255,0.06); }
      .panel-body {
        flex: 1; overflow-y: auto; padding: 1.5rem; line-height: 1.6;
      }
      .panel-body p { color: var(--clr-text-dim); font-size: 0.9rem; margin-bottom: 1rem; }
      .placeholder {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 0.75rem; color: var(--clr-text-dim); font-family: var(--font-mono);
        font-size: 0.8rem; text-align: center; padding: 2rem; opacity: 0.6;
      }
      @media (max-width: 600px) { :host { width: 100vw; } }
    </style>
    <div class="panel-header">
      <span class="panel-title"></span>
      <button class="close-btn">\u2715</button>
    </div>
    <div class="panel-body">
      <div class="placeholder">Select a widget and click expand to see details.</div>
    </div>`;

    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());
    document.addEventListener('widget-expand', (e) => this.open(e.detail.title, e.detail.content));
  }

  open(title, content) {
    this.shadowRoot.querySelector('.panel-title').textContent = title;
    this.shadowRoot.querySelector('.panel-body').innerHTML = `
      <p>${content}</p>
      <div class="placeholder">
        API integration coming soon.<br>This panel will show live data from the Kreivo network.
      </div>`;
    this.classList.add('open');
  }

  close() {
    this.classList.remove('open');
  }
}

// Register
customElements.define('kreivo-blocks', KreivoBlocks);
customElements.define('kreivo-account', KreivoAccount);
customElements.define('kreivo-communities', KreivoCommunities);
customElements.define('kreivo-assets', KreivoAssets);
customElements.define('kreivo-governance', KreivoGovernance);
customElements.define('kreivo-network', KreivoNetwork);
customElements.define('kreivo-extrinsics', KreivoExtrinsics);
customElements.define('kreivo-dashboard', KreivoDashboard);
customElements.define('kreivo-panel', KreivoPanel);
