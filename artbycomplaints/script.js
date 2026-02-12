// ============================================
// ARTBY RESIDENCE COMPLAINTS SYSTEM
// Local Storage Management & Real-time Updates
// ============================================

class ComplaintsManager {
    constructor() {
        this.complaints = [];
        this.refreshInterval = 15000; // 15 seconds
        this.storageKey = 'artby_complaints';
        this.init();
    }

    init() {
        this.loadComplaints();
        this.setupEventListeners();
        this.startAutoRefresh();
        this.updateComplaintCount();
        this.renderComplaints();
        
        // Set current datetime as default
        this.setCurrentDateTime();
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    setupEventListeners() {
        const submitBtn = document.getElementById('submitBtn');
        const issueField = document.getElementById('issue');
        const unitToggle = document.getElementById('unitToggle');
        const unitField = document.getElementById('unitNumber');

        // Submit button
        submitBtn.addEventListener('click', () => this.submitComplaint());

        // Enter key to submit (when not in textarea)
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.id !== 'issue') {
                this.submitComplaint();
            }
        });

        // Character counter
        issueField.addEventListener('input', (e) => {
            this.updateCharCounter(e.target.value.length);
        });

        // Unit toggle
        unitToggle.addEventListener('change', (e) => {
            unitField.disabled = !e.target.checked;
            if (!e.target.checked) {
                unitField.value = '';
            }
            this.animateToggle(unitField);
        });
    }

    // ============================================
    // FORM HANDLING
    // ============================================

    submitComplaint() {
        const issue = document.getElementById('issue').value.trim();
        const unitNumber = document.getElementById('unitNumber').value.trim();
        const dateTime = document.getElementById('dateTime').value;
        const unitToggle = document.getElementById('unitToggle').checked;

        // Validation
        if (!issue) {
            this.showToast('Please describe the issue', 'error');
            return;
        }

        if (issue.length > 10000) {
            this.showToast('Issue description is too long (max 10,000 characters)', 'error');
            return;
        }

        if (!dateTime) {
            this.showToast('Please select the date and time', 'error');
            return;
        }

        if (unitToggle && !unitNumber) {
            this.showToast('Please enter your unit number', 'error');
            return;
        }

        // Create complaint object
        const complaint = {
            id: this.generateId(),
            issue: issue,
            unitNumber: unitToggle ? unitNumber : 'N/A',
            dateTime: dateTime,
            submittedAt: new Date().toISOString(),
            isNew: true
        };

        // Add to complaints array
        this.complaints.unshift(complaint); // Add to beginning for newest first
        this.saveComplaints();
        this.renderComplaints();
        this.updateComplaintCount();

        // Clear form
        this.clearForm();

        // Show success toast
        this.showToast('Complaint submitted successfully', 'success');

        // Remove 'new' flag after animation
        setTimeout(() => {
            complaint.isNew = false;
            this.saveComplaints();
        }, 800);
    }

    clearForm() {
        document.getElementById('issue').value = '';
        document.getElementById('unitNumber').value = '';
        this.setCurrentDateTime();
        this.updateCharCounter(0);
    }

    setCurrentDateTime() {
        const now = new Date();
        // Format: YYYY-MM-DDTHH:MM
        const formatted = now.toISOString().slice(0, 16);
        document.getElementById('dateTime').value = formatted;
    }

    updateCharCounter(count) {
        document.getElementById('charCount').textContent = count.toLocaleString();
    }

    // ============================================
    // STORAGE MANAGEMENT
    // ============================================

    saveComplaints() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.complaints));
        } catch (error) {
            console.error('Error saving complaints:', error);
            this.showToast('Error saving complaint', 'error');
        }
    }

    loadComplaints() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.complaints = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading complaints:', error);
            this.complaints = [];
        }
    }

    // ============================================
    // RENDERING
    // ============================================

    renderComplaints() {
        const grid = document.getElementById('complaintsGrid');
        
        if (this.complaints.length === 0) {
            grid.innerHTML = this.getEmptyState();
            return;
        }

        grid.innerHTML = this.complaints.map(complaint => 
            this.createComplaintCard(complaint)
        ).join('');
    }

    createComplaintCard(complaint) {
        const newClass = complaint.isNew ? 'new-entry' : '';
        const formattedDateTime = this.formatDateTime(complaint.dateTime);
        const formattedSubmitted = this.formatTimestamp(complaint.submittedAt);

        return `
            <div class="complaint-card ${newClass}" data-id="${complaint.id}">
                <div class="complaint-header">
                    <div class="complaint-unit">${this.escapeHtml(complaint.unitNumber)}</div>
                    <div class="complaint-timestamp">
                        <span class="timestamp-label">Occurred</span>
                        ${formattedDateTime}
                    </div>
                </div>
                <div class="complaint-content">
                    ${this.escapeHtml(complaint.issue)}
                </div>
                <div class="complaint-footer">
                    <div class="complaint-id">ID: ${complaint.id}</div>
                    <div class="complaint-submitted">
                        <span class="timestamp-label">Submitted</span>
                        ${formattedSubmitted}
                    </div>
                </div>
            </div>
        `;
    }

    getEmptyState() {
        return `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 4rem 2rem;
                color: var(--text-muted);
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">📋</div>
                <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">
                    No complaints yet
                </div>
                <div style="font-size: 0.875rem;">
                    Submit the first complaint to get started
                </div>
            </div>
        `;
    }

    updateComplaintCount() {
        document.getElementById('complaintCount').textContent = this.complaints.length;
    }

    // ============================================
    // AUTO-REFRESH SYSTEM
    // ============================================

    startAutoRefresh() {
        setInterval(() => {
            this.refreshComplaints();
        }, this.refreshInterval);
    }

    refreshComplaints() {
        // Reload from storage to catch any external changes
        const oldCount = this.complaints.length;
        this.loadComplaints();
        const newCount = this.complaints.length;

        // Only re-render if there are changes
        if (oldCount !== newCount) {
            this.renderComplaints();
            this.updateComplaintCount();
        }
    }

    // ============================================
    // ANIMATIONS & FEEDBACK
    // ============================================

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        toastMessage.textContent = message;
        
        if (type === 'success') {
            toastIcon.textContent = '✓';
            toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            toastIcon.textContent = '✕';
            toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    animateToggle(element) {
        element.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    generateId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 7);
        return `${timestamp}-${randomStr}`.toUpperCase();
    }

    formatDateTime(isoString) {
        const date = new Date(isoString);
        const options = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    }

    formatTimestamp(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return this.formatDateTime(isoString);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    window.complaintsManager = new ComplaintsManager();
    
    console.log('%c🏢 Artby Residence Complaints System', 
        'font-size: 16px; font-weight: bold; color: #4f46e5;');
    console.log('%cSystem initialized successfully', 
        'font-size: 12px; color: #10b981;');
});

// ============================================
// EXPORT FOR TESTING (Optional)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComplaintsManager;
}
