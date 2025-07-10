// Inject CSS for the Guam buttons (no duplicate variable names)
const guamStyle = document.createElement('style');
guamStyle.textContent = `
.toggle-guam-bref-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
}
.toggle-guam-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
.toggle-guam-btn.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(guamStyle);

document.addEventListener('DOMContentLoaded', function () {
    // Find the hawaii button rows to append Guam buttons next to them
    const brefHawaiiBtn = document.getElementById('toggle-hawaii-bref');
    const crefHawaiiBtn = document.getElementById('toggle-hawaii-cref');

    // Helper to create Guam button
    function createGuamBtn(id, text) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'toggle-guam-btn';
        btn.textContent = text;
        return btn;
    }

    // Place BREF GUAM button next to BREF HAWAII
    if (brefHawaiiBtn && !document.getElementById('toggle-guam-bref')) {
        let brefRow = brefHawaiiBtn.parentElement;
        // Ensure the row is a flex row
        if (!brefRow.classList.contains('toggle-guam-bref-row')) {
            // Wrap the hawaii button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-guam-bref-row';
            brefHawaiiBtn.parentNode.insertBefore(newRow, brefHawaiiBtn);
            newRow.appendChild(brefHawaiiBtn);
            brefRow = newRow;
        }
        const brefGuamBtn = createGuamBtn('toggle-guam-bref', 'BREF GUAM');
        brefRow.appendChild(brefGuamBtn);
    }

    // Place CREF GUAM button next to CREF HAWAII
    if (crefHawaiiBtn && !document.getElementById('toggle-guam-cref')) {
        let crefRow = crefHawaiiBtn.parentElement;
        // Ensure the row is a flex row
        if (!crefRow.classList.contains('toggle-guam-bref-row')) {
            // Wrap the hawaii button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-guam-bref-row';
            crefHawaiiBtn.parentNode.insertBefore(newRow, crefHawaiiBtn);
            newRow.appendChild(crefHawaiiBtn);
            crefRow = newRow;
        }
        const crefGuamBtn = createGuamBtn('toggle-guam-cref', 'CREF GUAM');
        crefRow.appendChild(crefGuamBtn);
    }

    // BREF GUAM logic
    let brefLayer = null;
    let brefVisible = false;
    const brefBtn = document.getElementById('toggle-guam-bref');

    function createBREFGuamLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/guam/guam_bref_qcd/ows", {
            layers: 'guam:guam_bref_qcd',
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
                    brefLayer = createBREFGuamLayer();
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

    // CREF GUAM logic
    let crefLayer = null;
    let crefVisible = false;
    const crefBtn = document.getElementById('toggle-guam-cref');

    function createCREFGuamLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/guam/guam_cref_qcd/ows", {
            layers: 'guam:guam_cref_qcd',
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
                    crefLayer = createCREFGuamLayer();
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