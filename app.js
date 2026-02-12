/**
 * ARTBY RESIDENCE COMPLAINTS BOX
 * Static Forest Green on Black - Mobile Optimized
 * Author: Aquatic
 */

// ========================================
// INITIALIZATION
// ========================================

// Character counter
const issueReport = document.getElementById('issueReport');
const charCount = document.getElementById('charCount');

issueReport.addEventListener('input', () => {
    charCount.textContent = issueReport.value.length;
});

// ========================================
// HAPTIC FEEDBACK
// ========================================

function triggerHaptic() {
    const flash = document.getElementById('hapticFlash');
    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 100);
    
    // Vibration API for mobile devices (iOS/Android)
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// ========================================
// FORM SUBMISSION & COMPLAINTS MANAGEMENT
// ========================================

const form = document.getElementById('complaintForm');
const complaintsList = document.getElementById('complaintsList');
let complaints = [];

// Load complaints from localStorage on page load
function loadComplaints() {
    const stored = localStorage.getItem('artby_complaints');
    if (stored) {
        try {
            complaints = JSON.parse(stored);
            renderComplaints();
        } catch (e) {
            console.error('Error loading complaints:', e);
            complaints = [];
        }
    }
}

// Save complaints to localStorage
function saveComplaints() {
    try {
        localStorage.setItem('artby_complaints', JSON.stringify(complaints));
    } catch (e) {
        console.error('Error saving complaints:', e);
    }
}

// Render complaints list
function renderComplaints() {
    if (complaints.length === 0) {
        complaintsList.innerHTML = `
            <p style="text-align: center; opacity: 0.5; color: #228B22;">
                No complaints submitted yet...
            </p>
        `;
        complaintsList.style.minHeight = '200px';
        return;
    }

    // Set to full height when there are complaints
    complaintsList.style.minHeight = complaints.length > 5 ? '100vh' : '400px';

    complaintsList.innerHTML = complaints.map((complaint, index) => {
        // Format date/time if provided, otherwise show "Time not specified"
        const dateTimeDisplay = complaint.dateTime 
            ? new Date(complaint.dateTime).toLocaleString()
            : 'Time not specified';
        
        return `
            <div class="complaint-item complaint-submitted" style="animation-delay: ${index * 0.1}s">
                <div class="complaint-header">
                    ${complaint.showUnit ? `Unit ${escapeHtml(complaint.unit)}` : 'Anonymous'} - 
                    ${dateTimeDisplay}
                </div>
                <div class="complaint-body">
                    ${escapeHtml(complaint.issue)}
                </div>
            </div>
        `;
    }).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Haptic feedback
    triggerHaptic();

    // Get form data
    const formData = new FormData(form);
    const complaint = {
        issue: formData.get('issueReport'),
        unit: formData.get('unit'),
        showUnit: formData.get('showUnit') === 'on',
        dateTime: formData.get('dateTime') || null,
        timestamp: new Date().toISOString()
    };
    
    complaints.unshift(complaint);

    // Save to localStorage
    saveComplaints();

    // Clear form
    form.reset();
    charCount.textContent = '0';

    // Update complaints list
    renderComplaints();

    // Scroll to complaints list on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            complaintsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
});

// ========================================
// SAVE COMPLAINTS FUNCTIONALITY
// ========================================

const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', () => {
    if (complaints.length === 0) {
        alert('No complaints to save yet!');
        return;
    }

    // Detect mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Create file content
    const fileContent = generateComplaintExport();

    if (isMobile) {
        // Mobile: Use Web Share API if available, otherwise fallback to download
        if (navigator.share && navigator.canShare) {
            // Create a blob and file
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const file = new File([blob], `artby-complaints-${Date.now()}.txt`, { type: 'text/plain' });
            
            navigator.share({
                title: 'Artby Residence Complaints',
                text: 'Here are the recent complaints from Artby Residence',
                files: [file]
            }).catch(err => {
                console.log('Share failed, falling back to download:', err);
                downloadFile(fileContent, 'txt');
            });
        } else {
            // Fallback: Download
            downloadFile(fileContent, 'txt');
        }
    } else {
        // Desktop: Offer choice between HTML and TXT
        if (confirm('Save as HTML? (Cancel for TXT format)')) {
            const htmlContent = generateComplaintHTML();
            downloadFile(htmlContent, 'html');
        } else {
            downloadFile(fileContent, 'txt');
        }
    }

    // Haptic feedback
    triggerHaptic();
});

