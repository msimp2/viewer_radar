// Inject CSS for the Caribbean buttons (no duplicate variable names)
const caribbeanStyle = document.createElement('style');
caribbeanStyle.textContent = `
.toggle-caribbean-bref-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
}
.toggle-caribbean-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
.toggle-caribbean-btn.active {
    background: #0078A8;
    color: #fff;
    border-color: #0078A8;
}
`;
document.head.appendChild(caribbeanStyle);

document.addEventListener('DOMContentLoaded', function () {
    // Find the guam button rows to append Caribbean buttons next to them
    const brefGuamBtn = document.getElementById('toggle-guam-bref');
    const crefGuamBtn = document.getElementById('toggle-guam-cref');

    // Helper to create Caribbean button
    function createCaribbeanBtn(id, text) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'toggle-caribbean-btn';
        btn.textContent = text;
        return btn;
    }

    // Place BREF CARIBBEAN button next to BREF GUAM
    if (brefGuamBtn && !document.getElementById('toggle-caribbean-bref')) {
        let brefRow = brefGuamBtn.parentElement;
        // Ensure the row is a flex row
        if (!brefRow.classList.contains('toggle-caribbean-bref-row')) {
            // Wrap the guam button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-caribbean-bref-row';
            brefGuamBtn.parentNode.insertBefore(newRow, brefGuamBtn);
            newRow.appendChild(brefGuamBtn);
            brefRow = newRow;
        }
        const brefCaribbeanBtn = createCaribbeanBtn('toggle-caribbean-bref', 'BREF CARIBBEAN');
        brefRow.appendChild(brefCaribbeanBtn);
    }

    // Place CREF CARIBBEAN button next to CREF GUAM
    if (crefGuamBtn && !document.getElementById('toggle-caribbean-cref')) {
        let crefRow = crefGuamBtn.parentElement;
        // Ensure the row is a flex row
        if (!crefRow.classList.contains('toggle-caribbean-bref-row')) {
            // Wrap the guam button in a flex row
            const newRow = document.createElement('div');
            newRow.className = 'toggle-caribbean-bref-row';
            crefGuamBtn.parentNode.insertBefore(newRow, crefGuamBtn);
            newRow.appendChild(crefGuamBtn);
            crefRow = newRow;
        }
        const crefCaribbeanBtn = createCaribbeanBtn('toggle-caribbean-cref', 'CREF CARIBBEAN');
        crefRow.appendChild(crefCaribbeanBtn);
    }

    // BREF CARIBBEAN logic
    let brefLayer = null;
    let brefVisible = false;
    const brefBtn = document.getElementById('toggle-caribbean-bref');

    function createBREFCaribbeanLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/caribbean/caribbean_bref_qcd/ows", {
            layers: 'caribbean:caribbean_bref_qcd',
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
                    brefLayer = createBREFCaribbeanLayer();
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

    // CREF CARIBBEAN logic
    let crefLayer = null;
    let crefVisible = false;
    const crefBtn = document.getElementById('toggle-caribbean-cref');

    function createCREFCaribbeanLayer() {
        return L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/caribbean/caribbean_cref_qcd/ows", {
            layers: 'caribbean:caribbean_cref_qcd',
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
                    crefLayer = createCREFCaribbeanLayer();
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