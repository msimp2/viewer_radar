// Inject CSS for the toggle buttons just below the map, bottom-left
const style = document.createElement('style');
style.textContent = `
.toggle-conus-bref-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
    z-index: 1000;
}
.toggle-conus-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 6px;
}
.toggle-conus-btn.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function () {
    // Find the map element
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Only add the button container if it doesn't already exist
    if (!document.getElementById('toggle-conus-bref') && !document.getElementById('toggle-conus-cref')) {
        const container = document.createElement('div');
        container.className = 'toggle-conus-bref-container';
        container.innerHTML = `
            <button id="toggle-conus-bref" class="toggle-conus-btn">BREF CONUS</button>
            <button id="toggle-conus-cref" class="toggle-conus-btn">CREF CONUS</button>
        `;
        // Insert the button container just after the map
        mapDiv.parentNode.insertBefore(container, mapDiv.nextSibling);
    }

    // BREF CONUS logic
    let brefLayer = null;
    let brefVisible = false;
    const brefBtn = document.getElementById('toggle-conus-bref');

    function createBREFConusLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows", {
            layers: 'conus:conus_bref_qcd',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: 'NOAA/NCEP WMS',
            crs: L.CRS.EPSG4326
        });
    }

    if (brefBtn) {
        brefBtn.addEventListener('click', function () {
            if (!brefVisible) {
                if (!brefLayer) {
                    brefLayer = createBREFConusLayer();
                }
                brefLayer.addTo(window.map);
                brefBtn.classList.add('active');
            } else {
                if (brefLayer) {
                    window.map.removeLayer(brefLayer);
                }
                brefBtn.classList.remove('active');
            }
            brefVisible = !brefVisible;
        });
    }

    // CREF CONUS logic
    let crefLayer = null;
    let crefVisible = false;
    const crefBtn = document.getElementById('toggle-conus-cref');

    function createCREFConusLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/conus/conus_cref_qcd/ows", {
            layers: 'conus:conus_cref_qcd',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: 'NOAA/NCEP WMS',
            crs: L.CRS.EPSG4326
        });
    }

    if (crefBtn) {
        crefBtn.addEventListener('click', function () {
            if (!crefVisible) {
                if (!crefLayer) {
                    crefLayer = createCREFConusLayer();
                }
                crefLayer.addTo(window.map);
                crefBtn.classList.add('active');
            } else {
                if (crefLayer) {
                    window.map.removeLayer(crefLayer);
                }
                crefBtn.classList.remove('active');
            }
            crefVisible = !crefVisible;
        });
    }
});