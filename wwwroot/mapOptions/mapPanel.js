import { enableLatLonGrid, disableLatLonGrid, isLatLonGridEnabled } from './latlonGrid.js';
import { basemaps } from './basemaps.js';

export function createOptionsPanel(map) {
    // Inject CSS for the options panel
    if (!document.getElementById('map-options-style')) {
        const style = document.createElement('style');
        style.id = 'map-options-style';
        style.textContent = `
            .map-options-panel-container {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-top: 8px;
                z-index: 1000;
            }
            .map-options-panel {
                background: rgba(255,255,255,0.95);
                padding: 12px 18px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                font-family: sans-serif;
                font-size: 1rem;
                width: fit-content;
                display: block;
            }
            .map-options-panel label {
                cursor: pointer;
                user-select: none;
            }
            .map-options-panel select {
                margin-top: 10px;
                width: 160px;
                font-size: 1rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Find the map element
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Only add the panel container if it doesn't already exist
    if (!document.getElementById('latlon-grid-checkbox')) {
        const container = document.createElement('div');
        container.className = 'map-options-panel-container';
        container.innerHTML = `
            <div class="map-options-panel">
                <label>
                    <input type="checkbox" id="latlon-grid-checkbox" />
                    lat/lon grid
                </label>
                <div style="margin-top: 10px;">
                    <select id="basemap-select">
                        <option value="OpenStreetMap">OpenStreetMap</option>
                        <option value="OpenTopo">OpenTopo</option>
                        <option value="DarkMatter">DarkMatter</option>
                    </select>
                </div>
            </div>
        `;
        // Insert the panel container just after the map
        mapDiv.parentNode.insertBefore(container, mapDiv.nextSibling);
    }

    // Handle checkbox events
    const checkbox = document.getElementById('latlon-grid-checkbox');
    checkbox.checked = isLatLonGridEnabled();
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            enableLatLonGrid(map);
        } else {
            disableLatLonGrid(map);
        }
    });

    // Basemap dropdown logic
    const basemapSelect = document.getElementById('basemap-select');
    let currentLayer = null;

    function setBasemap(name) {
        const bm = basemaps[name];
        if (!bm) return;
        if (currentLayer) {
            map.removeLayer(currentLayer);
        }
        currentLayer = L.tileLayer(bm.url, { attribution: bm.attribution });
        currentLayer.addTo(map);
    }

    // Set default basemap to OpenStreetMap
    setBasemap('OpenStreetMap');
    basemapSelect.value = 'OpenStreetMap';

    basemapSelect.addEventListener('change', function () {
        if (this.value && basemaps[this.value]) {
            setBasemap(this.value);
        }
    });
}