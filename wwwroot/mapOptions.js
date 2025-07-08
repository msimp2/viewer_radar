// 1. Create the options container and checkbox, and inject CSS for positioning
function createOptionsPanel(map) {
    // Inject CSS for the options panel
    if (!document.getElementById('map-options-style')) {
        const style = document.createElement('style');
        style.id = 'map-options-style';
        style.textContent = `
            #map-options-panel {
                position: fixed;
                right: 32px;
                bottom: 350px;
                background: rgba(255,255,255,0.95);
                padding: 12px 18px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                z-index: 2000;
                font-family: sans-serif;
                font-size: 1rem;
            }
            #map-options-panel label {
                cursor: pointer;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Create or select the options panel
    let optionsPanel = document.getElementById('map-options-panel');
    if (!optionsPanel) {
        optionsPanel = document.createElement('div');
        optionsPanel.id = 'map-options-panel';
        document.body.appendChild(optionsPanel);
    }

    // Add the checkbox
    optionsPanel.innerHTML = `
        <label>
            <input type="checkbox" id="latlon-grid-checkbox" />
            lat/lon grid
        </label>
    `;

    // 2. Handle checkbox events
    const checkbox = document.getElementById('latlon-grid-checkbox');
    let gridLayer = null;

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            gridLayer = drawLatLonGrid(map);
        } else if (gridLayer) {
            map.removeLayer(gridLayer);
            gridLayer = null;
        }
    });
}

// 3. Draw the lat/lon grid
function drawLatLonGrid(map) {
    const bounds = map.getBounds();
    const minLat = Math.floor(bounds.getSouth());
    const maxLat = Math.ceil(bounds.getNorth());
    const minLng = Math.floor(bounds.getWest());
    const maxLng = Math.ceil(bounds.getEast());
    const lines = [];

    // Draw latitude lines
    for (let lat = minLat; lat <= maxLat; lat++) {
        lines.push(L.polyline([
            [lat, minLng],
            [lat, maxLng]
        ], { color: '#888', weight: 1, opacity: 0.5, interactive: false }));
    }

    // Draw longitude lines
    for (let lng = minLng; lng <= maxLng; lng++) {
        lines.push(L.polyline([
            [minLat, lng],
            [maxLat, lng]
        ], { color: '#888', weight: 1, opacity: 0.5, interactive: false }));
    }

    // Group all lines into a single layer group
    const gridLayer = L.layerGroup(lines).addTo(map);
    return gridLayer;
}

// 4. Export an init function to be called after the map is created
export function initMapOptions(map) {
    createOptionsPanel(map);
}