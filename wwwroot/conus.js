// Inject CSS for the toggle button just below the map, bottom-left
const style = document.createElement('style');
style.textContent = `
.toggle-conus-bref-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
    z-index: 1000;
}
#toggle-conus-bref {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
#toggle-conus-bref.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(style);

// Inject the button container and button into the DOM
document.addEventListener('DOMContentLoaded', function () {
    // Only add the button if it doesn't already exist
    if (!document.getElementById('toggle-conus-bref')) {
        const container = document.createElement('div');
        container.className = 'toggle-conus-bref-container';
        container.innerHTML = `<button id="toggle-conus-bref">BREF CONUS</button>`;
        document.body.appendChild(container);
    }

    let conusLayer = null;
    let visible = false;
    const btn = document.getElementById('toggle-conus-bref');

    function createConusLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows", {
            layers: 'conus:conus_bref_qcd',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: 'NOAA/NCEP WMS',
            crs: L.CRS.EPSG4326
        });
    }

    if (!btn) return;

    btn.addEventListener('click', function () {
        if (!visible) {
            if (!conusLayer) {
                conusLayer = createConusLayer();
            }
            conusLayer.addTo(window.map);
            btn.classList.add('active');
        } else {
            if (conusLayer) {
                window.map.removeLayer(conusLayer);
            }
            btn.classList.remove('active');
        }
        visible = !visible;
    });
});