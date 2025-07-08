// Inject CSS for the Hawaii buttons (no duplicate variable names)
const hawaiiStyle = document.createElement('style');
hawaiiStyle.textContent = `
.toggle-hawaii-bref-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
}
.toggle-hawaii-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
.toggle-hawaii-btn.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(hawaiiStyle);

document.addEventListener('DOMContentLoaded', function () {
    // Find the alaska button rows to append Hawaii buttons next to them
    const brefAlaskaBtn = document.getElementById('toggle-alaska-bref');
    const crefAlaskaBtn = document.getElementById('toggle-alaska-cref');

    // Helper to create Hawaii button
    function createHawaiiBtn(id, text) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'toggle-hawaii-btn';
        btn.textContent = text;
        return btn;
    }

    // Place BREF HAWAII button next to BREF ALASKA
    if (brefAlaskaBtn && !document.getElementById('toggle-hawaii-bref')) {
        let brefRow = brefAlaskaBtn.parentElement;
        // Ensure the row is a flex row
        if (!brefRow.classList.contains('toggle-hawaii-bref-row')) {
            // Wrap the alaska button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-hawaii-bref-row';
            brefAlaskaBtn.parentNode.insertBefore(newRow, brefAlaskaBtn);
            newRow.appendChild(brefAlaskaBtn);
            brefRow = newRow;
        }
        const brefHawaiiBtn = createHawaiiBtn('toggle-hawaii-bref', 'BREF HAWAII');
        brefRow.appendChild(brefHawaiiBtn);
    }

    // Place CREF HAWAII button next to CREF ALASKA
    if (crefAlaskaBtn && !document.getElementById('toggle-hawaii-cref')) {
        let crefRow = crefAlaskaBtn.parentElement;
        // Ensure the row is a flex row
        if (!crefRow.classList.contains('toggle-hawaii-bref-row')) {
            // Wrap the alaska button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-hawaii-bref-row';
            crefAlaskaBtn.parentNode.insertBefore(newRow, crefAlaskaBtn);
            newRow.appendChild(crefAlaskaBtn);
            crefRow = newRow;
        }
        const crefHawaiiBtn = createHawaiiBtn('toggle-hawaii-cref', 'CREF HAWAII');
        crefRow.appendChild(crefHawaiiBtn);
    }

    // BREF HAWAII logic
    let brefLayer = null;
    let brefVisible = false;
    const brefBtn = document.getElementById('toggle-hawaii-bref');

    function createBREFHawaiiLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_bref_qcd/ows", {
            layers: 'hawaii:hawaii_bref_qcd',
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
                    brefLayer = createBREFHawaiiLayer();
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

    // CREF HAWAII logic
    let crefLayer = null;
    let crefVisible = false;
    const crefBtn = document.getElementById('toggle-hawaii-cref');

    function createCREFHawaiiLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_cref_qcd/ows", {
            layers: 'hawaii:hawaii_cref_qcd',
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
                    crefLayer = createCREFHawaiiLayer();
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