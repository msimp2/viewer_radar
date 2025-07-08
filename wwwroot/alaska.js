// Inject CSS for the Alaska buttons (no duplicate variable names)
const alaskaStyle = document.createElement('style');
alaskaStyle.textContent = `
.toggle-alaska-bref-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
}
.toggle-alaska-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
.toggle-alaska-btn.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(alaskaStyle);

document.addEventListener('DOMContentLoaded', function () {
    // Find the conus button rows to append Alaska buttons next to them
    const brefConusBtn = document.getElementById('toggle-conus-bref');
    const crefConusBtn = document.getElementById('toggle-conus-cref');

    // Helper to create Alaska button
    function createAlaskaBtn(id, text) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'toggle-alaska-btn';
        btn.textContent = text;
        return btn;
    }

    // Place BREF ALASKA button next to BREF CONUS
    if (brefConusBtn && !document.getElementById('toggle-alaska-bref')) {
        // Ensure both buttons are in a flex row
        let brefRow = brefConusBtn.parentElement;
        if (!brefRow.classList.contains('toggle-alaska-bref-row')) {
            // Wrap the conus button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-alaska-bref-row';
            brefConusBtn.parentNode.insertBefore(newRow, brefConusBtn);
            newRow.appendChild(brefConusBtn);
            brefRow = newRow;
        }
        const brefAlaskaBtn = createAlaskaBtn('toggle-alaska-bref', 'BREF ALASKA');
        brefRow.appendChild(brefAlaskaBtn);
    }

    // Place CREF ALASKA button next to CREF CONUS
    if (crefConusBtn && !document.getElementById('toggle-alaska-cref')) {
        // Ensure both buttons are in a flex row
        let crefRow = crefConusBtn.parentElement;
        if (!crefRow.classList.contains('toggle-alaska-bref-row')) {
            // Wrap the conus button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-alaska-bref-row';
            crefConusBtn.parentNode.insertBefore(newRow, crefConusBtn);
            newRow.appendChild(crefConusBtn);
            crefRow = newRow;
        }
        const crefAlaskaBtn = createAlaskaBtn('toggle-alaska-cref', 'CREF ALASKA');
        crefRow.appendChild(crefAlaskaBtn);
    }

    // BREF ALASKA logic
    let brefLayer = null;
    let brefVisible = false;
    const brefBtn = document.getElementById('toggle-alaska-bref');

    function createBREFAlaskaLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/alaska/alaska_bref_qcd/ows", {
            layers: 'alaska:alaska_bref_qcd',
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
                    brefLayer = createBREFAlaskaLayer();
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

    // CREF ALASKA logic
    let crefLayer = null;
    let crefVisible = false;
    const crefBtn = document.getElementById('toggle-alaska-cref');

    function createCREFAlaskaLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/alaska/alaska_cref_qcd/ows", {
            layers: 'alaska:alaska_cref_qcd',
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
                    crefLayer = createCREFAlaskaLayer();
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