// Generate plain text export
function generateComplaintExport() {
    let content = '='.repeat(60) + '\n';
    content += 'ARTBY RESIDENCE COMPLAINTS BOX\n';
    content += `Generated: ${new Date().toLocaleString()}\n`;
    content += `Total Complaints: ${complaints.length}\n`;
    content += '='.repeat(60) + '\n\n';

    complaints.forEach((complaint, index) => {
        const dateTime = complaint.dateTime 
            ? new Date(complaint.dateTime).toLocaleString()
            : 'Time not specified';
        
        content += `COMPLAINT #${index + 1}\n`;
        content += '-'.repeat(60) + '\n';
        content += `Unit: ${complaint.showUnit ? complaint.unit : 'Anonymous'}\n`;
        content += `Date/Time: ${dateTime}\n`;
        content += `Submitted: ${new Date(complaint.timestamp).toLocaleString()}\n\n`;
        content += `Issue:\n${complaint.issue}\n\n`;
        content += '='.repeat(60) + '\n\n';
    });

    return content;
}

// Generate HTML export
function generateComplaintHTML() {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artby Residence Complaints - ${new Date().toLocaleDateString()}</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #228B22;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            border-bottom: 2px solid #228B22;
            padding-bottom: 10px;
        }
        .meta {
            text-align: center;
            margin-bottom: 30px;
            opacity: 0.8;
        }
        .complaint {
            background: rgba(34, 139, 34, 0.1);
            border: 2px solid #228B22;
            border-left: 4px solid #228B22;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
        .complaint-header {
            font-weight: bold;
            margin-bottom: 10px;
            color: #32CD32;
        }
        .complaint-body {
            line-height: 1.6;
            white-space: pre-wrap;
        }
        @media print {
            body { background: white; color: black; }
            .complaint { border-color: black; }
        }
    </style>
</head>
<body>
    <h1>Artby Residence Complaints Box</h1>
    <div class="meta">
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Total Complaints: ${complaints.length}</p>
    </div>
`;

    complaints.forEach((complaint, index) => {
        const dateTime = complaint.dateTime 
            ? new Date(complaint.dateTime).toLocaleString()
            : 'Time not specified';
        
        html += `
    <div class="complaint">
        <div class="complaint-header">
            Complaint #${index + 1} | 
            ${complaint.showUnit ? `Unit ${escapeHtml(complaint.unit)}` : 'Anonymous'} | 
            ${dateTime}
        </div>
        <div class="complaint-body">${escapeHtml(complaint.issue)}</div>
    </div>
`;
    });

    html += `
</body>
</html>`;

    return html;
}

// Download file function
function downloadFile(content, extension) {
    const blob = new Blob([content], { 
        type: extension === 'html' ? 'text/html' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `artby-complaints-${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========================================
// CHECKBOX HAPTIC FEEDBACK
// ========================================

const checkbox = document.getElementById('showUnit');
checkbox.addEventListener('change', triggerHaptic);

// ========================================
// INPUT FIELD HAPTIC FEEDBACK
// ========================================

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const flash = document.getElementById('hapticFlash');
        flash.style.background = 'radial-gradient(circle, rgba(34, 139, 34, 0.1) 0%, transparent 70%)';
        flash.classList.add('active');
        setTimeout(() => flash.classList.remove('active'), 100);
    });
});

// ========================================
// MOBILE OPTIMIZATIONS
// ========================================

// Prevent zoom on double-tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Improve scroll performance
document.addEventListener('touchmove', (e) => {
    // Allow scroll
}, { passive: true });

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadComplaints();
    console.log('✅ Artby Complaints Box - Mobile Optimized - Ready');
});
