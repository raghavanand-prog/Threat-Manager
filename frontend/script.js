const API_URL = "http://localhost:3000/threats";

let editingId = null;

const detailName = document.getElementById("detailName");
const detailSeverity = document.getElementById("detailSeverity");
const detailCategory = document.getElementById("detailCategory");
const detailPriority = document.getElementById("detailPriority");
const detailAction = document.getElementById("detailAction");

const threatForm = document.getElementById("threatForm");
const threatContainer = document.getElementById("threatContainer");

const totalThreats = document.getElementById("totalThreats");
const criticalCount = document.getElementById("criticalCount");
const highCount = document.getElementById("highCount");
const mediumCount = document.getElementById("mediumCount");
const lowCount = document.getElementById("lowCount");
const systemRisk = document.getElementById("systemRisk");


threatForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const threatName = document.getElementById("threatName").value;
    const severity = document.getElementById("severity").value;
    const category = document.getElementById("category").value;

    const threat = {
        threatName,
        severity,
        category
    };

    if (editingId === null) {

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(threat)
        });

    } else {

        await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(threat)
        });

        editingId = null;

        document.querySelector("#threatForm button").textContent = "Register Threat";
    }

    threatForm.reset();

    await loadThreats();

});

async function loadThreats() {

    const response = await fetch(API_URL);
    const threats = await response.json();

    threatContainer.innerHTML = "";

    totalThreats.textContent = threats.length;

    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    threats.forEach(function (threat) {

        if (threat.severity === "Critical") {
            critical++;
        }
        else if (threat.severity === "High") {
            high++;
        }
        else if (threat.severity === "Medium") {
            medium++;
        }
        else {
            low++;
        }

    threatContainer.innerHTML += `
<div class="threat-card ${threat.severity.toLowerCase()}-border">

    <div class="card-header">

        <h3>${threat.threatName}</h3>

        <span class="badge ${threat.severity.toLowerCase()}">
            ${threat.severity}
        </span>

    </div>

    <p class="category">
        <strong>Category:</strong> ${threat.category}
    </p>

    <div class="actions">

        <button onclick="editThreat(${threat.id})">
            ✏ Edit
        </button>

        <button onclick="deleteThreat(${threat.id})">
            🗑 Delete
        </button>

    </div>

</div>
`;

if (threats.length > 0) {
    latestThreat.textContent = threats[threats.length - 1].threatName;
} else {
    latestThreat.textContent = "None";
}


lastUpdated.textContent = new Date().toLocaleTimeString();
    });

    criticalCount.textContent = critical;
    highCount.textContent = high;
    mediumCount.textContent = medium;
    lowCount.textContent = low;



if (critical > 0) {

    systemRisk.textContent = "🔴 CRITICAL";

    systemRisk.className = "critical-risk";

}
else if (high > 0) {

    systemRisk.textContent = "🟠 HIGH";

    systemRisk.className = "high-risk";

}
else if (medium > 0) {

    systemRisk.textContent = "🟡 MODERATE";

    systemRisk.className = "medium-risk";

}
else {

    systemRisk.textContent = "🟢 LOW";

    systemRisk.className = "low-risk";

}
}

async function deleteThreat(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    await loadThreats();

}
async function editThreat(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const threat = await response.json();

    document.getElementById("threatName").value = threat.threatName;
    document.getElementById("severity").value = threat.severity;
    document.getElementById("category").value = threat.category;

    editingId = id;
    updateThreatDetails(threat);

    document.querySelector("#threatForm button").textContent = "Update Threat";

}
function updateThreatDetails(threat){

    detailName.textContent = threat.threatName;

    detailSeverity.textContent = threat.severity;

    detailCategory.textContent = threat.category;

    if(threat.severity === "Critical"){

        detailPriority.textContent = "Immediate";

        detailAction.textContent =
        "Immediately isolate affected systems and escalate to the security team.";

    }

    else if(threat.severity === "High"){

        detailPriority.textContent = "High";

        detailAction.textContent =
        "Investigate within the next hour and monitor closely.";

    }

    else if(threat.severity === "Medium"){

        detailPriority.textContent = "Moderate";

        detailAction.textContent =
        "Review logs and schedule a security assessment.";

    }

    else{

        detailPriority.textContent = "Low";

        detailAction.textContent =
        "Monitor the threat and document the incident.";

    }

}
loadThreats();