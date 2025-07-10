import { createOptionsPanel } from './mapOptions/mapPanel.js';
function initializeMap() {
    // Add map styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        #map {
            height: 500px;
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Initialize the Leaflet map
    window.map = L.map('map').setView([39.5, -98.35], 4);

    // Call the map options initializer
    createOptionsPanel(window.map);

    return window.map;
}

document.addEventListener('DOMContentLoaded', initializeMap);